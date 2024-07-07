const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/user/notificationController")

// Notifications routing
router.route('/notification')
    .get(notificationController.getNotifications)
    .post(notificationController.createNotification)

module.exports = router;