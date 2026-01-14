const pool = require('../config/config.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const axios = require("axios");
const nodemailer = require("nodemailer");
const { sendMail, supportRequestTemplate, rechargeRequestTemplate } = require("../services/mail.service");
const signToken = (user) => {
  return jwt.sign(
    { user_id: user.user_id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '2h' }
  );
};

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    const [rows] = await pool.query("SELECT user_id FROM Users WHERE email = ?", [email]);
    if (rows.length > 0)
      return res.status(409).json({ error: "Email already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    const defaultThumbnail =
      "https://cdn-icons-png.freepik.com/512/3607/3607444.png";

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      `INSERT INTO Users (username, email, password_hash, provider, role, link_thumbnail, created_at, is_verified, verify_code, verify_expires)
       VALUES (?, ?, ?, 'local', 'user', ?, NOW(), false, ?, ?)`,
      [username, email, password_hash, defaultThumbnail, verifyCode, expiresAt]
    );

    // Gửi mail qua service có sẵn
    await sendMail({
      to: email,
      subject: "Mã xác nhận tài khoản",
      html: `
        <h2>Xin chào ${username},</h2>
        <p>Cảm ơn bạn đã đăng ký tài khoản tại website!</p>
        <p>Mã xác nhận của bạn là:</p>
        <div style="font-size: 20px; font-weight: bold; letter-spacing: 2px;">${verifyCode}</div>
        <p>Mã có hiệu lực trong <b>15 phút</b>.</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công, vui lòng kiểm tra email để xác nhận tài khoản.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Lỗi server" });
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
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: "Thiếu email hoặc mã xác nhận" });
    }

    const [rows] = await pool.query(
      "SELECT user_id, verify_code, verify_expires, is_verified FROM Users WHERE email = ?",
      [email]
    );

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Email không tồn tại" });

    const user = rows[0];

    if (user.is_verified)
      return res.status(400).json({ success: false, message: "Tài khoản đã được xác nhận" });

    if (user.verify_code !== code)
      return res.status(400).json({ success: false, message: "Mã xác nhận không đúng" });

    if (new Date() > new Date(user.verify_expires))
      return res.status(400).json({ success: false, message: "Mã xác nhận đã hết hạn" });

    // Cập nhật tài khoản -> verified
    await pool.query(
      "UPDATE Users SET is_verified = true, verify_code = NULL, verify_expires = NULL WHERE email = ?",
      [email]
    );

    return res.json({
      success: true,
      message: "Xác nhận email thành công! Bạn có thể đăng nhập ngay.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Lỗi server khi xác nhận email" });
  }
};
exports.resendCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ success: false, message: "Thiếu email" });

    const [rows] = await pool.query("SELECT username, is_verified FROM Users WHERE email = ?", [email]);
    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Email không tồn tại" });

    const user = rows[0];
    if (user.is_verified)
      return res.status(400).json({ success: false, message: "Tài khoản đã được xác nhận" });

    // Tạo mã mới
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await pool.query(
      "UPDATE Users SET verify_code = ?, verify_expires = ? WHERE email = ?",
      [newCode, expiresAt, email]
    );

    // Gửi email xác nhận mới
    await sendMail({
      to: email,
      subject: "Mã xác nhận mới của bạn",
      html: `
        <h2>Xin chào ${user.username || "bạn"},</h2>
        <p>Đây là mã xác nhận mới của bạn:</p>
        <div style="font-size: 20px; font-weight: bold; letter-spacing: 2px;">${newCode}</div>
        <p>Mã có hiệu lực trong <b>15 phút</b>.</p>
      `,
    });

    return res.json({
      success: true,
      message: "Đã gửi lại mã xác nhận mới thành công.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Lỗi server khi gửi lại mã" });
  }
};