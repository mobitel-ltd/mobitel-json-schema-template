/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../index.js');

const testsMax = require('./number/test.number-max.js');
const testsMin = require('./number/test.number-min.js');
const testsEMax = require('./number/test.number-emax.js');
const testsEMin = require('./number/test.number-emin.js');
const testsMultipleOf = require('./number/test.number-multipleof.js');
const testsEnum = require('./number/test.number-enum.js');
const testsAllOf = require('./number/test.number-allof.js');
const testsAnyOf = require('./number/test.number-anyof.js');
const testsOneOf = require('./number/test.number-oneof.js');
const testsNot = require('./number/test.number-not.js');
const testsDone = require('./number/test.number-done.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

describe('jst.number()', function() {
    const jstNumber1 = jst.number();
    const jstNumber2 = jst.number();

    it('instance should be an object', function() {
        assert.equal(typeof jst.number(), 'object');
    });

    it('instances not equal', function() {
        assert.notEqual(jstNumber1, jstNumber2);
    });

    it('instances constructors is equal', function() {
        assert.equal(jstNumber1.constructor, jstNumber2.constructor);
    });

    it('not Singleton', function() {
        jstNumber1.newProperty = true;
        const jstNumber3 = jst.number();
        assert.equal(jstNumber1.newProperty, true);
        assert.equal(jstNumber3.newProperty, undefined);
    });

    it(`must have property 'rule' with type 'number'`, function() {
        assert.equal(has(jstNumber1, 'rule'), true);
        assert.equal(typeof jstNumber1.rule, 'object');
        assert.equal(has(jstNumber1.rule, 'type'), true);
        assert.equal(jstNumber1.rule.type, 'number');
    });

    describe('jst.number().max()', testsMax);
    describe('jst.number().min()', testsMin);
    describe('jst.number().eMax()', testsEMax);
    describe('jst.number().eMin()', testsEMin);
    describe('jst.number().multipleOf()', testsMultipleOf);
    describe('jst.number().enum()', testsEnum);
    describe('jst.number().allOf()', testsAllOf);
    describe('jst.number().anyOf()', testsAnyOf);
    describe('jst.number().oneOf()', testsOneOf);
    describe('jst.number().not()', testsNot);
    describe('jst.number().done()', testsDone);
});
