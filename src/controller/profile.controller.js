const pool = require('../config/config.db');
exports.profileUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const [rows] = await pool.query(
      'SELECT username, user_id, coin_balance , created_at FROM Users WHERE user_id = ?',
      userId
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.getInfoUserPost = async (req, res) => {
  try {
    const userId = req.params.userId
    const [rows] = await pool.query(
      `SELECT 
    u.user_id,
    u.username,
    u.created_at,
    u.coin_balance,
    u.link_thumbnail,
    COUNT(DISTINCT p.post_id) AS total_posts,
    COUNT(DISTINCT l.like_id) AS total_likes
    FROM Users u
    LEFT JOIN ForumPosts p ON u.user_id = p.user_id
    LEFT JOIN ForumLikes l ON p.post_id = l.post_id
    WHERE u.user_id = 1
    GROUP BY u.user_id, u.username, u.link_thumbnail;
    `
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(rows[0]);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Server error' });
  }
};