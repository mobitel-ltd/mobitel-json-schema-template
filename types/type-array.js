/** @type {JSONSchemaTemplateError} */
const ErrorHandler = require('../error-handler.js');
/** @type {MainTemplates} */
const MainTemplates = require('./main.js');

/**
 * Generation Array template for JSON-Schema
 * @extends MainTemplates
 */
class ArrayTemplates extends MainTemplates {
    /** Class constructor */
    constructor() {
        super();
        this.rule = {
            type: 'array',
        };
    }

    /**
     * Add minimum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {ArrayTemplates} Current object
     */
    min(value) {
        this.rule.minItems = this._getPositiveInteger(value);

        if (this.rule.maxItems && this.rule.maxItems < this.rule.minItems) {
            throw new ErrorHandler(
                `Incorrect 'minItems' (${this.rule.minItems}) and 'maxItems' (${this.rule.maxItems})`
            );
        }

        return this;
    }

    /**
     * Add maximum value into JSON-schema
     * @param {Number} value Parameter value
     * @returns {ArrayTemplates} Current object
     */
    max(value) {
        this.rule.maxItems = this._getPositiveInteger(value);

        if (this.rule.minItems && this.rule.maxItems < this.rule.minItems) {
            throw new ErrorHandler(
                `Incorrect 'minItems' (${this.rule.minItems}) and 'maxItems' (${this.rule.maxItems})`
            );
        }

        return this;
    }

    /**
     * Add items list into JSON-schema
     * @param {Object[]} args Items list
     * @returns {ArrayTemplates} Current object
     */
    items(...args) {
        this.rule.items = this._prepareCombining(...args);
        return this;
    }

    /**
     * Disable or enable additional properties in JSON-schema
     * @param {Boolean} value Boolean value
     * @returns {ArrayTemplates} Current object
     */
    additional(value) {
        this.rule.additionalItems = Boolean(value);
        return this;
    }

    /**
     * Enable only unique items on JSON-schema
     * @returns {ArrayTemplates} Current object
     */
    unique() {
        this.rule.uniqueItems = true;
        return this;
    }

    /**
     * Get generated template for JSON-schema
     * @returns {ArrayTemplates|MainTemplates} Object with template
     */
    done() {
        return this._done();
    }
}

module.exports = ArrayTemplates;
