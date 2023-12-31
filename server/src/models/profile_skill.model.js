const mongoose = require('mongoose');

const profileSkillSchema = new mongoose.Schema({
    profileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    skillID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true,
    }],
}, {
    versionKey: false,
    collection: "profile-skills"
});

module.exports = mongoose.model('profile-skills', profileSkillSchema, 'profile-skills');