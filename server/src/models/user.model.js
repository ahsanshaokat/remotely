const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isSeller: {
        type: Boolean,
        default: false,
        required: false,
    },
    personID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: false,
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);