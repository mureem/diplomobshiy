const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express();
const PORT = config.get("serverPort");
const corsMiddleware = require("./middleware/cors.middleware")



app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth",authRouter);
app.use("/api/files",fileRouter);

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