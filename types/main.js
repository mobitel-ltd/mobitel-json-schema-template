/** @type {JSONSchemaTemplateError} */
const ErrorHandler = require('../error-handler.js');

/** Main class for extend other classes */
class MainTemplates {
    /** Class constructor */
    constructor() {
        this.rule = {};
    }

    /**
     * Generate and validate ENUM values list
     * @param {*[]} args Values for ENUM
     * @returns {Array} List of ENUM values
     */
    _prepareEnum(...args) {
        let source = [...args];
        let list = [];

        if (source.length > 0) {
            for (let i = 0; i < source.length; i++) {
                const val = source[i];

                if (Array.isArray(val)) {
                    source = source.concat(val);
                    delete source[i];
                    continue;
                }

                let valType = typeof val;
                valType = Array.isArray(val) ? 'array' : valType;
                valType = null === val ? 'null' : valType;
                valType = Number.isNaN(val) ? 'nan' : valType;

                if (!['number', 'string', 'boolean', 'null'].includes(valType)) {
                    throw new ErrorHandler(`Has incorrect enum value: ${val.toString()} (${typeof val})`);
                }

                list.push(val);
            }
            list = list.filter(value => !(typeof value === 'undefined'));
        }

        if (list.length === 0) {
            throw new ErrorHandler('Has no enum values');
        }

        return list;
    }

    /**
     * Generate and validate values list for combining types like a allOf, anyOf, oneOf
     * @param {Object[]} args Values for combining types
     * @returns {Array} List with values
     */
    _prepareCombining(...args) {
        let source = [...args];
        let list = [];

        if (source.length > 0) {
            for (let i = 0; i < source.length; i++) {
                const val = source[i];

                if (Array.isArray(val)) {
                    source = source.concat(val);
                    delete source[i];
                    continue;
                }

                if (!val || val.constructor !== Object || Object.keys(val).length === 0) {
                    throw new ErrorHandler(`Has incorrect combining value: ${JSON.stringify(val)} (${typeof val})`);
                }

                list.push(val);
            }
            list = list.filter(value => !(typeof value === 'undefined'));
        }

        if (list.length === 0) {
            throw new ErrorHandler('Has no combining values');
        }

        return list;
    }

    /**
     * Generate and validate values list for combining type 'not'
     * @param {*[]} args Values for combining type
     * @returns {Array} Value for combining type 'not'
     */
    _prepareCombiningNot(...args) {
        if (args.length > 1) {
            throw new ErrorHandler(`Too many arguments for 'not' combining type`);
        }

        const val = args[0];
        if (!val || val.constructor !== Object || Object.keys(val).length === 0) {
            throw new ErrorHandler(`Has incorrect combining value: ${JSON.stringify(val)} (${typeof val})`);
        }

        return val;
    }

    /**
     * Probably number is float
     * @param {Number|String} value Number for check
     * @returns {boolean} TRUE if number is probably float, or FALSE
     */
    _isFloat(value) {
        const num = parseFloat(String(value));
        return !Number.isInteger(num);
    }

    /**
     * Parsing integer numbers
     * @param {Number|String} value Number for parsing
     * @returns {Number} Parsed integer number
     */
    _parseInteger(value) {
        if (!['string', 'number'].includes(typeof value)) {
            throw new ErrorHandler(`Argument has incorrect type '${typeof value}': ${JSON.stringify(value)}`);
        }

        const numStr = String(value);
        if (numStr.length > 1 && numStr[0] === '0') {
            throw new ErrorHandler(`Number is not a decimal: ${value}`);
        }

        const numParsed = parseFloat(value);
        if (!Number.isInteger(numParsed)) {
            throw new ErrorHandler(`Incorrect integer number: ${value}`);
        }

        return parseInt(value, 10);
    }

    /**
     * Parsing float numbers
     * @param {Number|String} value Number for parsing
     * @returns {Number} Parsed float number
     */
    _parseFloat(value) {
        if (['object', 'symbol'].includes(typeof value)) {
            throw new ErrorHandler(`Argument has type 'object': ${JSON.stringify(value)}`);
        }

        const num = parseFloat(value);
        if (Number.isNaN(num)) {
            throw new ErrorHandler(`Incorrect number: ${value}`);
        }

        return num;
    }

    /**
     * Check integer for positive value
     * @param {Number|String} value Number for check and parsing
     * @return {Number} Parsed positive integer
     */
    _getPositiveInteger(value) {
        const num = this._parseInteger(value);

        if (num < 0) {
            throw new ErrorHandler(`Value must be positive: ${value}`);
        }

        return num;
    }

    /**
     * Add exclusive minimum value into JSON-schema
     * @returns {Object|MainTemplates} Current object
     */
    _eMin() {
        this.rule.exclusiveMinimum = true;
        return this;
    }

    /**
     * Add exclusive maximum value into JSON-schema
     * @returns {Object|MainTemplates} Current object
     */
    _eMax() {
        this.rule.exclusiveMaximum = true;
        return this;
    }

    /**
     * Add multiplicator value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {Object|MainTemplates} Current object
     */
    _multipleOf(value) {
        this.rule.multipleOf = this._getPositiveInteger(value);
        return this;
    }

    /**
     * Add enum value into JSON-schema
     * @param {*[]} args ENUM values
     * @returns {Object|MainTemplates} Current object
     */
    _enum(...args) {
        this.rule.enum = this._prepareEnum(...args);
        return this;
    }

    /**
     * Add list for 'anyOf' parameter
     * @param {Object[]} args List of 'anyOf' parameters
     * @returns {Object|MainTemplates} Current object
     */
    _anyOf(...args) {
        this.rule.anyOf = this._prepareCombining(...args);
        return this;
    }

    /**
     * Add list for 'allOf' parameter
     * @param {Object[]} args List of 'allOf' parameters
     * @returns {Object|MainTemplates} Current object
     */
    _allOf(...args) {
        this.rule.allOf = this._prepareCombining(...args);
        return this;
    }

    /**
     * Add list for 'oneOf' parameter
     * @param {Object[]} args List of 'oneOf' parameters
     * @returns {Object|MainTemplates} Current object
     */
    _oneOf(...args) {
        this.rule.oneOf = this._prepareCombining(...args);
        return this;
    }

    /**
     * Add list for 'not' parameter
     * @param {Object} args List of 'not' parameters
     * @returns {Object|MainTemplates} Current object
     */
    _not(...args) {
        this.rule.not = this._prepareCombiningNot(...args);
        return this;
    }

    /**
     * Get generated template for JSON-schema
     * @returns {Object|MainTemplates} Object with template
     */
    _done() {
        return this.rule;
    }
}

/** @type {MainTemplates} */
module.exports = MainTemplates;
