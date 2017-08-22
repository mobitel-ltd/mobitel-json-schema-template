/* eslint no-undefined: 0, func-names: 0, prefer-arrow-callback: 0, max-nested-callbacks: 0 */

const assert = require('assert');
const jst1 = require('../index.js');
const jst2 = require('../index.js');

const testsAllOf = require('./main/test.main-allof.js');
const testsAnyOf = require('./main/test.main-anyof.js');
const testsBoolean = require('./main/test.main-boolean.js');
const testsEnum = require('./main/test.main-enum.js');
const testsNot = require('./main/test.main-not.js');
const testsNull = require('./main/test.main-null.js');
const testsOneOf = require('./main/test.main-oneof.js');
const testsRef = require('./main/test.main-ref.js');
const testsStringFormat = require('./main/test.main-string-format.js');

describe('jst', function() {
    it('should be an object', function() {
        assert.equal(typeof jst1, 'object');
    });

    it('has equal instances', function() {
        assert.equal(jst1, jst2);
    });

    it('is Singleton', function() {
        jst1.newProperty = true;
        assert.equal(jst2.newProperty, true);
    });

    it('has method .integer as instance of Function', function() {
        assert.equal((jst1.integer instanceof Function), true);
    });

    it('has method .number as instance of Function', function() {
        assert.equal((jst1.number instanceof Function), true);
    });

    it('has method .string as instance of Function', function() {
        assert.equal((jst1.string instanceof Function), true);
    });

    it('has method .array as instance of Function', function() {
        assert.equal((jst1.array instanceof Function), true);
    });

    describe('jst.allOf()', testsAllOf);
    describe('jst.anyOf()', testsAnyOf);
    describe('jst.boolean()', testsBoolean);
    describe('jst.enum()', testsEnum);
    describe('jst.not()', testsNot);
    describe('jst.null()', testsNull);
    describe('jst.oneOf()', testsOneOf);
    describe('jst.ref()', testsRef);
    describe('jst.stringFormat()', testsStringFormat);
});
