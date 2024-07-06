const AppError = require('../../utils/appError');
const Notification = require('../../models/Notification');
const User = require('../../models/User')

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

// Utility function to send a notification to a user and add notification to Notification db
exports.sendNotification = async (req, res, next) => {
    const { notificationData } = req.body
    const userId = notificationData.recipient

    await Notification.create(notificationData);

    // Optional: If you want a new notification indicator on the User 
    await User.findByIdAndUpdate(userId, { $inc: { newNotificationsCount: 1 } });
}

exports.addNotifications = async (req, res, next) => {
    try {
        const { notificationData } = req.body
        const { recipient } = notificationData

        if (!notificationData || !recipient) {
            return res.status(400).json({ error: "Invalid notification data or recipient." });
        }

        const user = await User.findById(recipient)
            .populate('notifications')
            .populate('notificationsCount')
            .sort({ createdAt: -1 })

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.notifications.push(notificationData)
        await User.findByIdAndUpdate(recipient, { $inc: { newNotificationsCount: 1 } });
        await user.save()
        res.status(201).json({
            data: {
                state: "알림 추가.",
                message: "알림이 추가되었습니다."
            }
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.removeNotifications = async (req, res, next) => {
    try {
        const { checkedNotificationData } = req.body
        const user = await User.findById(req.body.loginId).populate('notifications')
        const target = user.notifications.findIndex(notification => notification._id === checkedNotificationData._id)
        user.notifications.splice(target, 1)
        await user.save()
        res.send(201).json({
            data: {
                state: "알림 제거.",
                message: "알림이 제거되었습니다."
            }
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}

exports.setNotificationsAlarmState = async (req, res, next) => {
    try {
        const { alarmState } = req.body
        const user = await User.findById(req.body.loginId)
            .populate('notificationAlarmState')

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.notificationAlarmState.postLikes = alarmState.postLikesState
        user.notificationAlarmState.postNewComments = alarmState.postNewCommentsState
        user.notificationAlarmState.commentLikes = alarmState.commentLikesState
        user.notificationAlarmState.commentNewReplies = alarmState.commentNewRepliesState
        user.notificationAlarmState.chat = alarmState.chatState

        await user.save()

        res.send(201).json({
            data: {
                state: "알림 상태 변경.",
                message: "알림이 상태 값이 변경되었습니다."
            }
        })
    } catch (error) {
        console.log(error)
        next(error);
    }
}