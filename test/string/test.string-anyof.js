/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');
const jstString = jst.string();

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsAnyOf() {
    it('should be function', function() {
        assert.equal(typeof jstString.anyOf, 'function');
    });

    it('should return class instance', function() {
        const result = jstString.anyOf([{type: 'string'}]);
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
                    jst.string().anyOf(...args);
                } else {
                    jst.string().anyOf();
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

        it('call with empty Array', function() {
            test([]);
        });

        it('call with Array where one value is wrong', function() {
            test(
                [
                    {type: 'string'},
                    {type: 'number'},
                    3,
                ]
            );
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
            test(
                [
                    {type: 'string'},
                    {type: 'string'},
                    3,
                ],
                {type: 'string'},
                {type: 'string'},
                {type: 'boolean'}
            );
        });
    });

    describe('should create new property when', function() {
        const test = (...args) => {
            const result = jst.string().anyOf(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'rule'), true);
            assert.equal(has(result.rule, 'type'), true);
            assert.equal(has(result.rule, 'anyOf'), true);
            assert.equal(result.rule.type, 'string');
            assert.equal(Array.isArray(result.rule.anyOf), true);
            return result;
        };

        it('call with Object', function() {
            const value = {type: 'string'};
            const result = test(value);
            assert.equal(result.rule.anyOf.length, 1);
            assert.equal(result.rule.anyOf[0], value);
        });

        it('call with Array', function() {
            const value = [{type: 'string'}, {type: 'number'}, {type: 'null'}];
            const result = test(value);
            assert.equal(result.rule.anyOf.length, 3);
            assert.equal(result.rule.anyOf[0], value[0]);
            assert.equal(result.rule.anyOf[1], value[1]);
            assert.equal(result.rule.anyOf[2], value[2]);
        });

        it('call with multiple correct arguments', function() {
            const value = [{type: 'string'}, {type: 'number'}, {type: 'null'}];
            const value1 = {type: 'string'};
            const value2 = {type: 'boolean'};
            const value3 = {type: 'string'};
            const result = test(value, value1, value2, value3);
            assert.equal(result.rule.anyOf.length, 6);
            assert.equal(result.rule.anyOf.includes(value[0]), true);
            assert.equal(result.rule.anyOf.includes(value[1]), true);
            assert.equal(result.rule.anyOf.includes(value[2]), true);
            assert.equal(result.rule.anyOf.includes(value1), true);
            assert.equal(result.rule.anyOf.includes(value2), true);
            assert.equal(result.rule.anyOf.includes(value3), true);
        });

        it('multiple calls, set property value from last call', function() {
            const value1 = [{type: 'string'}, {type: 'string'}];
            const value2 = [{type: 'number'}, {type: 'number'}];
            const value3 = [{type: 'boolean'}, {type: 'boolean'}];
            const result = jst.string()
                .anyOf(value1)
                .anyOf(value2)
                .anyOf(value3);
            assert.equal(result.rule.anyOf[0], value3[0]);
            assert.equal(result.rule.anyOf[1], value3[1]);
        });
    });
};
