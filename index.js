// const TelegramBot = require('node-telegram-bot-api');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
//
// const token = '7277120640:AAFotsvLqsURfP5-kNrE1aCEu2sukUov7Gg'
// const webAppUrl = 'https://master--lovely-gnome-63df9f.netlify.app'
//
// const bot = new TelegramBot(token, {polling: true});
// const app = express();
//
// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//
// const parkingZones = [
//     {
//         id: 1,
//         name: "Парковочная зона №7814",
//         location: "Кронверкский округ, Санкт-Петербург",
//         distance: 500,
//         totalSpaces: 50,
//         hotline: "88005553535",
//         userCars: ["Car1", "Car2"]
//     },
//     {
//         id: 2,
//         name: "Парковочная зона №7820",
//         location: "Центральный район, Санкт-Петербург",
//         distance: 300,
//         totalSpaces: 30,
//         hotline: "88005553535",
//         userCars: ["Car3"]
//     }
// ];
//
// let currentBooking = {
//     zoneNumber: '7814',
//     location: 'Кронверкский округ, Санкт-Петербург',
//     distance: '500 м',
//     startTime: new Date(),
//     endTime: new Date(),
//     status: 'Активен',
//     amount: 200,
// };
//
// let bookingHistory = [
//     { date: '2023-01-01', time: '10:00', distance: '300 м', amount: 150 },
//     { date: '2023-01-02', time: '11:30', distance: '400 м', amount: 180 },
//     // ...
// ];
//
// let myCars = [
//     { brand: 'Toyota', number: 'А123ВС' },
//     { brand: 'BMW', number: 'В456ЕН' },
//     // ...
// ];
//
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;
//
//     if(text === '/start') {
//         await bot.sendMessage(chatId, 'Добро пожаловать в Parking.Ru! 🚙\n\nНаходите и оплачивайте парковку в нашем приложении.', {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{text: 'Открыть приложение', web_app: {url: webAppUrl}}]
//                 ]
//             }
//         })
//     }
//
//     // if(msg?.web_app_data?.data) {
//     //     try {
//     //         const data = JSON.parse(msg?.web_app_data?.data)
//     //         console.log(data)
//     //         await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
//     //         await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
//     //         await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);
//     //
//     //         setTimeout(async () => {
//     //             await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
//     //         }, 3000)
//     //     } catch (e) {
//     //         console.log(e);
//     //     }
//     // }
// });
//
// // app.post('/web-data', async (req, res) => {
// //     const {queryId, products = [], totalPrice} = req.body;
// //     try {
// //         await bot.answerWebAppQuery(queryId, {
// //             type: 'article',
// //             id: queryId,
// //             title: 'Успешная покупка',
// //             input_message_content: {
// //                 message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
// //             }
// //         })
// //         return res.status(200).json({});
// //     } catch (e) {
// //         return res.status(500).json({})
// //     }
// // })
//
// // app.post('/send-message', (req, res) => {
// //     const { chatId, message } = req.body;
// //
// //     bot.sendMessage(chatId, message)
// //         .then(() => {
// //             res.status(200).send('Message sent');
// //         })
// //         .catch(err => {
// //             res.status(500).send('Failed to send message');
// //         });
// // });
//
// app.get('/api/user', (req, res) => {
//     const telegramLogin = 'user_telegram_login'; // Замените на реальное имя пользователя из Telegram
//
//     res.json({
//         telegramLogin,
//         currentBooking,
//         bookingHistory,
//         myCars,
//     });
// });
//
// app.get('/api/parking/:id', (req, res) => {
//     const parkingId = parseInt(req.params.id, 10);
//     const parkingZone = parkingZones.find(zone => zone.id === parkingId);
//     if (parkingZone) {
//         res.json(parkingZone);
//     } else {
//         res.status(404).send('Парковочная зона не найдена');
//     }
// });
//
// app.post('/api/endParking', (req, res) => {
//     parkingData.timer = null;
//     res.status(200).send('Parking ended successfully.');
// });
//
// let parkingData = {
//     timer: {
//         startTime: Date.now(),
//         duration: 0,
//     }
// };
//
// app.post('/api/extendParking', (req, res) => {
//     const { duration } = req.body;
//
//     if (typeof duration === 'number' && duration > 0) {
//         parkingData.timer = {
//             startTime: Date.now(),
//             duration: duration,
//         };
//
//         res.status(200).send('Parking extended successfully.');
//     } else {
//         res.status(400).send('Invalid duration');
//     }
// });
//
// // app.use(express.static(path.join(__dirname, 'public')));
// //
// // app.get('*', (req, res) => {
// //     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// // });
//
// let balance = 1000;
//
// app.get('/api/balance', (req, res) => {
//     res.json({ balance });
// });
//
// app.post('/api/deposit', (req, res) => {
//     const { amount, paymentMethod, phoneNumber } = req.body;
//
//     if (!amount || isNaN(amount)) {
//         return res.status(400).send('Invalid amount');
//     }
//
//     // Логика пополнения баланса
//     balance += parseFloat(amount);
//
//     // Можно добавить дополнительную логику для обработки способа оплаты и номера телефона
//     res.status(200).send('Balance deposited successfully.');
// });
//
// const PORT = 8000;
//
// app.listen(PORT, () => console.log('server started on PORT ' + PORT))


const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const balanceRoutes = require('./routes/balanceRoutes');
const parkingRoutes = require('./routes/parkingRoutes');
const userRoutes = require('./routes/userRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

const token = '7277120640:AAFotsvLqsURfP5-kNrE1aCEu2sukUov7Gg'
const webAppUrl = 'https://master--lovely-gnome-63df9f.netlify.app'

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