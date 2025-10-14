const pool = require('../config/config.db');
const upload = require("../config/upload");
const cloudinary = require("../config/cloudinary");
const bcrypt = require('bcrypt');
exports.profileUser = async (req, res) => {
  try {
    const userId = req.params.userId
    const [rows] = await pool.query(
      'SELECT username, user_id, coin_balance , created_at FROM Users WHERE user_id = ?',
      userId
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' })
    return res.json(rows[0])
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

exports.changePassword = async (req, res) => {
  try {
    const { user_id } = req.user; // Lấy từ token hoặc session
    const { oldPassword, newPassword, confirmPassword } = req.body;

    // 1️⃣ Kiểm tra dữ liệu đầu vào
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp" });
    }

    // 2️⃣ Lấy thông tin người dùng hiện tại
    const [rows] = await pool.query(
      "SELECT password_hash FROM Users WHERE user_id = ?",
      [user_id]
    );

    const user = rows[0];
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // 3️⃣ So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash || "");
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu cũ không đúng" });
    }

    // 4️⃣ Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    // 5️⃣ Cập nhật mật khẩu mới vào DB
    await pool.query(
      "UPDATE Users SET password_hash = ? WHERE user_id = ?",
      [newHash, user_id]
    );

    return res.json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi đổi mật khẩu:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
}
exports.updateUserInfo = async (req, res) => {
  try {
    const { user_id } = req.user;
    const {
      username,
      email,
      phone_number,
      gender,
      user_description,
    } = req.body;

    // Lấy user hiện tại
    const [rows] = await pool.query("SELECT * FROM Users WHERE user_id = ?", [user_id]);
    if (!rows.length)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const current = rows[0];
    let imageUrl = current.link_thumbnail;

    // ✅ Nếu có file ảnh mới thì upload lên Cloudinary
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload_stream(
          {
            folder: "user_avatars",
            resource_type: "image",
          },
          async (error, result) => {
            if (error) {
              console.error("Lỗi upload Cloudinary:", error);
              return res.status(500).json({ message: "Lỗi upload ảnh" });
            }

            imageUrl = result.secure_url;

            // ✅ Gộp dữ liệu mới (ghi đè)
            const updated = {
              username: username ?? current.username,
              email: email ?? current.email,
              phone_number: phone_number ?? current.phone_number,
              gender: gender ?? current.gender,
              link_thumbnail: imageUrl || current.link_thumbnail,
              user_description: user_description ?? current.user_description,
            };

            // ✅ Update DB
            await pool.query(
              `UPDATE Users 
               SET username=?, email=?, phone_number=?, gender=?, link_thumbnail=?, user_description=? 
               WHERE user_id=?`,
              [
                updated.username,
                updated.email,
                updated.phone_number,
                updated.gender,
                updated.link_thumbnail,
                updated.user_description,
                user_id,
              ]
            );

            return res.json({
              message: "Cập nhật thông tin thành công",
              user: updated,
            });
          }
        );

        // ⚙️ Đọc file từ buffer của multer để stream upload
        require("streamifier").createReadStream(req.file.buffer).pipe(uploadResult);
      } catch (uploadErr) {
        console.error("Cloudinary error:", uploadErr);
        return res.status(500).json({ message: "Lỗi upload Cloudinary" });
      }
    } else {
      // ✅ Nếu không có ảnh → chỉ update thông tin khác
      const updated = {
        username: username ?? current.username,
        email: email ?? current.email,
        phone_number: phone_number ?? current.phone_number,
        gender: gender ?? current.gender,
        link_thumbnail: imageUrl,
        user_description: user_description ?? current.user_description,
      };

      await pool.query(
        `UPDATE Users 
         SET username=?, email=?, phone_number=?, gender=?, link_thumbnail=?, user_description=? 
         WHERE user_id=?`,
        [
          updated.username,
          updated.email,
          updated.phone_number,
          updated.gender,
          updated.link_thumbnail,
          updated.user_description,
          user_id,
        ]
      );

      res.json({
        message: "Cập nhật thông tin thành công",
        user: updated,
      });
    }
  } catch (err) {
    console.error("Lỗi updateUserInfo:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};