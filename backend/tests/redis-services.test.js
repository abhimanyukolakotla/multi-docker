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
        duplicate: () => {
            return {
                hgetall: (key, cb) => {
                    return cb(null, [1, 2, 3, 4, 5])
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
})