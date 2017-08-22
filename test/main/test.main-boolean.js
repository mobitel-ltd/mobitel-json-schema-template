/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsBoolean() {
    it('should be function', function() {
        assert.equal(typeof jst.boolean, 'function');
    });

    describe('should return object when', function() {
        const test = (...args) => {
            let result;
            let checkResult = args[0];
            if (args.length > 0) {
                result = jst.boolean(...args);
            } else {
                result = jst.boolean();
                checkResult = undefined;
            }
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'type'), true);
            assert.equal(typeof result.type, 'string');
            assert.equal(result.type, 'boolean');
            if (args[0] === 'all' || args[0] === undefined) {
                assert.equal(Object.keys(result).length, 1);
            } else {
                assert.equal(Object.keys(result).length, 2);
                assert.equal(Array.isArray(result.enum), true);
                assert.equal(result.enum[0], Boolean(checkResult));
            }
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
            test({key: 'value'});
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
            test([1, 2, 3], 'value', 1, null);
        });

        it('call with "all"', function() {
            test('all');
        });
    });
};
