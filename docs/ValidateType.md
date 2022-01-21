# Validate your HTTP-responses in Typescript


Typescript is immensely helpful when it comes to preventing bugs and making sure
that your datastructures are correct. However, Typescript doesn't exist in
runtime and this leaves us with a couple of holes where bugs can slip through.
In this article, I'll cover the fact that we cannot know what the responses to
our HTTP-requests look like in compile-time.

If your data structure is wrong, where would it cause a bug? Probably in the
first place the incorrect value is being used. But where would that be? It could
be any place in your code base. It could be easy to solve, or pretty hard. Who
knows...?

### TL;DR:

verify the objects you receive through HTTP-requests

Benefits:

- Catch bugs early
- Solve bugs quickly and easily
- Implementing validation forces you to handle the validation errors
- More robust codebase

Downsides:

- Slightly more type maintenance
- Can be tricky to write

## Http-response Mismatches

Whenever we do a HTTP-request and expect an answer in the form of JSON, we can
not know if the data structure we receive is equal to the data structure we
expect. Even if we ourselves are maintaining the backend API, it is still
possible (and common) to create mismatches between what we expect and what we
receive.

## Assumption is the mother of all F\*-ups

The common way to handle this, is to just _assume_ the type you'll receive is
what you expect. Angular does this by just adding a _type variable_ to the
HttpClient function:

```
const response$ = this.HTTPClient.get<Person>('api/person/1');
```

This is helpful for writing your codebase, but it doesn't do anything in
runtime. This is just a compiler-hint. It is better than nothing, but also a
little deceiving. As a junior developer, I actually thought this gave me
type-safety...

None of the projects I've worked on since had any solutions to this problem.

## Trust but verify

So, what can we do to actually close this hole and prevent time-consuming bugs
from slipping in?

We could dynamically check whether our assumptions about the incoming data
structures are correct. This means we would have to make a validator for every
DTO we create. It will not help us during compile-time at all, but will
definitely give us some benefits when the app is running.

## Benefits

If you would use validate/verify your incoming data structures, you would know
exactly where it would break. Also, you could give yourself a nice message
containing the field where something unexpected came in. You wouldn't need to
spend time searching for the problem. Fixing the problem will be a breeze.

Some positive side effects will be that you'll force yourself to think about how
to handle the errors. I know I sometimes skip corners or forget to implement the
error situations, I personally like the reminder.

Besides, if you're also the maintainer of your backend, you'll quickly realise
if the data structure problem lies in your backend or in your frontend.

All in all, you'd have a more trustworthy codebase.

## How?

Luckily, if your focus is on REST api calls, you only have to validate for the
types: string, boolean, number, object and array since JSON doesn't allow for
any other types. Additionally, you'll likely want your validator to be able to
handle optional fields, be able to check for date formatting in strings and
check for enums as well.

## My solution

I thought building a validator was an interesting case to try out. I started by
figuring out the API and I came up with this:

```typescript
const result = validateType<Person>(incomingObj, {
  name: isString,
  age: isNumber,
  hasDriversLicense: isBoolean,
  address: isObject<Address>({
    houseNo: isNumber,
    street: isString,
    city: isString,
  }),
  hobbies: isArray<Hobby>({
    name: isString,
    isSport: optional(isBoolean),
  }),
});
```

By using the `<Person>` type-variable, we say that our `incomingObj` is expected
to be of type `Person`. Our second argument is a Validator that matches
`<Person>`'s fields:
`type Validator<T> = { [key in keyof T]: ValidatorFn<any> };`

This gives us compiler errors if we make a typo or forget a field of `Person`.
Unfortunately, it doesn't automatically check if you're using the right
validator function. All validator functions share the same function signature.
And `validateType()` returns the `incomingObject` or a list of errors.

After that, I started building. The primitives were easy to implement.
`isObject` and `isArray` were more difficult, but using some FP-magic (partial
application) I managed to build them.

See
[my GitHub repo](https://github.com/TomRaaff/tr-utilities-lib/blob/main/freeze/validate-type/ValidateType.ts)
for the end result of the code. Feel free to use it. I would advise you to
simply copy-paste the code into your code-base. It's not a lot of code, so
you're better off maintaining it yourself.

## Type maintenance

If you use this, I would also advise you to store your validator object in the
same files as your type-definitions. This will be a hint to also edit your
validator if you edit your type (even though the compiler WILL give errors when
you don't update your validator).

Example: `Person.model.ts`

```typescript
export type Person = {
  name: string;
  age: number;
  hasDriversLicense: boolean;
  address: Address;
  hobbies: Array<Hobby>;
};

export const personValidator: Validator<Person> = {
  name: isString,
  age: isNumber,
  hasDriversLicense: isBoolean,
  address: isObject<Address>(addressValidator),
  hobbies: isArray<Hobby>(hobbyValidator),
};
```

## Alternatives

Of course, there are already libraries out there that do this stuff (and more)
as well. Some options are:

- [ajv](https://github.com/ajv-validator/ajv)
- [joi](https://github.com/sideway/joi)
- [v8n](https://github.com/imbrn/v8n)

See which one you like best. Or, even better: build your own!
