const redis = require('redis');
const keys = require('./keys');

var redisClient = null;
var publisher = null;

// Connect to redis
function connect() {
    console.log('Connecting to Redis')
    redisClient = redis.createClient({
        host: keys.REDIS_HOST,
        port: keys.REDIS_PORT
    });
    console.log('Connected to redis');
    publisher = redisClient.duplicate();
}

function getAll() {
    return new Promise((resolve, reject) => {
        response = redisClient.hgetall('values', (err, data) => {
            console.log(err);
            console.log(data);
            if(err) {
                reject(err);
            }
            return resolve(data);
        });
    });
}

function publish(data) {
    if(publisher == null) {
        connect()
    }
    redisClient.hset('values', data, 'Nothing yet!'); // Store the index
    publisher.publish('insert', data); // Send a event for worker to start working
}

module.exports = {
    connect: connect,
    getAll: getAll,
    publish: publish
}