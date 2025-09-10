const pool = require('../config/config.db');

exports.profile = async (req, res) => {
  try {
    const userId = req.user.user_id
    const [rows] = await pool.query(
      'SELECT user_id, username, email, role, coin_balance, gender , phone_number , link_thumbnail,	created_at,  user_description FROM Users WHERE user_id = ?',
      userId
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
};


