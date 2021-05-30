# Tom Raaff's utilities library

Not meant for use in Production. This is a personal library and is maintained to fit my own needs.

### Installation
Run `npm install tr-utilities-lib`

## Contents:
- Collection
- Maybe
- Either

### Collection
Basically an Array on steroids.

Create:
- `static of<S>(array: Array<S>): Collection<S>;`
- `static empty<S>(): Collection<S>;`
  
Functions:
- `get(index: number): Maybe<T>;`
- `count(): number;`
- `push(...items: Array<T>): boolean;`
- `pull(...items: Array<T>): Array<T>;`
- `find(seek: Partial<T>): Array<T>;`
- `findOne(seek: Partial<T>): Maybe<T>;`
- `contains(seek: Partial<T>): boolean;`
- `update(seek: Partial<T>, update: T): Collection<T>;`
- `copy(): Collection<T>;`
- `filter(fn: (a: T, index?: number, array?: T[]) => boolean): Collection<T>;`
- `map<S>(fn: (a: T) => S): Collection<S>;`
- `reduce(fn: (prev: T, cur: T, index: number, array: T[]) => T, initial: T): T;`
- `forEach(fn: (a: T) => void): void;`
- `toArray(): T[];`


### Maybe
Also known as Option or Optional. It might contain a value. If not, it forces the user to handle the empty state gracefully.

Create:
- `static of<S>(val: S | undefined): Maybe<S>;`
- `static empty<S>(): Maybe<S>;`
  
Functions:
- `map<S>(fn: (t: T) => S): Maybe<S>;`
- `flatMap<S>(fn: (t: T) => Maybe<S>): Maybe<S>;`
- `getOrElse(ifEmpty: () => T): T;`
- `toEither<L>(left: L): Either<L, T>;`


### Either
Meant to contain a happy-flow-response (called Right) or an unhappy-flow-response (called Left).

Create:
- `static of<S, T>(val: T): Either<S, T>;`
- `static ofLeft<S, T>(val: S): Either<S, T>;`
  
Functions:
- `map<S>(fn: (a: R) => S): Either<L, S>;`
- `flatMap<S>(fn: (a: R) => Either<L, S>): Either<L, S>;`
- `leftOrRight(ifLeft: (l: L) => L | void, ifRight: (r: R) => R | void): L | R | void;`
