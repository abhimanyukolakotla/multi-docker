const redis = require('redis');
const keys = require('./keys');

var redisClient = null;
var subscriber = null;

// Connect to redis
function connect() {
    redisClient = redis.createClient({
        host: keys.REDIS_HOST,
        port: keys.REDIS_PORT
    });

    subscriber = redisClient.duplicate();
}

function getAll() {
    return new Promise((resolve, reject) => {
        response = subscriber.hgetall('values', (err, data) => {
            if(err) {
                reject(err);
            }
            return resolve(data);
        });
    });
}

module.exports = {
    connect: connect,
    getAll: getAll
}