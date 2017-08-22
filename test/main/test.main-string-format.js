/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../../index.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

module.exports = function testsStringFormat() {
    it('should be function', function() {
        assert.equal(typeof jst.stringFormat, 'function');
    });

    describe('should throw error when', function() {
        const test = (...args) => {
            let error;

            try {
                if (args.length > 0) {
                    jst.stringFormat(...args);
                } else {
                    jst.stringFormat();
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
    });

    describe('should return object when', function() {
        const test = (...args) => {
            const result = jst.stringFormat(...args);
            assert.equal(typeof result, 'object');
            assert.equal(has(result, 'type'), true);
            assert.equal(typeof result.type, 'string');
            assert.equal(result.type, 'string');
            assert.equal(Object.keys(result).length, 2);
            assert.equal(typeof result.format, 'string');
            assert.equal(result.format, args[0]);
        };

        it('call with value "date-time"', function() {
            test('date-time');
        });

        it('call with value "email"', function() {
            test('email');
        });

        it('call with value "hostname"', function() {
            test('hostname');
        });

        it('call with value "ipv4"', function() {
            test('ipv4');
        });

        it('call with value "ipv6"', function() {
            test('ipv6');
        });

        it('call with value "uri"', function() {
            test('uri');
        });
    });
};
