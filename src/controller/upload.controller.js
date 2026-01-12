const cloudinary = require("../config/cloudinary")

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Không có file ảnh nào được gửi lên" })
    }

    // upload_stream vì dùng memoryStorage (ảnh nằm trong RAM)
    const imageUrl = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "uploads", // thư mục Cloudinary bạn muốn
          resource_type: "image",
          public_id: Date.now().toString(), // 👈 tạo tên file ngẫu nhiên
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result.secure_url)
        }
      )
      stream.end(req.file.buffer)
    })

    res.json({ success: true, url: imageUrl })
  } catch (error) {
    console.error("Lỗi upload ảnh:", error)
    res.status(500).json({
      success: false,
      message: "Lỗi server khi upload ảnh",
      error: error.message,
    })
  }
}
