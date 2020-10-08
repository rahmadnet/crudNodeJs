const {Pool} = require('pg')
const poll = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_database',
    password: 'rahmadnet',
    port: 5432,
    idleTimeoutMillis: 30000,
})

module.exports = {poll};
