/** @type {JSONSchemaTemplateError} */
const ErrorHandler = require('./error-handler.js');
/** @type {MainTemplates} */
const MainTemplates = require('./types/main.js');
/** @type {IntegerTemplates} */
const IntegerTemplates = require('./types/type-integer.js');
/** @type {NumberTemplates} */
const NumberTemplates = require('./types/type-number.js');
/** @type {StringTemplates} */
const StringTemplates = require('./types/type-string.js');
/** @type {ArrayTemplates} */
const ArrayTemplates = require('./types/type-array.js');

/**
 * Common template methods for JSON-Schema
 * @extends MainTemplates
 */
class BaseTemplates extends MainTemplates {
    /** Class constructor */
    constructor() {
        super();
        this.IntegerClass = IntegerTemplates;
        this.NumberClass = NumberTemplates;
        this.StringClass = StringTemplates;
        this.ArrayClass = ArrayTemplates;
    }

    /**
     * Get class for generate Integer template for JSON-schema
     * @returns {IntegerTemplates} Class-generator
     */
    integer() {
        return new this.IntegerClass();
    }

    /**
     * Get class for generate Number template for JSON-schema
     * @returns {NumberTemplates} Class-generator
     */
    number() {
        return new this.NumberClass();
    }

    /**
     * Get class for generate String template for JSON-schema
     * @returns {StringTemplates} Class-generator
     */
    string() {
        return new this.StringClass();
    }

    /**
     * Get class for generate Array template for JSON-schema
     * @returns {ArrayTemplates} Class-generator
     */
    array() {
        return new this.ArrayClass();
    }

    /**
     * Add 'enum' generic keywords into JSON-schema
     * @param {*[]} args Parameter value
     * @returns {Object} Object with enum property
     */
    enum(...args) {
        const list = this._prepareEnum(...args);

        return {
            enum: list,
        };
    }

    /**
     * Add type 'NULL' into JSON-schema
     * @returns {Object} Object with template
     */
    null() {
        return {
            type: 'null',
        };
    }

    /**
     * Add type 'boolean' into JSON-schema
     * @param {Boolean|*} [value='all'] Boolean value or 'all'
     * @returns {Object} Object with template
     */
    boolean(value = 'all') {
        if (value === 'all') {
            return {
                type: 'boolean',
            };
        }

        return {
            type: 'boolean',
            enum: [Boolean(value)],
        };
    }

    /**
     * Add string with 'format' preset into JSON-schema
     * @param {String} args One of formats: 'date-time', 'email', 'hostname', 'ipv4', 'ipv6', 'uri'
     * @returns {Object} Object with template
     */
    stringFormat(...args) {
        if (!['date-time', 'email', 'hostname', 'ipv4', 'ipv6', 'uri'].includes(String(args[0]))) {
            throw new ErrorHandler(`Incorrect name of format string: ${String(args[0])}`);
        }

        return {
            type: 'string',
            format: args[0],
        };
    }

    /**
     * Add 'anyOf' combining type into JSON-schema
     * @param {Object[]} args List of anyOf parameters
     * @returns {Object} Object with template
     */
    anyOf(...args) {
        const list = this._prepareCombining(...args);

        return {
            anyOf: list,
        };
    }

    /**
     * Add 'allOf' combining type into JSON-schema
     * @param {Object[]} args List of allOf parameters
     * @returns {Object} Object with template
     */
    allOf(...args) {
        const list = this._prepareCombining(...args);

        return {
            allOf: list,
        };
    }

    /**
     * Add 'oneOf' combining type into JSON-schema
     * @param {Object[]} args List of oneOf parameters
     * @returns {Object} Object with template
     */
    oneOf(...args) {
        const list = this._prepareCombining(...args);

        return {
            oneOf: list,
        };
    }

    /**
     * Add 'not' combining type into JSON-schema
     * @param {Object} args Value for cobining type 'not'
     * @returns {Object} Object with template
     */
    not(...args) {
        const val = this._prepareCombiningNot(...args);

        return {
            not: val,
        };
    }

    /**
     * Add reference to other rules
     * @param {String} args Reference to other rules
     * @returns {Object} Object with template
     */
    ref(...args) {
        if (args.length > 1) {
            throw new ErrorHandler(`Too many arguments for refer value`);
        }

        const val = String(args[0]);
        if (!/#\//.test(val)) {
            throw new ErrorHandler(`Has incorrect refer value: ${val} (${typeof args[0]})`);
        }

        return {
            $ref: val,
        };
    }
}

module.exports = new BaseTemplates();
