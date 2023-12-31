const mongoose = require('mongoose');

const paymentIntentSchema = new mongoose.Schema({
    object: {
        type: String,
        required: false,
    },
    amount: {
        type: Number,
        required: true,
    },
    amountCapturable: {
        type: Number,
        required: false,
    },
    clientSecret: {
        type: String,
        required: false,
    },
    amountDetails: {
        type: String,
        required: false,
    },
    amountReceived: {
        type: Number,
        required: false,
    },
    application: {
        type: String,
        required: false,
    },
    applicationFeeAmount: {
        type: Number,
        required: false,
    },
    canceledAt: {
        type: Date,
        required: false,
    },
    cancellationReason: {
        type: String,
        required: false,
    },
    captureMethod: {
        type: String,
        required: false,
    },
    currency: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    invoice: {
        type: String,
        required: false,
    },
    paymentMethodTypes: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('payment-intent', paymentIntentSchema);