const mongoose = require("mongoose");

const ClientInfoSchema = new mongoose.Schema({
    userAgent: String,
    screenWidth: Number,
    screenHeight: Number,
    language: String,
    platform: String,
    timezoneOffset: Number, // Добавлено для хранения смещения часового пояса
    ipAddress: String, // Добавлено для хранения IP-адреса пользователя
    browser: String,
    browserVersion: String,
    operatingSystem: String,
    osVersion: String,
    deviceModel: String, // Изменено имя на deviceModel для соответствия новому названию поля
}, {
    timestamps: true,
});

module.exports = mongoose.model("ClientInfo", ClientInfoSchema);
