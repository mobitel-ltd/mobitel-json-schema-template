/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../index.js');

const testsMax = require('./integer/test.integer-max.js');
const testsMin = require('./integer/test.integer-min.js');
const testsEMax = require('./integer/test.integer-emax.js');
const testsEMin = require('./integer/test.integer-emin.js');
const testsMultipleOf = require('./integer/test.integer-multipleof.js');
const testsEnum = require('./integer/test.integer-enum.js');
const testsAllOf = require('./integer/test.integer-allof.js');
const testsAnyOf = require('./integer/test.integer-anyof.js');
const testsOneOf = require('./integer/test.integer-oneof.js');
const testsNot = require('./integer/test.integer-not.js');
const testsDone = require('./integer/test.integer-done.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

describe('jst.integer()', function() {
    const jstInteger1 = jst.integer();
    const jstInteger2 = jst.integer();

    it('instance should be an object', function() {
        assert.equal(typeof jst.integer(), 'object');
    });

    it('instances not equal', function() {
        assert.notEqual(jstInteger1, jstInteger2);
    });

    it('instances constructors is equal', function() {
        assert.equal(jstInteger1.constructor, jstInteger2.constructor);
    });

    it('not Singleton', function() {
        jstInteger1.newProperty = true;
        const jstInteger3 = jst.integer();
        assert.equal(jstInteger1.newProperty, true);
        assert.equal(jstInteger3.newProperty, undefined);
    });

    it(`have property 'rule' with type 'integer'`, function() {
        assert.equal(has(jstInteger1, 'rule'), true);
        assert.equal(typeof jstInteger1.rule, 'object');
        assert.equal(has(jstInteger1.rule, 'type'), true);
        assert.equal(jstInteger1.rule.type, 'integer');
    });

    describe('jst.integer().max()', testsMax);
    describe('jst.integer().min()', testsMin);
    describe('jst.integer().eMax()', testsEMax);
    describe('jst.integer().eMin()', testsEMin);
    describe('jst.integer().multipleOf()', testsMultipleOf);
    describe('jst.integer().enum()', testsEnum);
    describe('jst.integer().allOf()', testsAllOf);
    describe('jst.integer().anyOf()', testsAnyOf);
    describe('jst.integer().oneOf()', testsOneOf);
    describe('jst.integer().not()', testsNot);
    describe('jst.integer().done()', testsDone);
});
