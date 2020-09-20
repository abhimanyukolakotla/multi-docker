const redis = require('redis');
const keys  = require('./keys');
const fib   = require('./fib');

const redisClient = redis.createClient({
    host: keys.REDIS_HOST,
    port: keys.REDIS_PORT,
    retry_strategy: () => 10000
});

const subscriber = redisClient.duplicate();

redisClient.on('connect', () => {
    console.log("Connected");
});

subscriber.on("subscribe", function(channel, count) {
    console.log("Subscribed")
});

subscriber.on("message", function(channel, message) {
    try {
        redisClient.hset('values', message, fib(parseInt(message)));
    } catch(err) {
        console.log('Error while parsing meessage:', message);
    }    
    console.log('Message received:', message);
});

subscriber.subscribe("vt-fib");