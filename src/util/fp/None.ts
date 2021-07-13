import Maybe from './Maybe';

export default class None<T> {
	map<S>(fn: (t: T) => S): Maybe<S> {
		return Maybe.empty();
	}

	flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S> {
		return Maybe.empty();
	}

	getOrElse(ifEmpty: () => T): T {
		return ifEmpty();
	}
}
