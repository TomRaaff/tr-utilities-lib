import Some from './Some';
import None from './None';
import Either from './Either';

export default class Maybe<T> {
	private val: Some<T> | None<T>;

	private constructor(input?: T | undefined) {
		if (input == undefined) {
			this.val = new None();
		} else {
			if (input instanceof Maybe || input instanceof Some || input instanceof None) {
				const innerVal = input.getOrElse(() => '@#NoValue#@');
				this.val = (innerVal === '@#NoValue#@' || innerVal == undefined) ? new None() : new Some(innerVal);
			} else {
				this.val = new Some(input!);
			}
		}
	}

	map<S>(fn: (t: T) => S): Maybe<S> {
		return this.val.map(fn);
	}

	flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S> {
		return this.val.flatMap(fn);
	}

	getOrElse(ifEmpty: () => T): T {
		return this.val.getOrElse(ifEmpty);
	}

	static of<S>(val: S | undefined) {
		return new Maybe<S>(val);
	}

	static empty<S>() {
		return new Maybe<S>();
	}

	toEither<L>(left: L): Either<L, T> {
		const value = this.val.getOrElse(() => (undefined as unknown as T));
		return (value === undefined) ? Either.ofLeft(left) : Either.of(value);
	}
}
