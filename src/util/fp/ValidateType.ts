// class, because we can check the type with instanceof
class CorrectType {
    constructor() {
    }
}

class WrongType {
    constructor(public mismatch: string) {
    }
}

type ValidatorFn<T> = (obj: T, field: keyof T) => CorrectType | Array<WrongType>;

export type Validator<T> = { [key in keyof T]: ValidatorFn<any> };

/**
 * Use this function to check whether the incoming object is of the type you expect.
 * Usage example:
 * ```
 * const result =
 *      validateType<Person>(incomingObj, {
 *          name: isString,
 *          age: isNumber,
 *          isAwesome: isBoolean,
 *          address: isObject<Address>({
 *              houseNo: isNumber,
 *              street: isString,
 *              city: isString,
 *          }),
 *      });
 * ```
 */
export default function validateType<T>(obj: T, validator: Validator<T>): T | Array<WrongType> {
    const validationResults = Object.entries(validator)
        .map(([key, value]) => ({
            field: key as unknown as keyof T,
            validatorFn: value as unknown as ValidatorFn<any>
        }))
        .map(({field, validatorFn}) => validatorFn(obj, field));
    const wrongTypes = getWrongTypes(validationResults);
    return wrongTypes.length === 0 ? obj : wrongTypes
}

function getWrongTypes(validationResults: Array<CorrectType|Array<WrongType>>): Array<WrongType> {
    return validationResults
        .filter((result) => Array.isArray(result))
        .map(result => result as WrongType)
        .reduce((acc: Array<WrongType>, cur) => acc.concat(cur), []);
}

export function isString<T>(obj: T, field: keyof T): CorrectType | Array<WrongType> {
    return isType(obj, field, 'string');
}

export function isBoolean<T>(obj: T, field: keyof T): CorrectType | Array<WrongType> {
    return isType(obj, field, 'boolean');
}

export function isNumber<T>(obj: T, field: keyof T): CorrectType | Array<WrongType> {
    return isType(obj, field, 'number');
}

export function isDate<T>(obj: T, field: keyof T): CorrectType | Array<WrongType> {
    if (obj && obj[field] && obj[field] instanceof Date)  {
        return new CorrectType();
    } else{
        return createWrongType(obj, field, 'Date');
    }
}

export function isOfValue<T>(options: Array<T>): ValidatorFn<any> {
    return (obj: any, field: keyof any) => {
        if (!obj && !Boolean(obj[field])) {
            return createWrongType(obj, field, `options: ${options}`);
        }
        const matchesOption = options.filter(option => option === obj[field]).length > 0;
        return matchesOption
            ? new CorrectType()
            : createWrongType(obj, field, `options: ${options}`);
    }
}

export function optional<T>(validator: ValidatorFn<T>): ValidatorFn<T> {
    return (obj: T, field: keyof T) => (obj[field] == undefined) ? new CorrectType() : validator(obj, field);
}

export function isObject<T>(validator: Validator<T>): ValidatorFn<T> {
    return (obj: any, field: keyof any) => {
        if (obj == undefined || obj[field] == undefined) return createWrongType(obj, field, 'Object');
        const nestedObj = obj[field];
        const validationResults = Object.entries(validator)
            .map(([key, value]) => ({
                field: key as unknown as keyof T,
                validatorFn: value as unknown as ValidatorFn<any>
            }))
            .map(({field, validatorFn}) => validatorFn(nestedObj, field));
        const wrongTypes = getWrongTypes(validationResults);
        return wrongTypes.length === 0 ? new CorrectType : wrongTypes
    }
}

export function isArray<T>(validator: Validator<T>): ValidatorFn<T> {
    return (obj: any, field: keyof any) => {
        if (!obj && !Array.isArray(obj[field])) {
            return createWrongType(obj, field, 'Array');
        }
        const firstArrayItem = (obj[field] as unknown as Array<any>)[0];
        return validateType(firstArrayItem, validator);
    }
}

function isType<T>(obj: T, field: keyof T, typeToCheck: string): CorrectType | Array<WrongType> {
    if (obj && obj[field] && typeof obj[field] === typeToCheck) {
        return new CorrectType();
    } else {
        return createWrongType(obj, field, typeToCheck);
    }
}

function createWrongType<T>(obj: T, field: keyof T, expectedType: string): Array<WrongType> {
    const property = (obj && obj[field]) ? obj[field] : undefined;
    return [new WrongType(`Field ${field} is not correct. Found ${typeof property}, but expected ${expectedType}`)];
}