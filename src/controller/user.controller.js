const pool = require('../config/config.db');


exports.getUserInfomation = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const [rows] = await pool.query(
      `
      SELECT 
          u.user_id,
          u.username,
          u.user_description,
          u.gender,
          u.created_at,
          u.link_thumbnail,
          s.story_id,
          s.title AS story_title,
          COALESCE(MAX(c.chap_number), 0) AS total_chapters
      FROM Users u
      JOIN Stories s ON u.user_id = s.author_id
      LEFT JOIN Chapters c ON s.story_id = c.story_id
      WHERE u.user_id = ?
      GROUP BY u.user_id, u.username, s.story_id, s.title
      ORDER BY s.story_id;
      `,
      [userId]
    );
   if (!rows.length) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }   
    const user = {
      user_id: rows[0].user_id,
      username: rows[0].username,
      email: rows[0].email,
      gender: rows[0].gender,
      created_at: rows[0].created_at,
      user_description: rows[0].user_description,
      link_thumbnail : rows[0].link_thumbnail,
      stories: rows.map(r => ({
        story_id: r.story_id,
        title: r.story_title,
        total_chapters: r.total_chapters
      }))
    };
    res.status(200).json({
      message: "Lấy thông tin thành công",
      data: user
    });
  } catch (error) {
    console.error("Lỗi khi truy vấn:", error);
    res.status(500).json({
      message: "Lỗi server",
      error: error.message,
    });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params
    const { status } = req.body

    // Chỉ cho phép 2 trạng thái hợp lệ
    const validStatus = ['active', 'denied']
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Trạng thái không hợp lệ' })
    }

    // Cập nhật trong DB
    const [result] = await pool.query(
      'UPDATE Users SET status = ? WHERE user_id = ?',
      [status, userId]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' })
    }

    res.status(200).json({
      message: 'Cập nhật trạng thái thành công',
      userId,
      status
    })
  } catch (error) {
    console.error('Lỗi cập nhật trạng thái:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
}
