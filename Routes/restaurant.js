const express = require("express");
const router = express.Router();
const pool = require('../Database/database');

router.get('/', (req, res) => {
    res.send('route restaurants');
});

router.post('/', (req, res) => {
    const restaurantName = req.body.name;
    const cityName = req.body.city;
    const tags = req.body.tags;

    const tagArr = tags.split(" ");

    // TODO: check if restaurant in the given city already exists to prevent duplicates

    pool.query('SELECT id FROM city WHERE LOWER(name) = LOWER($1)', [cityName])
    .then(result => result.rows)
    .then(city => {
        let cityId = null;

        // check if city is already in the list (city has an id)
        if (city.length >= 0 && city[0].id) {
            cityId = city[0].id;
        } else {
            // if not, insert it to the city table
            console.log('City not in list. Inserting now.');
            // capitalize first letter of every word with INITCAP
            pool.query('INSERT INTO city (name) VALUES(INITCAP($1)) RETURNING id', [cityName])
            .then(result => {
                console.log('City successfully added.');
                console.log(result);
                cityId = result.row[0].id;
            })
            .catch(err => console.error(err));
        }

        console.log(cityId);
        return cityId;
    })
    .then(cityId => {
        // add restaurant to the list with the id of the city
        pool.query('INSERT INTO restaurant (name, city_id) VALUES($1, $2) RETURNING *', [restaurantName, cityId])
        .then(restaurant => res.send(`Restaurant ${restaurantName} added successfully.`))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));

    /* let tagIds = [];

    pool.query('SELECT id FROM tag WHERE name = ANY($1)', [tagArr])
    .then(result => {
        console.log(result.rows);
        tagIds = Array.from(result.rows);
        console.log(tagIds[0].id);
    })
    .catch(err => console.error(err)); */

//    console.log(restaurantName);
//    console.log(cityName);
//    console.log(tags);
});

module.exports = router;

