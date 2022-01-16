import {decoder, isBoolean, isNumber, isObject, isString} from "./Decoder";

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

describe('Decoder', () => {
    it('should succeed for primitives', () => {
        const obj = {
            name: 'Tom',
            age: 31,
            isAwesome: true
        }

        const result = decoder<Partial<Person>>(obj, [
            ['name', isString],
            ['age', isNumber],
            ['isAwesome', isBoolean],
        ]);

        expect(result).toEqual(obj);
    });

    it('should FAIL for primitives', () => {
        const expected = [
            { found: 'Field with value 303 is not correct. Found number, but expected string'},
            { found: 'Field with value true is not correct. Found boolean, but expected number'},
            { found: 'Field with value totally is not correct. Found string, but expected boolean'},
        ];

        const obj = {
            name: 303,
            age: true,
            isAwesome: 'totally'
        } as unknown as Partial<Person>

        const result = decoder<Partial<Person>>(obj, [
            ['name', isString],
            ['age', isNumber],
            ['isAwesome', isBoolean],
        ]);

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

        const result = decoder<Person>(obj, [
            ['name', isString],
            ['age', isNumber],
            ['isAwesome', isBoolean],
            ['address', isObject<Address>([
                ['houseNo', isNumber],
                ['street', isString],
                ['city', isString]
            ])],
        ]);

        expect(result).toEqual(obj);
    });

    it('should FAIL with a nested object', () => {
        const expected = [
            { found: 'Field with value 14 is not correct. Found string, but expected number'},
            { found: 'Field with value 3621 is not correct. Found number, but expected string'},
            { found: 'Field with value true is not correct. Found boolean, but expected string'},
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

        const result = decoder<Person>(obj, [
            ['name', isString],
            ['age', isNumber],
            ['isAwesome', isBoolean],
            ['address', isObject<Address>([
                ['houseNo', isNumber],
                ['street', isString],
                ['city', isString]
            ])],
        ]);

        expect(result).toEqual(expected);
    });
});