const db = require('../config/db');

// Пример данных о пользователе, в реальном приложении эти данные будут из базы данных
let currentBooking = {
    zoneNumber: '7814',
    location: 'Кронверкский округ, Санкт-Петербург',
    distance: '500 м',
    startTime: new Date(),
    endTime: new Date(),
    status: 'Активен',
    amount: 200,
};

let bookingHistory = [
    { date: '2023-01-01', time: '10:00', distance: '300 м', amount: 150 },
    { date: '2023-01-02', time: '11:30', distance: '400 м', amount: 180 },
    // ...
];

let myCars = [
    { brand: 'Toyota', number: 'А123ВС' },
    { brand: 'BMW', number: 'В456ЕН' },
    // ...
];

exports.getUserInfo = (req, res) => {
    const telegramLogin = 'user_telegram_login'; // В реальном приложении это будет динамическое значение

    res.json({
        telegramLogin,
        currentBooking,
        bookingHistory,
        myCars,
    });
};

exports.addCar = (req, res) => {
    const { brand, number } = req.body;
    if (brand && number) {
        myCars.push({ brand, number });
        res.status(200).send('Car added successfully.');
    } else {
        res.status(400).send('Invalid car data.');
    }
};
