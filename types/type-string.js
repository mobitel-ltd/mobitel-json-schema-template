/** @type {JSONSchemaTemplateError} */
const ErrorHandler = require('../error-handler.js');
/** @type {MainTemplates} */
const MainTemplates = require('./main.js');

/**
 * Generation String template for JSON-Schema
 * @extends MainTemplates
 */
class StringTemplates extends MainTemplates {
    /** Class constructor */
    constructor() {
        super();
        this.rule = {
            type: 'string',
        };
    }

    /**
     * Add minimum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {StringTemplates} Current object
     */
    min(value) {
        this.rule.minLength = this._getPositiveInteger(value);

        if (this.rule.maxLength && this.rule.maxLength < this.rule.minLength) {
            throw new ErrorHandler(
                `Incorrect 'minLength' (${this.rule.minLength}) and 'maxLength' (${this.rule.maxLength})`
            );
        }

        return this;
    }

    /**
     * Add maximum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {StringTemplates} Current object
     */
    max(value) {
        this.rule.maxLength = this._getPositiveInteger(value);

        if (this.rule.minLength && this.rule.maxLength < this.rule.minLength) {
            throw new ErrorHandler(
                `Incorrect 'minLength' (${this.rule.minLength}) and 'maxLength' (${this.rule.maxLength})`
            );
        }

        return this;
    }

    /**
     * Add pattern value into JSON-schema
     * @param {String} value Parameter value
     * @returns {StringTemplates} Current object
     */
    pattern(value) {
        if (value && ((value instanceof RegExp) || typeof value === 'string')) {
            this.rule.pattern = String(value);
            return this;
        }

        throw new ErrorHandler('Pattern must be RegExp or not empty String');
    }

    /**
     * Add enum value into JSON-schema
     * @param {*[]} args ENUM values
     * @returns {StringTemplates|MainTemplates} Current object
     */
    enum(...args) {
        return this._enum(...args);
    }

    /**
     * Add list for 'anyOf' parameter
     * @param {Object[]} args List of 'anyOf' parameters
     * @returns {StringTemplates|MainTemplates} Current object
     */
    anyOf(...args) {
        return this._anyOf(...args);
    }

    /**
     * Add list for 'allOf' parameter
     * @param {Object[]} args List of 'allOf' parameters
     * @returns {StringTemplates|MainTemplates} Current object
     */
    allOf(...args) {
        return this._allOf(...args);
    }

    /**
     * Add list for 'oneOf' parameter
     * @param {Object[]} args List of 'oneOf' parameters
     * @returns {StringTemplates|MainTemplates} Current object
     */
    oneOf(...args) {
        return this._oneOf(...args);
    }

    /**
     * Add list for 'not' parameter
     * @param {Object} args List of 'not' parameters
     * @returns {StringTemplates|MainTemplates} Current object
     */
    not(...args) {
        return this._not(...args);
    }

    /**
     * Get generated template for JSON-schema
     * @returns {StringTemplates|MainTemplates} Object with template
     */
    done() {
        return this._done();
    }
}

module.exports = StringTemplates;
