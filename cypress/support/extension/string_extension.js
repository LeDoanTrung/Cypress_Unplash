// string_extension.js

/**
 * Adds a format method to the String prototype.
 * This method allows for string interpolation using numbered placeholders.
 * 
 * Example:
 * 'Hello, {0}!'.format('world'); // returns 'Hello, world!'
 * 
 * @param {...*} args - The values to replace the placeholders with.
 * @returns {string} - The formatted string.
 */
String.prototype.format = function(...args) {
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match;
    });
};


/**
 * Formats a string template using numbered placeholders.
 * 
 * Example:
 * StringFormat('Hello, {0}!', 'world'); // returns 'Hello, world!'
 * 
 * @param {string} template - The string template containing numbered placeholders.
 * @param {...*} args - The values to replace the placeholders with.
 * @returns {string} - The formatted string.
 */
export function StringFormat(template, ...args) {
    return template.replace(/{(\d+)}/g, (match, number) => {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
}
