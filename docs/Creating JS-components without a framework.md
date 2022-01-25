# Creating JS-components without a framework

When you're writing apps without a framework (React, Angular, etc.), you'll quickly notice that writing `document.createElement('div')` is pretty tiresome. Also, being able to create a simple component without having to duplicate a lot of code is also something you just need. I've managed to create a way to build components that are also able to re-render. I'll walk you through it. 



## From JS to HTML

Like I said: writing `document.createElement('li')` and then assigning values and attributes to it is very tiresome and it clutters your code with boilerplate code. So, we need a way to handle the parsing of JS-data to HTML elements in a convenient and consise way. [This article](https://medium.com/@julienetienne/declarative-templates-a-better-javascript-view-layer-f6a6ab5a7aa7) gave me the inspiration for the syntax we could use.

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



This is very consise, it reads like HTML but it's clear that these are just JS functions. These functions all do the same. They create an HTML element that corresponds with the function name and they can take the following input arguments:

- Object with attributes and/or eventlisteners
- another HTML element
- a string representing the inner text



For a more in-depth reasoning about this syntax, see [this article](https://medium.com/@julienetienne/declarative-templates-a-better-javascript-view-layer-f6a6ab5a7aa7).



## Build it

So how do we build this? First we need a function for all existing HTML elements. This might seem daunting, but you can easily find a list of all HTML elements and then use some smart multi-line editing tricks to write a function for everyone of them. Or you can just copy my code from [here](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/rendering/HTMLElements.ts).

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

This means that the createElement function contains the meat and bones of creating an element. Basically, what we want to do is the following:

1. Create an element
2. Figure out what kind of arguments are given
3. Assign attributes to the element if present
4. Assign event listeners to the element if present
5. Assign other HTML elements or strings to it's inner content

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

You can find an example of actual code [here](https://github.com/TomRaaff/tr-utilities-lib/blob/main/src/util/rendering/CreateElement.ts).



This will enable us to write HTML through JS in the way we want. This is already pretty powerful because we now have a very convenient way of writing HTML and it enables us to create _stateless_ components quite easily. You can now use this if you want to share a header component over several pages. But if you need to create a _stateful_ component, this will result into some problems. Let me show you.

## Stateful component

A very simple example of a stateful component would be a button that changes color and text based whenever it is clicked. 

```javascript
function buttonComponent(isClicked) {
  const color = (isClicked) ? 'red' : 'green';
  const text = (isClicked) ? 'you clicked me' : 'click me';
  return button({ class: color }, text);
}

document.querySelector('main').append(buttonComponent(false));
```

This seems fine, but we still don't have the ability for it to change it's state upon click. We could add `onclick: () => buttonComponent(!isClicked)`, but what would we do with the output of the function? We can't use it's return value this way.

## Rerendering

We need the component to handle it's own rerendering for us. Also, we don't want to handle that logic every time we build a component, so let's make a Component class where all components should extend from.

In order to build the rerendering we need a couple of things:

- Something that represents state 
- A way to listen to changes in that state
- Trigger a rerendering whenever the state changes



### Component class

If we put our component in a class we can use it's constructor to define it's state and we could put the component output inside a render function. 

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



We can use Proxies to listen to state changes. But to do that, we need to pass the state to the parent Component class. And that proxy enables us to trigger a rerendering. It would look like this:

```JavaScript
class Component {
  setState(state) {
    this.state = new Proxy(state, {})
  }
  
  stateHandler = {
    set: (target, prop, value) => {
      target[prop] = value;
      this.render();
    }
  }
}
```

``` Javascript
class ButtonComponent extends Component {
  constructor(isClicked = false) {
    super();
    this.setState({isClicked})
  } 
  
  render() {
    // notice: isClicked is now derived from 'this.state', instead of 'this'
    const color = (this.state.isClicked) ? 'blue' : 'yellow'; 
  	const text = (this.state.isClicked) ? 'you clicked me' : 'click me';
	  return button({ class: color }, text);  
	}
}
```



To actually trigger the rerendering, we need change the state. Let's create a function for that:

```Javascript 
class ButtonComponent extends Component {
  ...

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



Now, we're able to trigger a rerendering, but this still doesn't affect the DOM. Our rerendering would return a new component with the correct state, but the returned component will be lost. We could fix this by adding another proxy to our component-class. One that listens to the render-function being called. 

If we wrap the render-function, we can then check whether the component already exists in de DOM and replace it if it does. Otherwise, just return the output of the render-function.



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
			let parent = oldComponent?.parentElement;
			oldComponent?.remove();

			const renderOutput = target.apply(thisArg, ...argArray) as HTMLElement;
			parent?.append(renderOutput);
      
      
      
      /// FIX THE ARRAY INDEX PROBLEM?
      ///// MAYBE AS A SEPARATE PARAGRAPH
      
      
			return renderOutput;
    }
  }
    
  ...
}
```

















