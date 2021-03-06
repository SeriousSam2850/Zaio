const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    agentEmail: {
        type: String,
        required: true
    },
    geo: {
        type: Object,
        lat: {
            type: String
        },
        lng: {
            type: String
        }
    }
})

module.exports = mongoose.model('property', propertySchema)