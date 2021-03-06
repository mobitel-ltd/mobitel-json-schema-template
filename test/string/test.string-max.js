/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');
const jstString = jst.string();

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsMax() {
    it('should be function', function() {
        assert.equal(typeof jstString.max, 'function');
    });

    it('should return class instance', function() {
        const result = jstString.max(1);
        assert.equal(typeof result, 'object');
        assert.equal((result instanceof Object), true);
        assert.equal((result instanceof jstString.constructor), true);
        assert.equal((result.constructor === jstString.constructor), true);
    });

    describe('should throw error when', function() {
        const test = (...args) => {
            let error;

            try {
                if (args.length > 0) {
                    jst.string().max(...args);
                } else {
                    jst.string().max();
                }
            } catch (err) {
                error = err;
            }

            assert.equal((error instanceof Error), true, 'No Error instance');
            assert.equal(error.name, 'JSONSchemaTemplateError', 'No JSONSchemaTemplateError instance');
            assert.equal(!!error.message, true, 'No error message');
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

        it('call with multiple arguments where first argument is wrong', function() {
            test('foo', 1);
        });

        it('maximum value less than minimum value', function() {
            let error;

            try {
                jst.string().min(10).max(1);
            } catch (err) {
                error = err;
            }

            assert.equal((error instanceof Error), true, 'No Error instance');
            assert.equal(error.name, 'JSONSchemaTemplateError', 'No JSONSchemaTemplateError instance');
            assert.equal(!!error.message, true, 'No error message');
        });
    });

    describe('should create new property when', function() {
        const test = (...args) => {
            const result = jst.string().max(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'rule'), true);
            assert.equal(has(result.rule, 'type'), true);
            assert.equal(has(result.rule, 'maxLength'), true);
            assert.equal(result.rule.type, 'string');
            assert.equal(result.rule.maxLength, args[0]);
        };

        it('call with Number', function() {
            test(1);
        });

        it('call with Number as 0', function() {
            test(0);
        });

        it('call with multiple arguments where first argument is correct', function() {
            test(1, 'foo');
        });

        it('multiple calls, set property value from last call', function() {
            const result = jst.string()
                .max(1)
                .max(2)
                .max(3);
            assert.equal(result.rule.maxLength, 3);
        });

        it('maximum value larger than minimum value', function() {
            const result = jst.string().min(1).max(10);
            assert.equal(result.rule.minLength, 1);
            assert.equal(result.rule.maxLength, 10);
        });

        it('maximum value equal than minimum value', function() {
            const result = jst.string().min(1).max(1);
            assert.equal(result.rule.minLength, 1);
            assert.equal(result.rule.maxLength, 1);
        });
    });
};
