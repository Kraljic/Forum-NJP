const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    commentText: {      // USER
        type: String,
        required: true,
        min: 1,
        max: 1024
    },
    thread: {           // USER
        type: String,
        required: true,
        ref: 'Thread'
    },
    commentParent: {    // USER
        type: String,
        default: null,
        ref: 'Comment'
    },
    createdBy: {        // SERVER
        type: String,
        required: true,
        ref: 'User'
    },
    likes: {            // SERVER->FUTURE
        type: [String],
        default: []
    },
    comments: {         // SERVER->FUTURE
        type: [String],
        default: []
    },
    edited: {           // SERVER->FUTURE
        type: Boolean,
        default: false
    },
    deleted: {           // SERVER->FUTURE
        type: Boolean,
        default: false
    },
    datetime: {         // DB
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', schema);