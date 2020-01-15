const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {        // USER
        type: String,
        required: true,
        max: 128
    },
    threadText: {   // USER
        type: String,
        required: true,
        min: 10,
        max: 2048
    },
    category: {     // USER
        type: String,
        required: true
    },
    createdBy: {    // SERVER
        type: String,
        ref: 'User',
        required: true
    },
    likes: {        // SERVER -> FUTURE
        type: [String],
        default: []
    },
    comments: {     // SERVER -> FUTURE
        type: [String],
        default: []
    },
    datetime: {     // DB
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Thread', schema);