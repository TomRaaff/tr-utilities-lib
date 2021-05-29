export default class Left<L> {
	private constructor(private readonly value: L) {
	}

	map<R, S>(fn: (r: R) => S): Left<L> {
		return this;
	}

	getLeft(ifLeft: (l: L) => L | void): L | void {
		return ifLeft(this.value);
	}

	static of<S>(value: S): Left<S> {
		return new Left(value);
	}
}
