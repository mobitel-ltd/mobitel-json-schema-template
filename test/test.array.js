/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst = require('../index.js');

const testsAdditional = require('./array/test.array-additional.js');
const testsItems = require('./array/test.array-items.js');
const testsMax = require('./array/test.array-max.js');
const testsMin = require('./array/test.array-min.js');
const testsUnique = require('./array/test.array-unique.js');

const has = function objHasProperty(obj, property) {
    return Object.prototype.hasOwnProperty.call(obj, property);
};

describe('jst.array()', function() {
    const jstArray1 = jst.array();
    const jstArray2 = jst.array();

    it('instance should be an object', function() {
        assert.equal(typeof jst.array(), 'object');
    });

    it('instances not equal', function() {
        assert.notEqual(jstArray1, jstArray2);
    });

    it('instances constructors is equal', function() {
        assert.equal(jstArray1.constructor, jstArray2.constructor);
    });

    it('not Singleton', function() {
        jstArray1.newProperty = true;
        const jstArray3 = jst.array();
        assert.equal(jstArray1.newProperty, true);
        assert.equal(jstArray3.newProperty, undefined);
    });

    it(`must have property 'rule' with type 'array'`, function() {
        assert.equal(has(jstArray1, 'rule'), true);
        assert.equal(typeof jstArray1.rule, 'object');
        assert.equal(has(jstArray1.rule, 'type'), true);
        assert.equal(jstArray1.rule.type, 'array');
    });

    describe('jst.array().additional()', testsAdditional);
    describe('jst.array().items()', testsItems);
    describe('jst.array().max()', testsMax);
    describe('jst.array().min()', testsMin);
    describe('jst.array().unique()', testsUnique);
});
