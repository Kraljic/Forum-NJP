const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {        // USER
        type: String,
        required: true,
        max: 64
    },
    description: {  // USER
        type: String,
        required: true,
        max: 255
    },
    section: {      // USER
        type: String,
        required: true
    },
    createdBy: {    // SERVER
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Category', schema);