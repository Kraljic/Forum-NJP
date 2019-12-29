const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    priority: {   
        type: Number,
        required: true,
        default: 0
    },
    name: {
        type: String,
        required: true,
        max: 20,
        unique: true,
        index: true,
        lowercase: true
    }
});

module.exports = mongoose.model('Role', schema);