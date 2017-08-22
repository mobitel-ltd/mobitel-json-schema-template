/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');
const jstArray = jst.array();

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsAllOf() {
    it('should be function', function() {
        assert.equal(typeof jstArray.items, 'function');
    });

    it('should return class instance', function() {
        const result = jstArray.items([{type: 'array'}]);
        assert.equal(typeof result, 'object');
        assert.equal((result instanceof Object), true);
        assert.equal((result instanceof jstArray.constructor), true);
        assert.equal((result.constructor === jstArray.constructor), true);
    });

    describe('should throw error when', function() {
        const test = (...args) => {
            let error;

            try {
                if (args.length > 0) {
                    jst.array().items(...args);
                } else {
                    jst.array().items();
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
            test('array');
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
                    {type: 'array'},
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
                    {type: 'array'},
                    {type: 'array'},
                    3,
                ],
                {type: 'array'},
                {type: 'array'},
                {type: 'boolean'}
            );
        });
    });

    describe('should create new property when', function() {
        const test = (...args) => {
            const result = jst.array().items(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'rule'), true);
            assert.equal(has(result.rule, 'type'), true);
            assert.equal(has(result.rule, 'items'), true);
            assert.equal(result.rule.type, 'array');
            return result;
        };

        it('call with Object', function() {
            const value = {type: 'array'};
            const result = test(value);
            assert.equal(result.rule.items[0], value);
        });

        it('call with Array of objects', function() {
            const value = [{type: 'array'}, {type: 'number'}, {type: 'null'}];
            const result = test(value);
            assert.equal(result.rule.items.length, 3);
            assert.equal(result.rule.items[0], value[0]);
            assert.equal(result.rule.items[1], value[1]);
            assert.equal(result.rule.items[2], value[2]);
        });

        it('call with multiple arguments', function() {
            const value = [{type: 'array'}, {type: 'number'}, {type: 'null'}];
            const value1 = {type: 'array'};
            const value2 = {type: 'boolean'};
            const value3 = {type: 'array'};
            const result = test(value, value1, value2, value3);
            assert.equal(result.rule.items.length, 6);
            assert.equal(result.rule.items.includes(value[0]), true);
            assert.equal(result.rule.items.includes(value[1]), true);
            assert.equal(result.rule.items.includes(value[2]), true);
            assert.equal(result.rule.items.includes(value1), true);
            assert.equal(result.rule.items.includes(value2), true);
            assert.equal(result.rule.items.includes(value3), true);
        });

        it('multiple calls, set property value from last call', function() {
            const value1 = [{type: 'array'}, {type: 'array'}];
            const value2 = [{type: 'number'}, {type: 'number'}];
            const value3 = [{type: 'boolean'}, {type: 'boolean'}];
            const result = jst.array()
                .items(value1)
                .items(value2)
                .items(value3);
            assert.equal(result.rule.items[0], value3[0]);
            assert.equal(result.rule.items[1], value3[1]);
        });
    });
};
