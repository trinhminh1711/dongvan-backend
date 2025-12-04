const pool = require('../config/config.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");
const signToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '2h' }
  );
};

exports.register = async (req, res) => {
  try {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    // check existing email
    const [rows] = await pool.query('SELECT user_id FROM Users WHERE email = ?', [email]);
    if (rows.length > 0) return res.status(409).json({ error: 'Email already exists' });

    const password_hash = await bcrypt.hash(password, 10);

    const defaultThumbnail = "https://cdn-icons-png.freepik.com/512/3607/3607444.png";

    // Thêm created_at tự động và link_thumbnail mặc định
    const [result] = await pool.query(
      `INSERT INTO Users (username, email, password_hash, provider, role, link_thumbnail, created_at)
       VALUES (?, ?, ?, 'local', 'user', ?, NOW())`,
      [username, email, password_hash, defaultThumbnail]
    );

    const user = { user_id: result.insertId, email, role: 'user' };
    const token = signToken(user);

    return res.status(201).json({
      success: true,
      message: 'Registered successfully',
      token,
      user: { user_id: user.user_id, username, email, role: 'user', link_thumbnail: defaultThumbnail, created_at: new Date() }
    });
  } catch (err) {
    console.error(err);
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        error: "Email đã tồn tại trong hệ thống"
      });
    }

    // Các lỗi khác (server)
    return res.status(500).json({
      success: false,
      error: "Lỗi server, vui lòng thử lại sau",
      details: process.env.NODE_ENV === "development" ? err.message : undefined
    });
  }
};

exports.login = async (req, res) => {
  try {
    // validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    const [rows] = await pool.query(
      `SELECT user_id, username, email, role, password_hash, provider, status
       FROM Users WHERE email = ? LIMIT 1`,
      [email]
    );
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = rows[0];

    if (user.provider !== 'local') {
      return res.status(400).json({ error: `Email đã được đăng ký. Vui lòng đăng nhập Google để tiếp tục` });
    }
    if (user.status !== 'active') {
      return res.status(403).json({
        error: 'Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên',
      });
    }
    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) return res.status(401).json({ error: 'Thông tin đăng nhập không tồn tại!' });

    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2h' }
    );

    return res.json({
      message: 'Login successful',
      token,
      user: { user_id: user.user_id, username: user.username, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [email]);
    if (users.length === 0)
      return res.status(404).json({ message: "Email không tồn tại!" });

    // Tạo token reset
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 15 * 60 * 1000); // Hết hạn sau 15 phút

    await pool.query(
      `UPDATE Users SET reset_token = ?, reset_token_expires = ? WHERE email = ?`,
      [token, expires, email]
    );

    // Gửi mail (dùng Gmail hoặc SMTP server của bạn)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await transporter.sendMail({
      from: `"Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Đặt lại mật khẩu của bạn",
      html: `
        <p>Bạn vừa yêu cầu đặt lại mật khẩu.</p>
        <p>Nhấn vào link bên dưới để tạo mật khẩu mới (hết hạn sau 15 phút):</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Đã gửi email đặt lại mật khẩu!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};
exports.googleLogin = async (req, res) => {
  const { token } = req.body; // token từ frontend (Google Sign-In)
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    const { sub: googleId, email, name, picture } = payload;

    // Kiểm tra user đã tồn tại chưa
    const [rows] = await pool.query(
      "SELECT * FROM Users WHERE provider = 'google' AND provider_uid = ?",
      [googleId]
    );

    let user;
    if (rows.length > 0) {
      user = rows[0];
    } else {
      // Nếu chưa có -> tạo user mới
      const [result] = await pool.query(
        `INSERT INTO Users (username, email, link_thumbnail, provider, provider_uid)
         VALUES (?, ?, ?, 'google', ?)`,
        [name, email, picture, googleId]
      );
      user = { user_id: result.insertId, username: name, email, link_thumbnail: picture };
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '2h' }
    );

    // Trả về frontend
    res.json({ message: "Đăng nhập Google thành công!", token: accessToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Xác thực Google thất bại!" });
  }
};