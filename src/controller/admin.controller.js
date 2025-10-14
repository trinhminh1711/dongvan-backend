const pool = require("../config/config.db");

// ✅ Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Users");
    res.json(rows);
  } catch (err) {
    console.error("Lỗi getAllUsers:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Xóa user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM Users WHERE user_id = ?", [id]);
    res.json({ message: "Đã xóa user thành công" });
  } catch (err) {
    console.error("Lỗi deleteUser:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ✅ Cập nhật role hoặc trạng thái user
exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    await pool.query("UPDATE Users SET role=? WHERE user_id=?", [role, id]);
    res.json({ message: "Cập nhật quyền thành công" });
  } catch (err) {
    console.error("Lỗi updateUserRole:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
// ✅ Cập nhật trạng thái user (active / locked)
exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Kiểm tra giá trị hợp lệ
    if (!["active", "locked"].includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    // Cập nhật vào DB
    await pool.query("UPDATE Users SET status = ? WHERE user_id = ?", [status, id]);

    res.json({ message: "Cập nhật trạng thái người dùng thành công" });
  } catch (err) {
    console.error("Lỗi updateUserStatus:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
