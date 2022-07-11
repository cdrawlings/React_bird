const mongoose = require('mongoose');


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
    bird: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bird'
    },
},
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', UserSchema)