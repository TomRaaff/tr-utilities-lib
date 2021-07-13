import Either from './Either';

export default class Right<R> {
	private constructor(private readonly value: R) {
	}

	map<S>(fn: (r: R) => S): Right<S> {
		return Right.of(fn(this.value));
	}

	flatMap<L, S>(fn: (r: R) => Either<L, S>): Either<L, S> {
		return fn(this.value);
	}

	getRight(ifRight: (r: R) => R | void): R | void {
		return ifRight(this.value);
	}

	static of<S>(value: S): Right<S> {
		return new Right(value);
	}
}
