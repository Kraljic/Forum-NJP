const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    username: {     // USER
        type: String,
        required: true,
        min: 4,
        max: 45,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        uniqueCaseInsensitive: true
    },
    email: {        // USER
        type: String,
        required: true,
        max: 64,
        unique: true,
        index: true,
        lowercase: true,
        trim: true,
        uniqueCaseInsensitive: true
    },
    passwordHash: { // USER/SERVER
        type: String,
        required: true,
        min: 8,
        max: 64
    },
    role: { // USER/SERVER
        type: String,
        default: 'user',
        enum: ['user', 'moderator', 'admin']
    },
    date: {         // DB
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', schema);