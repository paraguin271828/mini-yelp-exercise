const express = require("express");
const router = express.Router();
const client = require('../Database/database');



router.get('/', (req, res) => {
    client
    .query('SELECT * FROM tag;')
    .then(data => res.json(data))
    .catch(e => console.log(e));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    client
    .query('SELECT * FROM "tag" WHERE id=$1;', [id])
    .then(data => res.json(data))
    .catch(e => console.log(e));
})

router.post('/', (req, res) => {
    const {name} = req.body;
    client
    .query('INSERT INTO tag(name) values($1);', [name])
    .then(data => res.json(data))
    .catch(e => console.log(e));
})

module.exports = router;

