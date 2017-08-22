/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');
const jstString = jst.string();

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsNot() {
    it('should be function', function() {
        assert.equal(typeof jstString.not, 'function');
    });

    it('should return class instance', function() {
        const result = jstString.not({type: 'string'});
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
                    jst.string().not(...args);
                } else {
                    jst.string().not();
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

        it('call with Array', function() {
            test(
                [
                    {type: 'string'},
                    {type: 'number'},
                    {type: 'null'},
                ]
            );
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

        it('call with multiple arguments', function() {
            test(
                [
                    {type: 'string'},
                    {type: 'number'},
                    {type: 'null'},
                ],
                {type: 'string'},
                {type: 'boolean'},
                {type: 'string'}
            );
        });
    });

    describe('should create new property when', function() {
        const test = (...args) => {
            const result = jst.string().not(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'rule'), true);
            assert.equal(has(result.rule, 'type'), true);
            assert.equal(has(result.rule, 'not'), true);
            assert.equal(result.rule.type, 'string');
            assert.equal(result.rule.not, args[0]);
        };

        it('call with Object', function() {
            test({type: 'string'});
        });

        it('multiple calls, set property value from last call', function() {
            const value1 = {type: 'string'};
            const value2 = {type: 'number'};
            const value3 = {type: 'boolean'};
            const result = jst.string()
                .not(value1)
                .not(value2)
                .not(value3);
            assert.equal(result.rule.not, value3);
        });
    });
};
