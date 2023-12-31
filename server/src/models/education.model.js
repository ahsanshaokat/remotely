const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    personID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true,
    },
    institutionName: {
        type: String,
        required: false
    },
    areaOfStudy: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    dateStarted: {
        type: Date,
        required: false
    },
    dateEnded: {
        type: Date,
        required: false
    },
    comment: {
        type: String,
        required: false
    } 
}, {
    versionKey: false
});

module.exports = mongoose.model('Education', educationSchema);