const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
    userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    connectionType: { type: String },
    connectedAt: { type: Date, default: Date.now } 
});

const Connection = mongoose.model('Connection', connectionSchema);
module.exports = Connection;
