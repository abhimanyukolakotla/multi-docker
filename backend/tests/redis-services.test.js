const sinon = require('sinon');
const expect = require('expect.js')
const redis = require('redis');
const redisService = require('../src/redis-service');

describe('redis-services tests', () => {
    const mock = sinon.createSandbox();
    mock.stub(redis, 'createClient').returns({
        set: (key, value, err) => {
            console.log(`mocked set, request: ${key} -> ${value}`);
            return value;
        },
        quit: () => {
            console.log(`mocked quit method`);
        },
        hgetall: (key, cb) => {
            return cb(null, [1, 2, 3, 4, 5])
        }, //() => [1, 2, 3, 4, 5]
        hset: (key, data, default_value) => {
            console.log('Publishing key, data and default value: ', key, data, default_value)
        },
        duplicate: () => {
            return {                
                publish: (key, data) => {
                    console.log('Publishing key and value: ', key, data)
                }//() => [1, 2, 3, 4, 5]
            }
        }
    });
    it('test getAll', (done) => {
        redisService.connect();
        redisService.getAll().then(response => {
            expect(response).to.be.eql([1, 2, 3, 4, 5]);
            done();
        });
    });

    it('test publish', (done) => {
        redisService.connect();
        redisService.publish(10);
        done();
    });
})