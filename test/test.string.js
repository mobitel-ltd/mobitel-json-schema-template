/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../index.js');

const testsAllOf = require('./string/test.string-allof.js');
const testsAnyOf = require('./string/test.string-anyof.js');
const testsDone = require('./string/test.string-done.js');
const testsPattern = require('./string/test.string-pattern.js');
const testsEnum = require('./string/test.string-enum.js');
const testsMax = require('./string/test.string-max.js');
const testsMin = require('./string/test.string-min.js');
const testsNot = require('./string/test.string-not.js');
const testsOneOf = require('./string/test.string-oneof.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

describe('jst.string()', function() {
    const jstString1 = jst.string();
    const jstString2 = jst.string();

    it('instance should be an object', function() {
        assert.equal(typeof jst.string(), 'object');
    });

    it('instances not equal', function() {
        assert.notEqual(jstString1, jstString2);
    });

    it('instances constructors is equal', function() {
        assert.equal(jstString1.constructor, jstString2.constructor);
    });

    it('not Singleton', function() {
        jstString1.newProperty = true;
        const jstString3 = jst.string();
        assert.equal(jstString1.newProperty, true);
        assert.equal(jstString3.newProperty, undefined);
    });

    it(`must have property 'rule' with type 'string'`, function() {
        assert.equal(has(jstString1, 'rule'), true);
        assert.equal(typeof jstString1.rule, 'object');
        assert.equal(has(jstString1.rule, 'type'), true);
        assert.equal(jstString1.rule.type, 'string');
    });

    describe('jst.string().min()', testsMin);
    describe('jst.string().max()', testsMax);
    describe('jst.string().pattern()', testsPattern);
    describe('jst.string().enum()', testsEnum);
    describe('jst.string().allOf()', testsAllOf);
    describe('jst.string().anyOf()', testsAnyOf);
    describe('jst.string().not()', testsNot);
    describe('jst.string().oneOf()', testsOneOf);
    describe('jst.string().done()', testsDone);
});
