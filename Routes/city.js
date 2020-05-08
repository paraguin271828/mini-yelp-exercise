const express = require("express");
const router = express.Router();
const client = require("../Database/database")

router.get('/', (req, res) => {
 client
 .query("SELECT * FROM city")
 .then ((data) => res.json(data))
 .catch ((err) => res.send(err))
});

router.get('/:id', (req, res) => {
const { id }  =   req.params;
;
client
.query("SELECT * FROM city WHERE id=$1;", [id])
.then ((data) => res.json(data))
.catch ((err) => res.send(err))

});


router.post('/', (req, res) =>{

const { name } = req.body; 

client
.query("INSERT INTO city (name) VALUES($1);", [name])
.then((data) => res.json(data))
.catch((err) => res.json(err))
})



module.exports = router;

