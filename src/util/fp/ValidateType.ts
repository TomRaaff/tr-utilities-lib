// class, because we can check the type with instanceof
class CorrectType {
    constructor() {
    }
}

// TODO: simplify WrongType
// class, because we can check the type with instanceof
class WrongType {
    constructor(public found: string) {
    }
}

type ValidatorFn = (field: unknown) => CorrectType | Array<WrongType>;

/**
 * Use this function to check whether the incoming object is of the type you expect.
 * Usage example:
 * ```
 * const result =
 *    decoder<Person>(incomingObject, [
 *        ['name', isString],
 *        ['age', isNumber],
 *        ['isAwesome', isBoolean],
 *        ['address', isObject<Address>([
 *            ['houseNo', isNumber],
 *            ['street', isString],
 *            ['city', isString]
 *        ])],
 *    ]);
 * ```
 * @param obj
 * @param validators
 */
export function validateType<T>(obj: T, validators: Array<[keyof T, ValidatorFn]>): T | Array<WrongType> {
    const validationResults = validators.map(([field, fn]) => fn(obj[field]));
    const wrongTypes = getWrongTypes(validationResults);
    return (wrongTypes.length === 0) ? obj : wrongTypes;
}

function getWrongTypes(validationResults: Array<CorrectType|Array<WrongType>>): Array<WrongType> {
    return validationResults
        .filter((result) => Array.isArray(result))
        .map(result => result as WrongType)
        .reduce((acc: Array<WrongType>, cur) => acc.concat(cur), []);
}

export function isString(field: unknown): CorrectType | Array<WrongType> {
    return isType(field, 'string');
}

export function isBoolean(field: unknown): CorrectType | Array<WrongType> {
    return isType(field, 'boolean');
}

export function isNumber(field: unknown): CorrectType | Array<WrongType> {
    return isType(field, 'number');
}

export function isObject<S>(validators: Array<[keyof S, ValidatorFn]>): ValidatorFn {
    return (field: unknown) => {
        if (field == undefined) return createWrongType(field, 'Object');
        const nestedObj = field as S;
        const validationResults = validators.map(([nestedField, fn]) => fn(nestedObj[nestedField]));
        const wrongTypes = getWrongTypes(validationResults);
        return (wrongTypes.length === 0) ? new CorrectType() : wrongTypes;
    }
}

export function optional(validator: ValidatorFn): ValidatorFn {
    return (field: unknown) => (field == undefined) ? new CorrectType() : validator(field);
}

// todo: implement this
export function isArray(field: unknown): CorrectType | Array<WrongType> {
    if (Array.isArray(field)) {
        return new CorrectType()
    } else {
        return createWrongType(field, 'Array');
    }
}

// todo: somehow get the fieldname instead of it's value
function isType(field: any, typeToCheck: string): CorrectType | Array<WrongType> {
    if (typeof field === typeToCheck) {
        return new CorrectType();
    } else {
        return createWrongType(field, typeToCheck);
    }
}

function createWrongType(field: any, expectedType: string): Array<WrongType> {
    return [new WrongType(`Field with value ${field} is not correct. Found ${typeof field}, but expected ${expectedType}`)];
}