import Ajv from 'ajv';

const ajv = new Ajv({ strict: false });

/**
 * Validates the given data against the provided JSON schema.
 * 
 * @param {Object} data - The data to be validated.
 * @param {Object} schema - The JSON schema to validate against.
 * @returns {boolean} - Returns true if the data is valid according to the schema, false otherwise.
 */
export function validateSchema(data, schema) {
    // Compile the schema using AJV
    const validate = ajv.compile(schema);

    // Validate the data against the compiled schema
    const valid = validate(data);
    
     // If the data is not valid, log the validation errors to the console
    if (!valid) {
        console.error(validate.errors);
    }
    return valid;
}