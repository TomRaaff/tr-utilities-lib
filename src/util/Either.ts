import Right from './Right';
import Left from './Left';

export default class Either<L, R> {
	private constructor(private readonly left?: Left<L>,
						private readonly right?: Right<R>) {
		if (!(left) && !(right)) {
			throw new Error('invalid creation of Either. L & R are both undefined');
		}
	}

	map<S>(fn: (a: R) => S): Either<L, S> {
		return new Either(this.left?.map(fn), this.right?.map(fn));
	}

	flatMap<S>(fn: (a: R) => Either<L, S>): Either<L, S> {
		if (this.left) {
			return new Either(this.left, undefined);
		}
		return this.right!.flatMap(fn);
	}

	leftOrRight(ifLeft: (l:L) => L | void, ifRight: (r: R) => R | void): L | R | void {
		return (this.left) ? this.left?.getLeft(ifLeft) : this.right?.getRight(ifRight);
	}

	static of<S, T>(val: T): Either<S, T> {
		return new Either(undefined, Right.of<T>(val));
	}

	static ofLeft<S, T>(val: S): Either<S, T> {
		return new Either(Left.of<S>(val), undefined);
	}
}
