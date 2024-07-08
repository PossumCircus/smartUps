const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/user/notificationController")

// Notifications routing
router.route('/')
    // .get(notificationController.getNotifications)
    .get(notificationController.getAllNotifications)
    .post(notificationController.createNotification)


router.route('/:loginUserId')
    .get(notificationController.getNotifications)
module.exports = router;