
const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    recipients: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ["sent", "failed", "partial"],
        default: "failed"
    },
    sentCount: {
        type: Number,
        default: 0
    },
    failedCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Email", emailSchema);
