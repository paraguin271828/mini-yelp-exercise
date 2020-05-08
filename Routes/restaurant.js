const express = require("express");
const router = express.Router();
const client = require("../Database/database")

router.get('/', (req, res) => {
    res.send('route restaurants');
});

module.exports = router;

