const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    imageUrl: {
        type: String
    },
    price: {
        type: String
    },
    agentID: {
        type: String
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