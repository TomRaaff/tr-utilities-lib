---
title: Creating type-safe event
description:
  A guide to creating custom, type-safe events.
author: Tom Raaff
categories:
  - Typescript
  - Front End
tags:
  - Typescript
  - Events
  - Types
date: 2022-04-22 08:00:00
image: ??
social:title: Creating type-safe event
social:description:
  A guide to creating custom, type-safe events.
social:image: ??
---

Creating custom events in TS (or JS) is very easy. Creating a simple eventbus is also quite easy
(see [this excellent article](https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/)).
But typing your events is not so straightforward. How do you make sure that you bind a specific datatype to a
specific event name (which is just a string)?

Let's use an imaginary bookstore as an example. There are two types of events: 'customer created' and 'order created'.
Both of these events contain data. Respectively a Customer and an Order.
```typescript
type Customer = {
    id: string;
    name: string;
};
type Order = {
    book: string;
    price: number;
};
```
How do we make sure that when we want to publish a 'customer created' event, we'll only be able to add a Customer
as a payload?

Let's skip right to the solution. Here it is:
```typescript
const eventBus = new Comment('event-bus');

type EventsDefinition = {
    CUSTOMER_CREATED: Customer;
    ORDER_CREATED: Order;
};
type BookstoreEvents = keyof EventsDefinition;

function publish<T extends BookstoreEvents>(eventName: T, payload?: EventsDefinition[T]): void {
    const event = (payload) ? new CustomEvent(eventName, { detail: payload }) : new CustomEvent(eventName);
    eventBus.dispatchEvent(event);
}

type Unsubscribe = () => void;

function subscribe<T extends BookstoreEvents>(eventName: T, handlerFn: (payload: EventsDefinition[T]) => void): Unsubscribe {
	const eventHandler = (event: Event) => {
        const eventPayload = (event as CustomEvent).detail as EventsDefinition[T];
        handlerFn(eventPayload);
    }
    eventBus.addEventListener(eventName, eventHandler);
	return () => {
		eventBus.removeEventListener(eventName, eventHandler);
	}
}
```

