---
title: How to create JS-component without a framework
description:
  Whenever we need to build something with component, we usually just use a
  framework. What if we didn't? How do you build re-usable, re-rendering, 
  stateful components yourself?
author: Tom Raaff
categories:
- Javascript
- Front End
- Components
- DOM
tags:
- Javascript
- Components
- DOM
- Framework-less
date: ???
image: grey-lego.jpg
social:title: Creating JS-components without a framework
social:description:
  Whenever we need to build something with component, we usually just use a
  framework. What if we didn't? How do you build re-usable, re-rendering,
  stateful components yourself?
social:image: grey-lego.jpg
---

// todo update metadata


When you're writing apps without a framework (React, Angular, etc.), you'll 
quickly notice that writing `document.createElement('div')` is pretty tiresome. 
Also, being able to create a simple component without having to duplicate a lot 
of code is also something you just need. I've managed to create a way to build 
components that are also able to re-render. I'll walk you through it.

## From JS to HTML

Like I said: writing `document.createElement('li')` and then assigning values 
and attributes to it is very tiresome, it reads poorly and it clutters your 
code with boilerplate code. So, we need a way to handle the parsing of JS-data 
to HTML elements in a convenient and concise way. 
[This article](https://medium.com/@julienetienne/declarative-templates-a-better-javascript-view-layer-f6a6ab5a7aa7) 
gave me the inspiration for the syntax we could use.

We want to be able to write our HTML elements in the following manner:

```Javascript
const component = article({ class: 'card' },
                          header({ class: 'card-header' },
                                 h1('Card component')
                          ),
                          div({ class: 'card-content' },
                              p('Here is the content of the card.'),
                              button({ class: 'close-button', onclick: () => console.log('button clicked')},
                                     'close'
                              )
                          )
                   );
```



This is very concise, it reads like HTML, but it's clear that these are 
just JS functions. These functions all do the same. They create an HTML 
element that corresponds with its function name and they can take the 
following (optional) input arguments:

- Object with attributes and/or eventlisteners
- another HTML element
- a string representing the inner text


## Build it

So how do we build this? First we need a function for all existing 
HTML elements. This might seem daunting, but you can easily find a list 
of all HTML elements and then use some smart multi-line editing tricks 
to write a function for everyone of them. Or you can just copy my code 
from [here](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/rendering/HTMLElements.ts).

It will result in functions like this:

```javascript
export const div = (...args) => {
	const elementType = 'div';
	return createElement(elementType, ...args);
};

export const ul = (...args) => {
	const elementType = 'ul';
	return createElement(elementType, ...args);
};
```



## Create element

This means that the createElement function contains the meat and bones of 
creating an element. Basically, what we want to do is the following:

1. Create an element
2. Figure out what kind of arguments are given
3. Assign attributes to the element if present
4. Assign event listeners to the element if present
5. Assign other HTML elements or strings to its inner content

In pseudocode, it would look like this:

```Javascript
function createElement(type, ...args) {
  const element = document.createElement(type);
  const attributes = args.find(findAttributesObjectFn);
  const innerContent = args.filter(excludeAttributesObjectFn); // strings or other HTML elements
  
  if (attributes) {
    const attr = getAttributes(attributes);
    const events = getEvents(attributes);
    assignAttributes(element, attr);
    assignEvents(element, events);
  }
  if (innerContent) {
    innerContent.forEach(child => {
      // element.append takes both strings and HTMLElements
      element.append(child);
    });
  }
  return element;
}
```

This is still a simplified version. You can find an example of the actual code [here](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/rendering/CreateElement.ts).

This will enable us to write HTML through JS in the way we want. 
This is already pretty powerful because we now have a very convenient 
way of writing HTML and it enables us to create _stateless_ components 
quite easily. You can now use this if you want to share a header 
component over several pages. But if you need to create a _stateful_ 
component, this will result into some problems. Let me show you.

## Stateful component

A very simple example of a stateful component would be a button that changes 
color and text based on whether it is clicked. 

```javascript
function buttonComponent(isClicked) {
  const color = (isClicked) ? 'red' : 'green';
  const text = (isClicked) ? 'you clicked me' : 'click me';
  return button({ class: color }, text);
}

document.querySelector('main').append(buttonComponent(false));
```

This seems fine, but we still don't have the ability for it to change 
it's state upon click. We could add `onclick: () => buttonComponent(!isClicked)`, 
but what would we do with the output of the function? The result will be a 
button component that will never be rendered to the screen.

## Rerendering

We need the component to handle its own re-rendering for us. Also, we 
don't want to handle that logic every time we build a component, so 
let's make a Component class where all components should extend from.

In order to build the re-rendering we need a couple of things:

- Something that represents the component's state 
- A way to listen to changes to that state
- To trigger a re-rendering whenever the state changes



### Component class

If we put our component in a class we can use its constructor to define 
its state and we could put the component output inside a render function. 

```Javascript
class ButtonComponent {
  constructor(isClicked = false) {
  } 
  
  render() {
    const color = (this.isClicked) ? 'blue' : 'yellow';
    const text = (this.isClicked) ? 'you clicked me' : 'click me';
    return button({ class: color }, text);
  }
}

const btnComponent = new ButtonComponent();
document.querySelector('main').append(btnComponent.render());
```



We can use Proxies to listen to state changes. But to do that, we need to 
pass the state to the parent Component class. And that proxy enables us to 
trigger a re-rendering. It would look like this:

```Javascript
class Component {
  state;
  
  setState(state) {
    this.state = new Proxy(state, stateHandler);
    // since ButtonComponen extends Component, it will also have access to this.state.
  }
  
  stateHandler = {
    set: (target, prop, value) => {
      target[prop] = value; // updates the state object
      this.render(); // triggers the rendering
    }
  }
}
```

Update the component:
```Javascript
class ButtonComponent extends Component {
  constructor(isClicked = false) {
    super();
    this.setState({isClicked}); // add a call to setState
  } 
  
  render() {
    // notice: isClicked is now derived from 'this.state', instead of 'this'
    const color = (this.state.isClicked) ? 'blue' : 'yellow'; 
    const text = (this.state.isClicked) ? 'you clicked me' : 'click me';
      return button({ class: color }, text);  
    }
}
```

To actually trigger the re-rendering, we need change the state. Let's create 
a function for that:

```Javascript
class ButtonComponent extends Component {
  // omitted code from earlier examples //
    
  clickBtn() {
    this.state.isClicked = !this.state.isClicked;
  }
  
  render() {
    const color = (this.state.isClicked) ? 'blue' : 'yellow'; 
    const text = (this.state.isClicked) ? 'you clicked me' : 'click me';
    // notice the onclick eventhandler
    return button({ class: color, onclick: () => this.clickBtn() }, text);  
  }
}
```


We're still not done though. We've triggered the render function upon change
of the state, but its output will be lost. We still haven't defined a location for the 
created elements to be put into the DOM. Also, our old state/component is 
still visible on the screen. We need to get rid of that as well.

If we know when the render function is called, we might be able to 
check whether an old component already exists and replace it with our new
component. Or just add the new component if there isn't an old component.

Our beloved proxy object can help us out yet again. This time, we'll wrap our
`Component.render()` function in a proxy so we can listen to it being called.


### Replace existing the existing component

Our render proxy could be implemented like this:
```Javascript
class Component {
  constructor() {
    this.render = new Proxy(this.render, this.renderHandler);
  }
    
  renderHandler = {
    apply: (target, thisArg, argArray) => {
      let oldComponent; // todo: how do we find the oldComponent in the DOM?
      const newComponent = target.apply(thisArg, ...argArray); // executes .render()
      if (oldComponent) {
        oldComponent.parentElement?.insertBefore(newComponent, oldComponent)
        oldComponent.remove();
      }
      return newComponent;
    }
  }

  // omitted all state-related code //
}
```
Notice the `insertBefore()`. If I think about adding elements to the DOM, then
`parent.append(newElement)` is the first solution that comes to mind. If we were
to use it, though, we'd be creating a bug.
If we'd have a list of components and one is being re-rendered, we'd remove it and
`append` it to the end of the list. Updating the component will move it to the
end of the list. That is why we need the `insertBefore`. Now, we render it 
as a direct sibling of the old component, and then we remove the old component. 

### Finding the 'old' component in the DOM
The basic idea is to add a unique ID to every component, so we can easily 
retrieve it from the DOM. We'll simply add a number to a custom data-attribute.

```Javascript
let id = 0;

class Component {
	componentId;

	constructor() {
		this.componentId = (id++).toString();
		this.render = new Proxy(this.render, this.renderHandler);
	}

	renderHandler: ProxyHandler = {
		apply: (target, thisArg, argArray) => {
			let oldComponent = document.querySelector(`[data-component-id="${this.componentId}"]`);
			const newComponent = target.apply(thisArg, ...argArray);
			newComponent.dataset.componentId = this.componentId;
			if (oldComponent) {
				oldComponent.parentElement?.insertBefore(newComponent, oldComponent);
				oldComponent.remove();
				oldComponent = null;
			}
			return newComponent;
		}
	};
    
    // omitted all state-related code //
}
```
Admitted: this is not the prettiest solution, but I've never had any problems
while using this.


# TODO
- add the component ID's
- fix the array index problem. Or not. 















