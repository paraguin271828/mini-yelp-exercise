const { pool } = require('pg')



const pool = new Pool ({

    user: 'postgres',
    host: 'localhost',
    database: 'foreign',
    password: 'lol123',
    port: 5432,

})

module.exports = pool;
