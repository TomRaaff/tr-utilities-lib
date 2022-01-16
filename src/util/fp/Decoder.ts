class CorrectType {
    constructor() {
    }
}

class WrongType {
    constructor(public found: string) {
    }
}

type DecoderFn = (field: unknown) => CorrectType | Array<WrongType>;

export function decoder<T>(obj: T, decoders: Array<[keyof T, DecoderFn]>): T | Array<WrongType> {
    const decoded = decoders.map(([field, fn]) => fn(obj[field]));
    const decodeProblems = findDecodeProblems(decoded);
    return (decodeProblems.length === 0) ? obj : decodeProblems;
}

function findDecodeProblems(decoded: Array<CorrectType|Array<WrongType>>): Array<WrongType> {
    return decoded
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

export function isObject<S>(decoders: Array<[keyof S, DecoderFn]>): DecoderFn {
    return (field: unknown) => {
        const nestedObj = field as S;
        const decoded = decoders.map(([nestedField, fn]) => fn(nestedObj[nestedField]));
        const decodeProblems = findDecodeProblems(decoded);
        return (decodeProblems.length === 0) ? new CorrectType() : decodeProblems;
    }
}

export function isArray(field: unknown): CorrectType | Array<WrongType> {
    if (Array.isArray(field)) {
        return new CorrectType()
    } else {
        return new WrongType(`Field ${field} is not correct. Found ${typeof field}, but expected an Array`);
    }
}

// todo somehow get the fieldname instead of it's value
function isType(field: any, typeToCheck: string): CorrectType | Array<WrongType> {
    if (typeof field === typeToCheck) {
        return new CorrectType();
    } else {
        return [new WrongType(`Field with value ${field} is not correct. Found ${typeof field}, but expected ${typeToCheck}`)];
    }
}