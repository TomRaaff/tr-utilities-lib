import {isBoolean, isNumber, isObject, isString, optional, validateType} from "./ValidateType";

type Person = {
    name: string;
    age: number;
    isAwesome: boolean;
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
            isAwesome: true
        }

        const result = validateType<Partial<Person>>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
        });

        expect(result).toEqual(obj);
    });

    it('should FAIL for primitives', () => {
        const expected = [
            {found: 'Field name is not correct. Found number, but expected string'},
            {found: 'Field age is not correct. Found boolean, but expected number'},
            {found: 'Field isAwesome is not correct. Found string, but expected boolean'},
        ];

        const obj = {
            name: 303,
            age: true,
            isAwesome: 'totally'
        } as unknown as Partial<Person>

        const result = validateType<Partial<Person>>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
        });

        expect(result).toEqual(expected)
    });


    it('should succeed with a nested object', () => {
        const obj: Person = {
            name: 'Tom',
            age: 31,
            isAwesome: true,
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
            {found: 'Field houseNo is not correct. Found string, but expected number'},
            {found: 'Field street is not correct. Found number, but expected string'},
            {found: 'Field city is not correct. Found boolean, but expected string'},
        ];

        const obj = {
            name: 'Tom',
            age: 31,
            isAwesome: true,
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
            {found: "Field isAwesome is not correct. Found undefined, but expected boolean"}
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
            {found: "Field isAwesome is not correct. Found undefined, but expected boolean"},
            {found: "Field address is not correct. Found undefined, but expected Object"}
        ];

        const obj = {
            name: 'Tom',
            age: 31,
        } as unknown as Person;

        const result = validateType<Person>(obj, {
            name: isString,
            age: isNumber,
            isAwesome: isBoolean,
            address: isObject<Address>({
                houseNo: isNumber,
                street: isString,
                city: isString,
            }),
        });

        expect(result).toEqual(expected);
    });

});