const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const auth = require('../middlewares/middlewares.auth');

// ✅ Lấy danh sách tất cả user
router.get("/users", auth("master_admin"), adminController.getAllUsers);

// ✅ Xóa user theo ID
router.delete("/users/:id", auth("master_admin"), adminController.deleteUser);

// ✅ Cập nhật quyền (role) user
router.put("/users/:id/role", auth("master_admin"), adminController.updateUserRole);

// ✅ Cập nhật trạng thái (status) user
router.put("/users/:id/status", auth("master_admin"), adminController.updateUserStatus);

module.exports = router;
