const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    count: {
        type: Number,
    },
    speciesCode {
        type: String,
    },
    comName: {
        type: String,
    },
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
    count: [CountSchema]
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Session', SessionSchema)