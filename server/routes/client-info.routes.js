const Router = require('express')
const router = new Router()
const ClientInfo = require("../models/ClientInfo");
const authMiddleware = require("../middleware/auth.middleware");



router.get('', authMiddleware, async (req, res) => {
    console.log('get client info:');

    try {
        const allClientInfo = await ClientInfo.find({})
        res.send(allClientInfo)
    } catch (error) {
        console.error('Ошибка при получении информации о клиенте в базу данных:', error);
        res.status(500).send('Ошибка при получении информации');
    }
});

module.exports = router