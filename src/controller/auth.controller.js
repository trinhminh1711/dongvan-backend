const pool = require('../config/config.db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

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
      `SELECT user_id, username, email, role, password_hash, provider
       FROM Users WHERE email = ? LIMIT 1`,
      [email]
    );
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

    const user = rows[0];

    if (user.provider !== 'local') {
      return res.status(400).json({ error: `Account registered via ${user.provider}. Please use social login.` });
    }

    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });

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
