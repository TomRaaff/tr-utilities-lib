# Tom Raaff's utilities library

Not meant for use in Production. This is a personal library and is maintained to fit my own needs.

### Publishing notes
- modify the prepublishOnly script for the version `major | minor | patch`
- Publish `npm publish` (will automatically run `prepare` and `prepublishOnly` first)


### Installation
Run `npm install tr-utilities-lib`

## Contents:
- Collection
- Maybe
- Either
- MergeObjects
- VerifyType
- Component

### Collection
Basically an Array on steroids.
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Collection.ts)


### Maybe
** warning: probably buggy **
Also known as Option or Optional. It might contain a value. If not, it forces the user to handle the empty-scenario gracefully.
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Maybe.ts)


### Either
** warning: probably buggy **
Meant to contain a happy-flow-response (called Right) or an unhappy-flow-response (called Left).
[See implementation](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/Either.ts)

### MergeObjects
Meant to merge objects where all fields of the second object will overwrite
fields of the first object. Includes nesting and arrays. Does not support multi-dimensional arrays yet.

### ValidateType
Meant for runtime validation of incoming objects over http. Whenever you do
an HTTP-request, you cannot know for certain what comes in, so you'd better
validate in runtime. 