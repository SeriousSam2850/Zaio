const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('listing', listingSchema)