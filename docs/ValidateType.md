# Dynamically validate your types in Typescript
#### OR: validate your HTTP-responses in Typescript
Typescript is immensely helpful when it comes to catching bugs early and 
making sure that your datastructures are correct. However, Typescript doesn't 
exist in runtime and this leaves us with a couple of holes where bugs can
slip through. The hole I'll cover in this article is the fact that we cannot
know what the responses to out http-requests look like in compile time. 

> ### TL;DR:
> verify the objects you receive through http-requests
> Benefits:
> - catch bugs early
> - Solve bugs quickly and easily
> - implementing this forces you to handle these errors
> - more robust codebase
> 
> Downsides:
> - can be tricky to write
> - OR you need another library
> - slightly more Types maintenance


## Http-response Mismatches
Whenever we do a http-request and expect an answer in the form of JSON,
we can not know (in compile-time) if the data structure we receive is 
equal to the data structure we expect. Even if we, ourselves, are maintaining 
the backend API, it is still possible (and common) to create mismatches
between what we expect and what we receive.

## Assumption is the mother of all F*-ups
The common way to handle this, is to just *assume* the type you'll receive 
is what you expect. Angular does this by just adding a *type variable* to 
the HttpClient function:
```
const response$ = this.httpClient.get<Person>('some.url');
```
This is helpful for writing your codebase, but it doesn't do anything in 
runtime. This is just a compiler-hint. Better than nothing, but also a little
deceiving. As a junior developer, I thought this actually gave me type-safety...

None of the projects I've worked on since had any solutions to this problem.

## Trust but verify
So, what can we do to actually close this hole and prevent time-consuming bugs
from slipping in?

We could dynamically check whether our assumptions about the incoming data
structures are correct. 
...

## Benefits
- catch bugs early
- Solve bugs quickly and easily
- implementing this forces you to handle these errors
- more robust codebase
- maybe catch backend bugs?
- better security?

## Solutions
Joi: https://github.com/damiancipolat/dynamicy-type-check-in-js/blob/master/using_joi.md
    - no TS support
    - deprecated