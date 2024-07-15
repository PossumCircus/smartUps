const AppError = require('../../utils/appError');
const { Notification } = require('../../models/Notification');
const User = require('../../models/User')

// Function 1 : get notifications
exports.getNotifications = async (req, res, next) => {
    try {
        const userId = req.params.loginUserId
        const notifications = await Notification.find({ recipient: userId })
            .populate('sender', 'username')
            .sort({ createdAt: -1 })
        if (!notifications) return next(new AppError("There are no notifications to fetch"))
        console.log('notifications', notifications)
        res.status(200).json(notifications)
    } catch (error) {
        console.log(error)
        next(error);
    }
}

// Utility function to send a notification to a user and add notification to Notification db
exports.createNotification = async (req, res, next) => {
    try {
        const creationData = req.body
        if (!creationData) return next(new AppError("There is no notificationData"))

        const recipientId = creationData.recipient
        const senderId = creationData.sender

        await Notification.create(creationData);

        const sender = await User.findById(senderId)
        // Optional: If you want a new notification indicator on the User 
        await User.findByIdAndUpdate(recipientId, { $inc: { newNotificationsCount: 1 } });
        console.log(sender.username)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.deleteNotification = async (req, res, next) => {
    try {
        const { checkedNotificationData } = req.body
        const user = await User.findById(req.body.loginId).populate('notifications')
        const target = user.notifications.findIndex(notification => notification._id === checkedNotificationData._id)
        user.notifications.splice(target, 1)
        await user.save()
        await User.findByIdAndUpdate(userId, { $inc: { newNotificationsCount: 1 } });
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

exports.setNotificationsState = async (req, res, next) => {
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