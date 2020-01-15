const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {    // USER
        type: String,
        max: 45,
        default: null
    },  
    lastName: {     // USER
        type: String,
        max: 45,
        default: null
    },
    bio: {          // USER
        type: String,
        max: 255,
        default: null
    },
    user: {         // SERVER
        type: String,
        required: true,
        ref: 'User'
    }
});

module.exports = mongoose.model('Profile', schema);