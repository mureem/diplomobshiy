const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const authRouter = require("./routes/auth.routes");
const fileRouter = require("./routes/file.routes");
const ClientInfo = require("./models/ClientInfo");
const corsMiddleware = require("./middleware/cors.middleware");

const app = express();
const PORT = config.get("serverPort");

// Middleware
app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static('static'));

// Обработчик для предзапросов (OPTIONS)
app.options('*', corsMiddleware);

// Routes
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);

// Route для сохранения информации о клиенте
app.post('/save-client-info', async (req, res) => {
    const clientInfo = req.body;
    console.log('Получена информация о клиенте:', clientInfo);

    try {
        // Сохранение информации о клиенте в базу данных
        const newClientInfo = new ClientInfo(clientInfo);
        await newClientInfo.save();
        res.status(200).send('Информация о клиенте успешно сохранена');
    } catch (error) {
        console.error('Ошибка при сохранении информации о клиенте в базу данных:', error);
        res.status(500).send('Ошибка при сохранении информации');
    }
});

const start = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        app.listen(PORT, () => {
            console.log('Server started on port', PORT);
        });
    } catch (e) {
        console.error('Error while connecting to MongoDB:', e.message);
    }
};

start();
