const express = require('express');
const client = require('./Database/database')
const app = express();
const port = 5000;

const restaurants = require('./Routes/restaurant');
const tags = require('./Routes/tag');
const cities = require('./Routes/city');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/restaurants', restaurants);
app.use('/tags', tags);
app.use('/cities', cities);

app.get('/', (req, res) => res.json({success: 'true'}));


app.listen(
    port, () => console.log(`Server listening on port ${port}`)
);
