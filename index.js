const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const balanceRoutes = require('./routes/balanceRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const userRoutes = require('./routes/userRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const token = '7277120640:AAFotsvLqsURfP5-kNrE1aCEu2sukUov7Gg'
const webAppUrl = 'https://parking-ru.netlify.app/hellopage'

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/', balanceRoutes);
app.use('/api/', parkingRoutes);
app.use('/api/', userRoutes);
// app.use('/webhook', webhookRoutes);

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Добро пожаловать в Parking.Ru! 🚙\n\nНаходите и оплачивайте парковку в нашем приложении.', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Открыть приложение', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
});

const PORT = 8000;
app.listen(PORT, () => console.log('server started on PORT ' + PORT))