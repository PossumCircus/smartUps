const AppError = require('../../utils/appError');
const Notification = require('../../models/Notification');

// Function 1 : get notifications
exports.getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.findById(req.params.id)
        if (!notifications) return next(new AppError("There are no notifications"))
        res.status(200).json(notifications)
    } catch (error) {
        next(error);
    }
}

// Utility function to send a notification to a user
exports.sendNotification = async (userId, notificationType, link) => {
    await Notification.create({
        recipient: userId,
        notificationType,
        link
    });

    // Optional: If you want a new notification indicator on the User 
    await User.findByIdAndUpdate(userId, { $inc: { newNotificationsCount: 1 } });
}

