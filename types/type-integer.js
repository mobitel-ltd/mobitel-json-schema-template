/** @type {JSONSchemaTemplateError} */
const ErrorHandler = require('../error-handler.js');
/** @type {MainTemplates} */
const MainTemplates = require('./main.js');

/**
 * Generation Integer template for JSON-Schema
 * @extends MainTemplates
 */
class IntegerTemplates extends MainTemplates {
    /** Class constructor */
    constructor() {
        super();
        this.rule = {
            type: 'integer',
        };
    }

    /**
     * Add minimum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {IntegerTemplates} Current object
     */
    min(value) {
        this.rule.minimum = this._parseInteger(value);

        if (this.rule.maximum && this.rule.maximum < this.rule.minimum) {
            throw new ErrorHandler(
                `Incorrect 'minimum' (${this.rule.minimum}) and 'maximum' (${this.rule.maximum})`
            );
        }

        return this;
    }

    /**
     * Add maximum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {IntegerTemplates} Current object
     */
    max(value) {
        this.rule.maximum = this._parseInteger(value);

        if (this.rule.minimum && this.rule.maximum < this.rule.minimum) {
            throw new ErrorHandler(
                `Incorrect 'minimum' (${this.rule.minimum}) and 'maximum' (${this.rule.maximum})`
            );
        }

        return this;
    }

    /**
     * Add exclusive minimum value into JSON-schema
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    eMin() {
        return this._eMin();
    }

    /**
     * Add exclusive maximum value into JSON-schema
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    eMax() {
        return this._eMax();
    }

    /**
     * Add multiplicator value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    multipleOf(value) {
        return this._multipleOf(value);
    }

    /**
     * Add enum value into JSON-schema
     * @param {*[]} args ENUM values
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    enum(...args) {
        return this._enum(...args);
    }

    /**
     * Add list for 'anyOf' parameter
     * @param {Object[]} args List of 'anyOf' parameters
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    anyOf(...args) {
        return this._anyOf(...args);
    }

    /**
     * Add list for 'allOf' parameter
     * @param {Object[]} args List of 'allOf' parameters
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    allOf(...args) {
        return this._allOf(...args);
    }

    /**
     * Add list for 'oneOf' parameter
     * @param {Object[]} args List of 'oneOf' parameters
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    oneOf(...args) {
        return this._oneOf(...args);
    }

    /**
     * Add list for 'not' parameter
     * @param {Object} args List of 'not' parameters
     * @returns {IntegerTemplates|MainTemplates} Current object
     */
    not(...args) {
        return this._not(...args);
    }

    /**
     * Get generated template for JSON-schema
     * @returns {IntegerTemplates|MainTemplates} Object with template
     */
    done() {
        return this._done();
    }
}

module.exports = IntegerTemplates;