So let's break down what is going on here. First we create an eventBus. (You can read why this works
[here](https://css-tricks.com/lets-create-a-lightweight-native-event-bus-in-javascript/)).

Here we define our events.
```typescript
type EventsDefinition = {
    CUSTOMER_CREATED: Customer;
    ORDER_CREATED: Order;
};
type BookstoreEvents = keyof EventsDefinition;
```
The EventsDefinition object connects the name of our event to the type of the payload. We want our CUSTOMER_CREATED
event to have a payload of type Customer.

The BookstoreEvents type simply takes the keys of the EventDefinition. So, in this case, the type of BookstoreEvents is
equal to `'CUSTOMER_CREATED' | 'ORDER_CREATED'`. But with an extra benefit: if we want to add new events, we'd only have
to expand our EventsDefinition type.

### Publish function
```typescript
function publish<T extends BookstoreEvents>(eventName: T, payload?: EventsDefinition[T]): void {
    const event = (payload) ? new CustomEvent(eventName, { detail: payload }) : new CustomEvent(eventName);
    eventBus.dispatchEvent(event);
}
```
In short: our publish function is a wrapper around the native `dispatchEvent()` function. I called it publish, because
that way, you avoid name clashes and publish and subscribe are common ways to name this behaviour. The Typing is the
interesting part.

When first writing this, I thought it made sense to write the function signature like this:
`function publish(eventName: BookstoreEvents, payload?: ...)` But as you can see, this signature lacks a connection
between the event name and it's desired type. The solution is to introduce a generic.

Unfortunately you can't say `function publish<BookstoreEvents>(eventName: BookstoreEvents, payload?: EventsDefinition[BookstoreEvents])`...
You'll get this error: `Type 'BookstoreEvents' cannot be used to index type 'EventsDefinition'`. But luckily,
`<T extends BookstoreEvents>` is practically the same as `<BookstoreEvents>` and this will NOT throw the error.

### Subscribe function
```typescript
type Unsubscribe = () => void;

function subscribe<T extends BookstoreEvents>(eventName: T, handlerFn: (payload: EventsDefinition[T]) => void): Unsubscribe {
	const eventHandler = (event: Event) => {
        const eventPayload = (event as CustomEvent).detail as EventsDefinition[T];
        handlerFn(eventPayload);
    }
    eventBus.addEventListener(eventName, eventHandler);
	return () => {
		eventBus.removeEventListener(eventName, eventHandler);
	}
}
```
Here, the typing in the function signature works exactly the same as with the publish function. In essence, we add an
eventListener and return a function that removes the added event listener. I've chosen for the approach
to just pass the event payload instead of the complete event. Unwrapping the event required some casting of types.


### Usage
Usage of this event bus is now pretty easy. Here's an example:
```typescript
subscribe('CUSTOMER_CREATED', (customer: Customer) => {
    console.log('customer created', customer);
})

subscribe('ORDER_CREATED', (order: Order) => {
    console.log('order created', order);
});


publish('CUSTOMER_CREATED', { id: '23498783', name: 'Dalinar Kholin' });
publish('ORDER_CREATED', { book: 'The way of kings', price: 23.99 });
```
And this is actually type safe. It is now impossible to combine 'ORDER_CREATED' with a Customer payload. You should try
this out and [play around with the code.](https://www.typescriptlang.org/play?#code/MYewdgzgLgBApgNzmKAhArhGBeGY4DuMAwiALZnJQAUA5IlQLQBGmtAlANwBQ3UAngAc4JTFHJwATjhgBvbjEUwAlgBMAXDGiTlYAOY8leAIaVN23Qe4BfHgOEwA8pNVSZ8o8xAgA1uag6+oZKgjrAcJpg6GTMUjy2fEIiAKJIKBAAInAAZrrKUMrg7gpKxACqAMoAKo4AsskASgD6xA3JAIJVyRmaxGISksGKjg0ZjS1tnd2azq6D3ACQI2PNFQASAJIAClvTMAggavF2STCo3j7QIJJwqVRYuD5w-CDZMHfpWblg+YVgPNxsugwMACkVBOhmAAbZQQAAWAB4qvAAB5QZCqLDnXxXG4fKAQAB81AYKAAcqYIjAqgAaGCCYz8KEgYyqAD8mnxmRyeTBYAA2lUALrsTQHNRyEqKUCQWCk2C4agMpks1TsGBsvCEURXMj4klpKAUyh02QwVxQYzKKGaZXM1kwazqyLavq6-Xy41wLhS+CGjAQAB0qlhDKgwDhHsNPusvHsIjKkEhEGAOliMmo6uwhP2h1UAKBIL5WmTqeUsSRqPRYExZwuuNuhqJBqoXs0tJgcOMNahUgAYmBNErGfaNO8m19eX9BSKcDnxWrNImIKW0yJ5AsZdA-VQ1t3VL3pIr5Zzo3PJUYjFu5YatiPVRn5TBjFg3eI9dHg3BLdbn1guZOPx8jOQyXl2Pb9mALYoHeKqsj6RixkY8oBoGrKqPiAAysLVlI0FGpSdLynuEGSD6Cw3FA6CSGAMCZueG4LChmCBjcZAgEgWE4cgeGeoRO4oCRB5SORsaxtwAD0EmoqYgi9jAmDGHoIgEPkcIwPGWjGNk378NwK7MCma50OU1R1OMrQdF0GS0HS1DAP0lCSL0jkiQxvpbiAvaBsyeh0A5upuKmcDGOiqi2TAAXviJ8TsLwBlGeWcB0MsFmTNZEXUNccwzC4bnZheSied5vl0NlQU3KFcDhXS5VkbFAIJWWsQpaM4zrNsuw2XZWY5sVcA+SAfm0HVWhwsogjCOF7A+twELQrCcImZUNT1M0llTN1cgqGOtAAEwAMwACwAJwABwAOxnQdEVgJSmi0Bkxgwnd0gANJwl5ui0I6PrzTC8KtSsExWd0EVml4vgPVUcIqYyMCvDAPiWBAEWhMo4SaIdgYnSdv08P9i1A+1mw7GDXBAA)

### Without a payload
But what if you want to send out an event _without_ a payload? In that case, you'd still need to register the event in
the EventsDefinition type. The trick is to have the event have a type of `void`. Like this:
```typescript
type EventsDefinition = {
    CUSTOMER_CREATED: Customer;
    ORDER_CREATED: Order;
    ORDER_SHIPPED: void;
};

subscribe('ORDER_SHIPPED', () => console.log('order shipped'));

publish('ORDER_SHIPPED');
```
This actually works and will throw compiler errors whenever you would try to add a payload to either your subscribe
handler function or your publish.

Happy coding!