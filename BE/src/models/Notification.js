const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notificationType: {
        type: String,
        enum: ['new_comment', 'like', 'follow', 'chat']
    },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

const notificationAlarmStateSchema = new mongoose.Schema({
    postLikes: {
        type: Boolean,
        default: false
    },
    postNewComments: {
        type: Boolean,
        default: false
    },
    commentLikes: {
        type: Boolean,
        default: false
    },
    commentNewReplies: {
        type: Boolean,
        default: false
    },
    chat: {
        type: Boolean,
        default: false
    }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = { Notification, notificationAlarmStateSchema } 
