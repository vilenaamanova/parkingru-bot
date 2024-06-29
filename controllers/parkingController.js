const db = require('../config/db');

const parkingZones = [
    {
        id: 1,
        name: "Парковочная зона №7814",
        location: "Кронверкский округ, Санкт-Петербург",
        distance: 500,
        totalSpaces: 50,
        hotline: "88005553535",
        userCars: ["Car1", "Car2"]
    },
    {
        id: 2,
        name: "Парковочная зона №7820",
        location: "Центральный район, Санкт-Петербург",
        distance: 300,
        totalSpaces: 30,
        hotline: "88005553535",
        userCars: ["Car3"]
    }
];

let parkingData = {
    timer: {
        startTime: Date.now(),
        duration: 0,
    }
};

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
];

exports.getParkingZone = (req, res) => {
    const parkingId = parseInt(req.params.id, 10);
    const parkingZone = parkingZones.find(zone => zone.id === parkingId);
    if (parkingZone) {
        res.json(parkingZone);
    } else {
        res.status(404).send('Парковочная зона не найдена');
    }
};

exports.extendParking = (req, res) => {
    const { duration } = req.body;

    if (typeof duration === 'number' && duration > 0) {
        parkingData.timer = {
            startTime: Date.now(),
            duration: duration,
        };

        res.status(200).send('Parking extended successfully.');
    } else {
        res.status(400).send('Invalid duration');
    }
};

exports.endParking = (req, res) => {
    parkingData.timer = null;
    res.status(200).send('Parking ended successfully.');
};
