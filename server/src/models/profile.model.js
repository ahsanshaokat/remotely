const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    location: {
        type: Object,
        required: false,
    },
    portrait: {
        type: String,
        required: false,
    },
    visibility: {
        type: Number,
        required: false,
    },
    isDisabled: {
        type: Boolean,
        required: false,
    },
    affiliated: {
        type: Boolean,
        required: false,
    },
    isLooking: {
        type: Boolean,
        required: false,
    },
    isLookingWeek: {
        type: Boolean,
        required: false,
    },
    exposeFullName: {
        type: Boolean,
        required: false,
    },
    confidentialityBound: {
        type: Boolean,
        required: false,
    },
    isConsoleViewable: {
        type: Boolean,
        required: false,
    },
    agencyRef: {
        type: String,
        required: false,
    },
    idVerified: {
        type: Boolean,
        required: false,
    },
    exposeBillings: {
        type: Boolean,
        required: false,
    },
    phoneVerified: {
        type: Boolean,
        required: false,
    },
    state: {
        type: Number,
        required: false,
    },
    hideAgencyEarnings: {
        type: Boolean,
        required: false,
    },
    contractorTier: {
        type: Number,
        required: false,
    },
    exclusiveAgencyContractor: {
        type: Boolean,
        required: false,
    },
    hideJss: {
        type: Boolean,
        required: false,
    },
    idBadgeStatus: {
        type: String,
        required: false,
    },
    contractToHire: {
        type: Boolean,
        required: false,
    },
    agencyUid: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: false,
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile-skill',
        required: false,
    }],
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);