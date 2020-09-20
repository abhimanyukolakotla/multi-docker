const fib = require('../src/fib')
var expect = require('expect.js');

describe('fib test cases', () => {

    it('calculate fibonacci of 10', () => {
        result = fib(10)
        expect(result).to.equal(55);
    });

    it('calculate fibonacci of 5', () => {
        result = fib(5)
        expect(result).to.equal(5);
    });
});