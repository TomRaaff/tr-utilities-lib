import {isArray, isBoolean, isDate, isNumber, isObject, isString, optional, validateType} from "./ValidateType";

type Person = {
    name: string;
    age: number;
    isAwesome: boolean;
    birthday: Date;
    address: Address;
}

type Address = {
    houseNo: number;
    street: string;
    city: string
}

describe('ValidateType', () => {
    it('should succeed for primitives', () => {
        const obj = {
            name: 'Tom',
            age: 31,
            isAwesome: true,
            birthday: new Date(1990, 5, 16),
        }

        const result = validateType<Partial<Person>>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            birthday: isDate
        });

        expect(result).toEqual(obj);
    });

    it('should FAIL for primitives', () => {
        const expected = [
            {mismatch: 'Field name is not correct. Found number, but expected string'},
            {mismatch: 'Field age is not correct. Found boolean, but expected number'},
            {mismatch: 'Field isAwesome is not correct. Found string, but expected boolean'},
            {mismatch: 'Field birthday is not correct. Found string, but expected Date'},
        ];

        const obj = {
            name: 303,
            age: true,
            isAwesome: 'totally',
            birthday: '1990-05-16'
        } as unknown as Partial<Person>

        const result = validateType<Partial<Person>>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            birthday: isDate
        });

        expect(result).toEqual(expected)
    });


    it('should succeed with a nested object', () => {
        const obj: Person = {
            name: 'Tom',
            age: 31,
            isAwesome: true,
            birthday: new Date(1990, 5, 16),
            address: {
                houseNo: 14,
                street: 'Titus Brandsmastraat',
                city: 'Breukelen'
            }
        }

        const result = validateType<Person>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            birthday: isDate,
            address: isObject<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        });

        expect(result).toEqual(obj);
    });

    it('should FAIL with a nested object', () => {
        const expected = [
            {mismatch: 'Field houseNo is not correct. Found string, but expected number'},
            {mismatch: 'Field street is not correct. Found number, but expected string'},
            {mismatch: 'Field city is not correct. Found boolean, but expected string'},
        ];

        const obj = {
            name: 'Tom',
            age: 31,
            isAwesome: true,
            birthday: new Date(1990, 5, 16),
            address: {
                houseNo: '14',
                street: 3621,
                city: true
            }
        } as unknown as Person;

        const result = validateType<Person>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            birthday: isDate,
            address: isObject<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        });

        expect(result).toEqual(expected);
    });

    it('should succeed for optional fields', () => {
        const obj = {
            name: undefined,
            age: null,
            isAwesome: null
        } as unknown as Partial<Person>;

        const result = validateType<Partial<Person>>(obj, {
            name: optional(isString),
            age: optional(isNumber),
            isAwesome: optional(isBoolean),
        });

        expect(result).toEqual(obj);
    });

    it('should FAIL when fields are missing', () => {
        const expected = [
            {mismatch: "Field isAwesome is not correct. Found undefined, but expected boolean"}
        ];

        const obj = {
            name: 'Tom',
            age: 31,
        } as unknown as Partial<Person>;

        const result = validateType<Partial<Person>>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
        });

        expect(result).toEqual(expected);
    });

    it('should FAIL but not break when a nested object is missing', () => {
        const expected = [
            {mismatch: "Field isAwesome is not correct. Found undefined, but expected boolean"},
            {mismatch: "Field address is not correct. Found undefined, but expected Object"}
        ];

        const obj = {
            name: 'Tom',
            age: 31,
            birthday: new Date(1990, 5, 16),
        } as unknown as Person;

        const result = validateType<Person>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            birthday: isDate,
            address: isObject<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        });

        expect(result).toEqual(expected);
    });

    it('should succeed for arrays', () => {
        const obj = {
            addresses: [
                { houseNo: 14, street: 'Silversteyn', city: 'NewYork' },
                { houseNo: 3, street: 'Bridgelane', city: 'New Jersey' },
            ]
        }

        const result = validateType<{addresses: Address[]}>(obj, {
            addresses: isArray<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        })
        expect(result).toEqual(obj);
    });

    it('should FAIL for arrays', () => {
        const expected = [
            {mismatch: "Field street is not correct. Found number, but expected string"},
        ];

        const obj = {
            addresses: [
                { houseNo: 14, street: 34, city: 'NewYork' },
                { houseNo: 3, street: 234, city: 'New Jersey' },
            ]
        } as unknown as {addresses: Address[]};

        const result = validateType<{addresses: Address[]}>(obj, {
            addresses: isArray<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        });
        expect(result).toEqual(expected);
    });
});