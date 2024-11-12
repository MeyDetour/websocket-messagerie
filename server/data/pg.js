const {Pool} = require('pg');
const pool = new Pool({
    user: 'mey',
    host: 'localhost',
    database: 'websocketmessagerie',
    password: 'Ul140XgKzTUQ8',
    port: 5432
});
pool.on('connect', client => {
    client.query('set search_path to persons')
    console.log('connected to database postgres')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};