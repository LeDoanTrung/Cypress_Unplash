import Ajv from 'ajv';

const ajv = new Ajv({ strict: false });

export function validateSchema(data, schema) {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        console.error(validate.errors);
    }
    return valid;
}