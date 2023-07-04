/*
    Implementation based on https://dev.to/tttaaannnggg/writing-a-json-parser-in-js-pt-1-primitives-h72
*/

const OPENINGS = {
    '"': '"',
    '[': ']',
    '{': '}',
}

const STACK = [];

export function parseJson(jsonString) {
    if (jsonString[0] === '"') return jsonString.slice(1, jsonString.length - 1);
    if (jsonString[0] === 't') return true;
    if (jsonString[0] === 'f') return false;
    if (jsonString[0] === 'n') return null;
    if (jsonString[0] === 'u') return undefined;
    if ((jsonString.charCodeAt(0) >= 48 && jsonString.charCodeAt(0) <= 57) || jsonString.charCodeAt(0) === 45) return Number(jsonString);
    if (jsonString[0] === '[') return parseArray(jsonString);
    if (jsonString[0] === '{') return parseObject(jsonString);
}

export function parseArray(jsonString) {
    const output = [];

    if (jsonString.length < 3) return output;

    const valueString = jsonString.slice(1, jsonString.length - 1);
    let start = 0;
    for (let i = 0; i <= valueString.length; i++) {

        // manage escape cases
        if (STACK[STACK.length - 1] === '\\') {
            STACK.pop();
            continue;
        } else if (valueString[i] === '\\') {
            STACK.push('\\');
        }

        // manage stack
        if (STACK[STACK.length - 1] === valueString[i]) {
            STACK.pop();
        } else if (OPENINGS[valueString[i]]) {
            STACK.push(OPENINGS[valueString[i]]);
        }

        if (STACK.length === 0 && (valueString[i] === ',' || i === valueString.length)) {
            const currentValue = parseJson(valueString.slice(start, i));
            output.push(currentValue);
            start = i + 1;
        }
    }

    return output
}

function parseObject(jsonString) {
    const output = {};

    if (jsonString.length < 3) return output;

    const valueString = jsonString.slice(1, jsonString.length - 1);
    let start = 0;
    let key;
    let value;

    for (let i = 0; i <= valueString.length; i++) {

        // manage escape cases
        if (STACK[STACK.length - 1] === '\\') {
            STACK.pop();
            continue;
        } else if (valueString[i] === '\\') {
            STACK.push('\\');
        }

        // manage stack
        if (STACK[STACK.length - 1] === valueString[i]) {
            STACK.pop();
        } else if (OPENINGS[valueString[i]]) {
            STACK.push(OPENINGS[valueString[i]]);
        }

        if (STACK.length === 0) {
            if (valueString[i] === ':') {
                key = parseJson(valueString.slice(start, i));
                start = i + 1;
            }

            if (valueString[i] === ',' || i === valueString.length) {
                value = parseJson(valueString.slice(start, i));
                start = i + 1;
                output[key] = value;
            }
        }
    }

    return output
}