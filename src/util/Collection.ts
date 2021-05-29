import Maybe from './Maybe';

export default class Collection<T> {
	readonly collection: Array<T> = [];

	constructor(...items: Array<T>) {
		this.collection.push(...items);
	}

	get(index: number): Maybe<T> {
		return Maybe.of(this.collection[index]);
	}

	count(): number {
		return this.collection.length;
	}

	push(...items: Array<T>): boolean {
		return items.every((item) => this.collection.push(item));
	}

	pull(...items: Array<T>): Array<T> {
		return items.reduce((carry, item) => {
			const index: number = this.collection.indexOf(item);

			return carry.concat(this.collection.splice(index, 1));
		}, [] as Array<T>);
	}

	find(seek: Partial<T>): Array<T> {
		const keys = Object.keys(seek) as Array<keyof T>;

		return this.collection.filter((item) => keys.every((key) => item[key] === seek[key]));
	}

	findOne(seek: Partial<T>): Maybe<T> {
		const keys = Object.keys(seek) as Array<keyof T>;

		return this.filter((item) => keys.every((key) => item[key] === seek[key]))
				   .get(0);
	}

	contains(seek: Partial<T>): boolean {
		return this.findOne(seek)
				   .map(Boolean)
				   .getOrElse(() => false);
	}

	update(seek: Partial<T>, update: T): Collection<T> {
		return this.findOne(seek)
				   .map((item) => this.pull(item))
				   .map(() => this.push(update))
				   .map((_) => this)
				   .getOrElse(() => this);
	}

	copy(): Collection<T> {
		return Collection.of([...this.collection]);
	}

	filter(fn: (a: T, index?: number, array?: T[]) => boolean): Collection<T> {
		return Collection.of(this.collection.filter(fn));
	}

	map<S>(fn: (a: T) => S): Collection<S> {
		return Collection.of(this.collection.map(fn));
	}

	reduce(fn: (prev: T, cur: T, index: number, array: T[]) => T, initial: T): T {
		return this.collection.reduce(fn, initial);
	}

	forEach(fn: (a: T) => void): void {
		return this.collection.forEach(fn);
	}

	toArray(): T[] {
		return this.collection;
	}

	static of<S>(array: Array<S>): Collection<S> {
		return new Collection<S>(...array);
	}

	static empty<S>(): Collection<S> {
		const arr: S[] = [];
		return Collection.of(arr);
	}
}
