---
title: Validate your HTTP-responses in Typescript
description:
  You can never be certain about what you receive from an HTTP-request. You can
  make assumptions, but it's better to verify.
author: Tom Raaff
categories:
  - Typescript
  - Front End
  - REST
tags:
  - Typescript
  - HTTP
  - REST
  - runtime validation
date: 2022-01-22 08:00:00
image: armor.jpg
social:title: Validate your HTTP-responses in Typescript
social:description:
  You can never be certain about what you receive from an HTTP-request. You can
  make assumptions, but it's better to verify.
social:image: armor.jpg
---

Typescript is immensely helpful when it comes to preventing bugs and making sure
that your data structures are correct. However, Typescript doesn't exist in
runtime and this leaves us with a couple of holes where bugs can slip through.
In fact Typescript cannot know what the responses to our HTTP-requests look like
in compile-time. It gives us a false sense of security.

If your incomming data structure is wrong, where would it cause a bug? Probably
at the first place the incorrect value is being used. But where would that be?
It could be any place in your code base. It could be easy to solve, or pretty
hard. Who knows...?

### TL;DR

You should verify the objects you receive through HTTP-requests

Benefits:

- Catch bugs early
- Solve bugs quickly and easily
- Implementing validation forces you to handle the validation errors
- More robust codebase

Downsides:

- You have to keep your types and validators in sync
- Can be tricky to write

## HTTP-response Mismatches

Whenever we do an HTTP-request and expect an answer in the form of JSON, we can
not know if the data structure we receive is equal to the data structure we
expect. Even if we ourselves are maintaining the backend API, it is still
possible (and common) to create mismatches between what we expect and what we
receive.

## Assumption is the mother of all F\*-ups

The common way to handle this, is to just _assume_ the type you'll receive is
what you expect. Angular does this by just adding a _type variable_ to the
HttpClient functions:

```typescript
const response$ = this.httpClient.get<Person>("api/person/1");
```

This will make sure that the compiler will handle this data as a `Person`
object, but the _actual_ data structure could be quite different. This is just a
compiler-hint. It is better than nothing, but also a little deceiving. As a
junior developer, I actually thought this gave me type-safety...

None of the projects I've worked on since then had any solutions to this
problem. But that will not be the case for my future projects.

## Trust but verify

So, what can we do to actually close this hole and prevent time-consuming bugs
from slipping in?

We should check in runtime whether our assumptions about the incoming data
structures are correct. This means we will have to make a validator for every
DTO we create. This might sound cumbersome, but we can be smart about it. We are
programmers after all...

Verification will not help us during compile-time, but it will definitely give
us some benefits when the app is running.

## Benefits

If you verify your incoming data structures, you would know exactly where it
would break. Namely: wherever your data is coming in. Also, you could give
yourself a nice message containing the field where something unexpected came in.
You wouldn't need to spend time searching for the problem. Fixing the problem
will be a breeze.

Some positive side effects will be that you'll also force yourself to think
about how to handle the errors. I know I sometimes skip corners or forget to
implement the error situations, so I personally like the reminder.

Besides, if you're also the maintainer of your backend, you'll quickly realise
whether your problem lies in your backend or in your frontend.

Typescript gives us a false sense of security by assuming the type of the
incoming data structure. But by verifying, we can know _for certain_ that we
will properly handle whatever comes in. You will have a more trustworthy
codebase this way.

## How do we do this?

Luckily, if your focus is on REST api calls, you only have to validate for the
types: string, boolean, number, object and array since JSON doesn't allow for
any other types. Additionally, you'll likely want your validator to be able to
handle optional fields, be able to check for date formatting in strings and
maybe check for enums as well.

## My solution

I thought building a validator was an interesting challenge, so I built one. I
started by figuring out the API and I came up with this:

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
`<Person>`'s fields.

This will give us compiler-errors if we make a typo or forget a field of
`Person`. Unfortunately, it doesn't automatically check if you're using the
right validator function.

Some main gist of my solution is this:

1. transform validator-object into key-value pairs (The values are validator
   functions)
2. execute all validator functions (They perform checks like
   `typeof obj[field] === 'string'`)
3. See if there are validation errors
4. If there are: get them into a simple array
5. return either the valid object or the validation errors

`isObject` behaves more or less the same as the main function. `isArray` picks
the first element in the array and checks it with `isObject`.

With some FP-magic (partial application) and extensive use of generics, I
managed to get it to work.

[See my GitHub repo](https://github.com/TomRaaff/tr-utilities-lib/blob/main/freeze/validate-type/ValidateType.ts)
for the end result of the code. Feel free to use it. I would advise you to
simply copy-paste the code into your code-base. It's not a lot of code, so
you'll be fine maintaining it yourself.

<sub>If you do, you'll also want to
[check out the unittests](https://github.com/TomRaaff/tr-utilities-lib/blob/main/freeze/validate-type/ValidateType.spec.ts)
</sub>

## Type maintenance

One of the downsides of validating your types, is that you have to keep your
types and your validators in sync. If you don't have a robust way of doing that,
you'll just open up a different set of bugs.

Therefore, I would also advise you to store your validator object in the same
files as your type-definitions. This will be a hint to also edit your validator
if you edit your type. (If you use my solution, the compiler will give errors
when you don't update your validator. I didn't check if the same is true for
other libraries).

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

I personally think you shouldn't pull in a library for something like this. But
if you really want to: these are some options (with some slightly different
flavours) you might want to consider:

- [ajv](https://github.com/ajv-validator/ajv)
- [joi](https://github.com/sideway/joi)
- [v8n](https://github.com/imbrn/v8n)

See which one you like best. Or, even better: build your own!

I hope this article was instructive. Happy coding!
