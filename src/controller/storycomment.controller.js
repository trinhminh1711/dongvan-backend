const pool = require("../config/config.db");

// CREATE
exports.createComment = async (req, res) => {
    try {

        const { story_id, user_id, content } = req.body;

        const [result] = await pool.query(
            "INSERT INTO StoryComments (story_id, user_id , content) VALUES (?, ?, ?)",
            [story_id, user_id, content]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "comment created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error comment created", error: error.message });
    }
};

exports.increaseLikeComment = async (req, res) => {
    try {

        const { comment_id } = req.body;

        const [result] = await pool.query(
            "UPDATE StoryComments SET `like` = `like` + 1 WHERE comment_id= ?",
            [comment_id]
        );

        res.status(201).json({ success: true, id: result.insertId, message: "increase!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error increase", error: error.message });
    }
};

exports.addReply = async (req, res) => {
  const { comment_id, user_id, content } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!comment_id || !user_id || !content) {
    return res.status(400).json({ error: 'Thiếu comment_id, user_id hoặc content' });
  }

  try {
    // Kiểm tra comment gốc có tồn tại không (vì không dùng FOREIGN KEY)
    const [commentExists] = await pool.query(
      'SELECT id FROM StoryComments WHERE id = ?',
      [comment_id]
    );

    if (commentExists.length === 0) {
      return res.status(404).json({ error: 'Comment gốc không tồn tại' });
    }

    // Thêm reply mới
    const [result] = await pool.query(
      `INSERT INTO StoryCommentsReplies 
        (comment_id, user_id, content, created_at, updated_at)
       VALUES (?, ?, ?, NOW(), NOW())`,
      [comment_id, user_id, content]
    );

    // Trả phản hồi cho client
    res.status(200).json({
      success: true,
      message: 'Đã thêm reply thành công',
      reply_id: result.insertId
    });

  } catch (err) {
    console.error('Lỗi khi thêm reply:', err);
    res.status(500).json({ error: 'Lỗi server khi thêm reply' });
  }
};
