import Maybe from './Maybe';

export default class Some<T> {
	private val: T;
	constructor(value: T) {
		if (value == undefined) throw new Error('Some cannot be undefined');
		this.val = value;
	}

	map<S>(fn: (t: T) => S): Maybe<S> {
		return Maybe.of(fn(this.val));
	}

	flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S> {
		return fn(this.val);
	}

	getOrElse(ifEmpty: () => T): T {
		return this.val;
	}
}
