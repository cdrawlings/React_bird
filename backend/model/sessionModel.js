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

const SessionSchema = new mongoose.Schema({
    temperature: {
        type: String,
        required: true
    },
    condition: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        required: true
        },
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
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