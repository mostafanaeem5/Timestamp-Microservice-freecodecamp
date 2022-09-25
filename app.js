const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/:date', (req, res) => {
    let date = req.params.date;
    if (date.length === 13) {
        date = Number(date);
    }
    const utcDate = new Date(date);
    const unixDate = Date.parse(date);
    if (unixDate != utcDate) {
        res.json({ unix: unixDate, utc: utcDate.toUTCString() });
    } else {
        res.json({ unix: date, utc: utcDate.toUTCString() });
    }
});

app.listen(3000);
