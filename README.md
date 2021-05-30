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
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Collection.ts)


### Maybe
Also known as Option or Optional. It might contain a value. If not, it forces the user to handle the empty-scenario gracefully.
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Maybe.ts)


### Either
Meant to contain a happy-flow-response (called Right) or an unhappy-flow-response (called Left).
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Either.ts)
