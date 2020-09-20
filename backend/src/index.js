const pg                = require('pg');
const express           = require('express');
const cors              = require('cors');
const bodyParser        = require('body-parser')
const keys              = require('./keys');
const redisService      = require('./redis-service');

const pgPool = new pg.Pool({
    host: keys.POSTGRES_HOST,
    port: keys.POSTGRES_PORT,
    user: keys.POSTGRES_USERNAME,
    password: keys.POSTGRES_PASSWORD,
    database: keys.POSTGRES_DB    
});

pgPool.query('CREATE TABLE IF NOT EXISTS FIB (index integer)', (err, res) => {
    console.log(err, res);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/values/all', (req, res) => {
    redisService.getAll().then((response) => {
        res.send({'values': response});    
    });    
});