const mongoose = require('mongoose');

const CountSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    speciesCode: {
        type: String,
    },
    comName: {
        type: String,
    },
    birdid: {
        type: String,
    }
})

const SessionSchema = mongoose.Schema({
        tempature: {
            type: Number,
            required: true
        },
        condition: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        visibility: {
            type: String,
            required: true
        },
        lat: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        count: [CountSchema]
    }, {
        timestamps: true,
    }
)

module.exports = mongoose.model('Session', SessionSchema)