const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },
    agent: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('customer', userSchema)