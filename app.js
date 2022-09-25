const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/', (req, res) => {
    const time = new Date();
    const unix = Date.parse(time);
    res.json({ unix: unix, utc: time });
});

app.get('/api/:date', (req, res) => {
    let date = req.params.date;
    let unixDate;
    if (date.length === 13) {
        date = Number(date);
        unixDate = date;
    } else {
        unixDate = Date.parse(date);
    }
    const utcDate = new Date(date);
    console.log(unixDate);
    if (utcDate.toUTCString() === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
    } else if (unixDate === utcDate) {
        res.json({ unix: date, utc: utcDate.toUTCString() });
    } else {
        res.json({ unix: unixDate, utc: utcDate.toUTCString() });
    }
});

app.listen(3000);
