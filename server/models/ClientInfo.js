const mongoose = require("mongoose");

const ClientInfoSchema = new mongoose.Schema({
    userAgent: String,
    screenWidth: Number,
    screenHeight: Number,
    language: String,
    platform: String,
}, {
    timestamps: true,
});

module.exports = mongoose.model("ClientInfo", ClientInfoSchema);
