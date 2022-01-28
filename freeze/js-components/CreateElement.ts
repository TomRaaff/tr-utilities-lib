import { GlobalAttributes } from './GlobalAttributes';
import { ElementDefinition } from './htmlElements';
import { EventHandlerAttributes } from './EventHandlerAttributes';
import Component from './Component';

type Attribute = [keyof GlobalAttributes, any];
type EventAttribute = [keyof EventHandlerAttributes | string, Function];

function isStringOrHTMLElementOrComponent(arg: ElementDefinition): boolean {
	return arg !== undefined && (arg instanceof HTMLElement || typeof arg === 'string' || 'isComponent' in arg);
}

function assignAttributes(htmlElement: any, attr: Array<Attribute>) {
	attr.forEach(([key, val]) => {
		if (typeof val === 'boolean') {
			htmlElement[key] = val;
			return;
		}
		if (typeof val === 'string') {
			htmlElement.setAttribute(key, val);
		}
	});
}

function assignEventListeners(htmlElement: any, events: Array<EventAttribute>): void {
	events.forEach(([key, val]) => {
		htmlElement.addEventListener(key.slice(2), val);
	});
}

export function createElement(type: string, ...args: Array<ElementDefinition>) {
	const element = document.createElement(type);
	const attributes = args.find((arg) => !isStringOrHTMLElementOrComponent(arg)) as GlobalAttributes;
	const innerContent = args.filter(isStringOrHTMLElementOrComponent) as Array<string | HTMLElement | Component>;

	if (attributes) {
		const attr = Object.entries(attributes)
						   .filter(([key]) => !key.startsWith('on')) as Array<Attribute>;
		const events = Object.entries(attributes)
							 .filter(([key]) => key.startsWith('on')) as Array<EventAttribute>;
		assignAttributes(element, attr);
		assignEventListeners(element, events);
	}

	if (innerContent) {
		innerContent.forEach((child) => {
			if (typeof child !== 'string' && 'isComponent' in child) {
				const rendered = child.render();
				if (Array.isArray(rendered)) {
					element.append(...rendered);
				} else {
					element.append(rendered);
				}
			} else {
				// element.append takes both strings and HTMLElements
				element.append(child);
			}
		});
	}

	return element;
}
