import { ElementDefinition } from './HTMLElements';

// todo: try: ...spread all input params
// todo: try: currying: div(attributes?)(innerHTML?)
export interface HTMLElementFunction {
	(...args: Array<ElementDefinition>): HTMLElement
}
