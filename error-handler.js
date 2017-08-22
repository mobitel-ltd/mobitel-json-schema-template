/** Handling errors for JSON-Schema template module */
class JSONSchemaTemplateError extends Error {
    /**
     * @param {*} args Error message
     */
    constructor(...args) {
        super(...args);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = JSONSchemaTemplateError;
