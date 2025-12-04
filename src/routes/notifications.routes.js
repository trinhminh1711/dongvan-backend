const express = require("express");
const notificationsController = require("../controller/notifications.controller");
const router = express.Router();
// Create
router.get('/:user_id', notificationsController.getNotifications);
router.post('/read', notificationsController.markNotificationAsRead);
router.post('/read/all', notificationsController.markAllNotificationAsRead);
module.exports = router;
