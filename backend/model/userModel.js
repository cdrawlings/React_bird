const mongoose = require('mongoose');

const BirdSchema = new mongoose.Schema({
    comName: {
        type: String,
    },
    speciesCode: {
        type: String,
        unique: true
    },
    firstSpotted: {
        type: Date,
        default: Date.now
    },
})

const UserSchema = mongoose.Schema({
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
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    googleId: {
        type: String,
    },
    displayName: {
        type: String,
    },
    bird: [BirdSchema]
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', UserSchema)