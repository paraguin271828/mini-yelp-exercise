const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 5000;

app.get('/', (req, res) => res.json({success: 'true'}));

app.listen(
    port, () => console.log(`Server listening on port ${port}`)
);
