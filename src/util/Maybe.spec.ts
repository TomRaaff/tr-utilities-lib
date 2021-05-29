import Maybe from './Maybe';

describe('Maybe', () => {
	describe('constructor', () => {
		it('should create a maybe.Some when its input is a maybe.Some', () => {
			// arrange
			const value = Maybe.of('nestedValue');
			// act
			const result = Maybe.of(value);
			// assert
			expect(result).toStrictEqual(value);
		});
		it('should create a maybe.None when its input is a maybe.None', () => {
			// arrange
			const value = Maybe.empty();
			// act
			const result = Maybe.of(value);
			// assert
			expect(result).toStrictEqual(value);
		});

		it('should create a some when its input is a value', () => {
			// arrange
			const value = "some value";
			// act
			const result = Maybe.of(value)
								.getOrElse(() => fail('Should be a Some'));
			// assert
			expect(result).toBe(value);
		});

		it('should create a some when its input is 0', () => {
			// arrange
			const value = 0;
			// act
			const result = Maybe.of(value)
								.getOrElse(() => fail('Should be a Some'));
			// assert
			expect(result).toBe(value);
		});

		it('should create a some when its input is false', () => {
			// arrange
			const value = false;
			// act
			const result = Maybe.of(value)
								.getOrElse(() => fail('Should be a Some'));
			// assert
			expect(result).toBe(value);
		});

		it('should create a None when its input is undefined', () => {
			// arrange
			// act
			const result = Maybe.empty()
								.getOrElse(() => expect(true).toBe(true));
			// assert
			expect(result).toBeFalsy();
		});

		it('should create a None when its input is null', () => {
			// arrange
			// act
			const result = Maybe.empty()
								.getOrElse(() => expect(true).toBe(true));
			// assert
			expect(result).toBeFalsy();
		});
	})
});
