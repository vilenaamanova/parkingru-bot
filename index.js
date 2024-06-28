const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');

const token = '7277120640:AAFotsvLqsURfP5-kNrE1aCEu2sukUov7Gg'
// const token = '6975013618:AAFlxz1RJry6MwsTEjuIlTzpshWM-O4jc48'
const webAppUrl = 'https://master--lovely-gnome-63df9f.netlify.app'

const bot = new TelegramBot(token, {polling: true});
const app = express();

app.use(express.json());
app.use(cors());

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

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

// app.post('/send-message', (req, res) => {
//     const { chatId, message } = req.body;
//
//     bot.sendMessage(chatId, message)
//         .then(() => {
//             res.status(200).send('Message sent');
//         })
//         .catch(err => {
//             res.status(500).send('Failed to send message');
//         });
// });
//
// app.get('/', (req, res) => {
//     res.send('<h1>Welcome to the Telegram Web App</h1><button onclick="window.location.href=\'/app\'">Get Started</button>');
// });
//
// app.get('/app', (req, res) => {
//     res.send('<h1>Main Application</h1><footer><button onclick="navigate(\'home\')">Главная</button><button onclick="navigate(\'map\')">Карта</button><button onclick="navigate(\'payment\')">Оплата</button><button onclick="navigate(\'timer\')">Таймер</button></footer><script>function navigate(page) { window.location.href = `/${page}`; }</script>');
// });
//
// app.get('/home', (req, res) => {
//     res.send('<h1>Home Page</h1><footer><button onclick="navigate(\'home\')">Главная</button><button onclick="navigate(\'map\')">Карта</button><button onclick="navigate(\'payment\')">Оплата</button><button onclick="navigate(\'timer\')">Таймер</button></footer><script>function navigate(page) { window.location.href = `/${page}`; }</script>');
// });
//
// app.get('/map', (req, res) => {
//     res.send('<h1>Map Page</h1><footer><button onclick="navigate(\'home\')">Главная</button><button onclick="navigate(\'map\')">Карта</button><button onclick="navigate(\'payment\')">Оплата</button><button onclick="navigate(\'timer\')">Таймер</button></footer><script>function navigate(page) { window.location.href = `/${page}`; }</script>');
// });
//
// app.get('/payment', (req, res) => {
//     res.send('<h1>Payment Page</h1><footer><button onclick="navigate(\'home\')">Главная</button><button onclick="navigate(\'map\')">Карта</button><button onclick="navigate(\'payment\')">Оплата</button><button onclick="navigate(\'timer\')">Таймер</button></footer><script>function navigate(page) { window.location.href = `/${page}`; }</script>');
// });
//
// app.get('/timer', (req, res) => {
//     res.send('<h1>Timer Page</h1><footer><button onclick="navigate(\'home\')">Главная</button><button onclick="navigate(\'map\')">Карта</button><button onclick="navigate(\'payment\')">Оплата</button><button onclick="navigate(\'timer\')">Таймер</button></footer><script>function navigate(page) { window.location.href = `/${page}`; }</script>');
// });

const PORT = 8000;

app.listen(PORT, () => console.log('server started on PORT ' + PORT))