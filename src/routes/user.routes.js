const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

// GET /api/users/:userId/stories
router.get("/infomation/:userId", userController.getUserInfomation);

module.exports = router;
