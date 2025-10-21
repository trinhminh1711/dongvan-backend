const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

// GET /api/users/:userId/stories
router.get("/infomation/:userId", userController.getUserInfomation);
router.put('/users/:userId/status', userController.updateUserStatus)
module.exports = router;
