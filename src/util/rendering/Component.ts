let id = 0;

export default abstract class Component {
	protected state: any;
	private componentId: string;

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
			let parent;
			if (oldComponent) {
				parent = oldComponent.parentElement;
				oldComponent.remove();
				oldComponent = null;
			}
			const renderOutput = target.apply(thisArg, ...argArray) as HTMLElement;
			renderOutput.dataset.componentId = this.componentId;
			if (parent) {
				/*
					Todo:
						There might be a problem here when the component is one of multiple elements,
						it will probably be rendered last in the list instead of in it's current
						location.
				 */
				parent.append(renderOutput);
			}
			return renderOutput;
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
