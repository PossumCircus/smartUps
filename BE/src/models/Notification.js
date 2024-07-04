const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { // User who receives the notification 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sender: { // User who triggered the notification (if applicable)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    notificationType: {
        type: String,
        enum: ['new_comment', 'like', 'follow', /* ... other types */]
    },
    link: { type: String },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification; 
