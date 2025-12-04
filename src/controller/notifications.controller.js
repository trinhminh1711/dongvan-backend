const pool = require("../config/config.db");

// CREATE
exports.getNotifications = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    if (!user_id) {
      return res.status(400).json({ success: false, message: 'Thiếu user_id' });
    }

    const [notifications] = await pool.query(
      `SELECT 
          n.*,
          CASE WHEN r.id IS NULL THEN 0 ELSE 1 END AS is_read
       FROM notifications n
       LEFT JOIN notification_reads r
         ON n.id = r.notification_id AND r.user_id = ?
       WHERE n.target_user_id IS NULL OR n.target_user_id = ?
       ORDER BY n.created_at DESC`,
      [user_id, user_id]
    );

    res.status(200).json({ success: true, data: notifications });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.markNotificationAsRead = async (req, res) => {
  try {
    const { notification_id, user_id } = req.body;

    if (!notification_id || !user_id) {
      return res.status(400).json({ success: false, message: 'Thiếu notification_id hoặc user_id' });
    }

    // Thêm record vào bảng notification_reads
    // Nếu đã tồn tại thì update lại thời gian read_at
    await pool.query(
      `INSERT INTO notification_reads (notification_id, user_id, read_at)
       VALUES (?, ?, NOW())
       ON DUPLICATE KEY UPDATE read_at = NOW()`,
      [notification_id, user_id]
    );

    res.status(200).json({ success: true, message: 'Đã đánh dấu là đã đọc' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.markAllNotificationAsRead = async (req, res) => {
   try {
    const { user_id } = req.body;
    // Cập nhật tất cả notification chưa đọc cho user
    await pool.query(
      `INSERT INTO notification_reads (notification_id, user_id, read_at)
       SELECT id, ? , NOW()
       FROM notifications
       WHERE id NOT IN (SELECT notification_id FROM notification_reads WHERE user_id = ?)
         AND (target_user_id IS NULL OR target_user_id = ?)`,
      [user_id, user_id, user_id]
    );

    res.status(200).json({ success: true, message: 'Đánh dấu tất cả đã đọc' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
