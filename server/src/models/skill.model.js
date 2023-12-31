const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    prettyName: {
        type: String,
        required: true,
    },
    skill: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: false,
    },
    rank: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Skill', skillSchema);