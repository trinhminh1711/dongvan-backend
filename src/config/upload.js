const multer = require("multer");

// lưu file tạm trong RAM
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;
