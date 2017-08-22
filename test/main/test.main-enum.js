/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsEnum() {
    it('should be a function', function() {
        assert.equal(typeof jst.enum, 'function');
    });

    describe('should throw error when', function() {
        const test = (...args) => {
            let error;

            try {
                if (args.length > 0) {
                    jst.enum(...args);
                } else {
                    jst.enum();
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

        it('call with NaN', function() {
            test(NaN);
        });

        it('call with Function', function() {
            test(() => 10);
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

        it('call with multiple arguments where one argument is wrong', function() {
            const value = [1, {}, 3];
            const value1 = 'value';
            const value2 = NaN;
            const value3 = null;
            let error;
            try {
                jst.enum(value, value1, value2, value3);
            } catch (err) {
                error = err;
            }

            assert.equal((error instanceof Error), true, 'No Error instance');
            assert.equal(error.name, 'JSONSchemaTemplateError', 'No JSONSchemaTemplateError instance');
            assert.equal(!!error.message, true, 'No error message');
        });
    });

    describe('should return object when', function() {
        const test = (...args) => {
            const result = jst.enum(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'enum'), true);
            assert.equal(Object.keys(result).length, 1);
            assert.equal(Array.isArray(result.enum), true);
            return result;
        };

        it('call with null', function() {
            const value = null;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with true', function() {
            const value = true;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with false', function() {
            const value = false;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with Number', function() {
            const value = 1;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with Number as 0', function() {
            const value = 0;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with float Number', function() {
            const value = 1.2;
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with String', function() {
            const value = 'string';
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with empty String', function() {
            const value = '';
            const result = test(value);
            assert.equal(result.enum.length, 1);
            assert.equal(result.enum.includes(value), true);
        });

        it('call with Array', function() {
            const value = [1, 2, 3];
            const result = test(value);
            assert.equal(result.enum.length, 3);
            assert.equal(result.enum.includes(value[0]), true);
            assert.equal(result.enum.includes(value[1]), true);
            assert.equal(result.enum.includes(value[2]), true);
        });

        it('call with multiple arguments', function() {
            const value = [1, 2, 3];
            const value1 = 'value';
            const value2 = 1;
            const value3 = null;
            const result = test(value, value1, value2, value3);
            assert.equal(result.enum.length, 6);
            assert.equal(result.enum.includes(value[0]), true);
            assert.equal(result.enum.includes(value[1]), true);
            assert.equal(result.enum.includes(value[2]), true);
            assert.equal(result.enum.includes(value1), true);
            assert.equal(result.enum.includes(value2), true);
            assert.equal(result.enum.includes(value3), true);
        });
    });
};
