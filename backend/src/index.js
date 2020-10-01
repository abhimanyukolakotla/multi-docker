const express           = require('express');
const pg                = require('pg');
const cors              = require('cors');
const bodyParser        = require('body-parser')
const keys              = require('./keys');
const redisService      = require('./redis-service');

redisService.connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostGres client setup.
const pgClient = new pg.Pool({
    host: keys.POSTGRES_HOST,
    port: keys.POSTGRES_PORT,
    user: keys.POSTGRES_USERNAME,
    password: keys.POSTGRES_PASSWORD,
    database: keys.POSTGRES_DB    
});

pgClient.on('error', () => console.log('Lost PostGres connection'));
pgClient.on('connect', () => {
    pgClient.query('CREATE TABLE IF NOT EXISTS FIBONACCI_SERIES (index integer)', (err, res) => {
        console.log(err, res);
    });
});


// Express Server Handlers
app.get('/', (req, res) => {
    res.send('Hi');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM FIBONACCI_SERIES');
    console.log('Values are', values.rows);
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    const values = await redisService.getAll();
    console.log('Values from Redis', values);
    res.send(values);
    /* redisService.getAll().then((response) => {
        res.send({'values': response});    
    });   */
});

app.post('/values', (req, res) => {
    const index = req.body.index;
    console.log('Request received for index', index);
    if(parseInt(index) > 40) {
        return res.status(422).send('Index too high, enter less than 40');
    }

    redisService.publish(index);

    pgClient.query('INSERT INTO FIBONACCI_SERIES(index) VALUES($1)', [index]);
    res.send({working: true});
});

app.listen(5000, err => {
    console.log('Listening at port 5000');
});