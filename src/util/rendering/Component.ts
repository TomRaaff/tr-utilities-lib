let id = 0;

export default abstract class Component {
	protected state: any;
	protected componentId: string;

	constructor() {
		this.componentId = (id++).toString();
		this.render = new Proxy(this.render, this.renderHandler);
	}

	protected setState(state: object) {
		this.state = new Proxy(state, this.fieldHandler);
	}

	renderHandler: ProxyHandler<any> = {
		apply: (target, thisArg, argArray) => {
			let oldComponent = document.querySelector(`[data-component-id="${this.componentId}"]`);
			const newComponent = target.apply(thisArg, ...argArray) as HTMLElement;
			newComponent.dataset.componentId = this.componentId;
			if (oldComponent) {
				oldComponent.parentElement?.insertBefore(newComponent, oldComponent);
				oldComponent.remove();
				oldComponent = null;
			}
			return newComponent;
		}
	};

	fieldHandler: ProxyHandler<any> = {
		set: (target: any, prop: string | symbol, value: any): boolean => {
			target[prop] = value;
			this.render();
			return true;
		}
	};

	isComponent(): boolean {
		return true;
	}

	abstract render(): HTMLElement | Array<HTMLElement>;

}

/*
Codepen html
<ul>
  <li id="1">one</li>
  <li id="2">two</li>
  <li id="3">three</li>
  <li id="4">four</li>
</ul>

Codepen JS
const newItem = document.createElement('li');
newItem.innerText = 'fifty';
const listItem = document.querySelector('[id="3"]');
const parent = listItem.parentElement;
parent.insertBefore(newItem, listItem);

Codepen result
    one
    two
    fifty
    three
    four

 */