const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/user/notificationController")

// Notifications routing
router.get('/notifications', notificationController.getNotifications)

module.exports = router;