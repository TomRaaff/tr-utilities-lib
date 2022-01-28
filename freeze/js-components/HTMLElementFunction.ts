import { ElementDefinition } from './HTMLElements';

export interface HTMLElementFunction {
	(...args: Array<ElementDefinition>): HTMLElement
}
