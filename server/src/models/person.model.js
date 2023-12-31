const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    isLocked: {
        type: Boolean,
        default: false,
        required: false,
    },
    isPrivate: {
        type: Boolean,
        default: true,
        required: false,
    },
    profileUrl: {
        type: String,
        required: false,
    },
    profileQualifiesForVanityUrl: {
        type: Boolean,
        required: false,
    },
    video: {
        type: String,
        required: false,
    },
    groups: {
        type: Object,
        required: false,
    },
    tests: {
        type: Object,
        required: false,
    },
    competencies: {
        type: Object,
        required: false,
    },
    assignments: {
        type: Object,
        required: false,
    },
    clientRelationship: {
        type: String,
        required: false,
    },
    otherExperiences: {
        type: Object,
        required: false,
    },
    assignmentsInProgress: {
        type: Number,
        required: false,
    },
    assignmentsSelected: {
        type: Number,
        required: false,
    },
    employmentHistory: {
        type: String,
        required: false,
    },
    isCredlyFeatureEnabled: {
        type: Boolean,
        default: false,
        required: false,
    },
    profileID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
        required: false,
    },
}, {
    versionKey: false,
    timestamps: true,
    strict: false,
    collection: "person"
});

module.exports = mongoose.model('Person', personSchema, "person");