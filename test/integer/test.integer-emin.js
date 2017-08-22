/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');
const jstInteger = jst.integer();

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsEMin() {
    it('should be function', function() {
        assert.equal(typeof jstInteger.eMin, 'function');
    });

    it('should return class instance', function() {
        const result = jstInteger.eMin();
        assert.equal(typeof result, 'object');
        assert.equal((result instanceof Object), true);
        assert.equal((result instanceof jstInteger.constructor), true);
        assert.equal((result.constructor === jstInteger.constructor), true);
    });

    describe('should create new property when', function() {
        const test = (...args) => {
            const result = jst.integer().eMin(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'rule'), true);
            assert.equal(has(result.rule, 'type'), true);
            assert.equal(has(result.rule, 'exclusiveMinimum'), true);
            assert.equal(result.rule.type, 'integer');
            assert.equal(result.rule.exclusiveMinimum, true);
        };

        it('call without arguments', function() {
            test();
        });

        it('call with null', function() {
            test(null);
        });

        it('call with true', function() {
            test(true);
        });

        it('call with false', function() {
            test(false);
        });

        it('call with NaN', function() {
            test(NaN);
        });

        it('call with Function', function() {
            test(() => 10);
        });

        it('call with Number', function() {
            test(1);
        });

        it('call with Number as 0', function() {
            test(0);
        });

        it('call with float Number', function() {
            test(1.2);
        });

        it('call with negative Number', function() {
            test(-1);
        });

        it('call with String', function() {
            test('string');
        });

        it('call with empty String', function() {
            test('');
        });

        it('call with Array', function() {
            test([1, 2, 3]);
        });

        it('call with empty Array', function() {
            test([]);
        });

        it('call with Object', function() {
            test({'1': 1});
        });

        it('call with empty Object', function() {
            test({});
        });

        it('call with Symbol', function() {
            test(Symbol('test'));
        });

        it('call with RegExp', function() {
            test(/^\d*$/);
        });

        it('call with multiple arguments', function() {
            test(1, 'foo');
        });

        it(`multiple calls, set property value 'true'`, function() {
            const result = jst.integer()
                .eMin()
                .eMin(2)
                .eMin(3);
            assert.equal(result.rule.exclusiveMinimum, true);
        });
    });
};
