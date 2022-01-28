import { GlobalAttributes } from './GlobalAttributes';
import { HTMLElementFunction } from './HTMLElementFunction';
import { createElement } from './CreateElement';
import Component from './Component';

/*
	These elements are not implemented:
	<var> and all deprecated html elements
 */


export type ElementDefinition = GlobalAttributes | string | HTMLElement | Component;

/**
 * Defines a hyperlink
 */
export const a: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'a';
	return createElement(elementType, ...args);
};

/**
 * Defines an abbreviation or an acronym
 */
export const abbr: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'abbr';
	return createElement(elementType, ...args);
};

/**
 * Defines contact information for the author/owner of a document
 */
export const address: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'address';
	return createElement(elementType, ...args);
};

/**
 * Defines an area inside an image map
 */
export const area: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'area';
	return createElement(elementType, ...args);
};

/**
 * Defines an article
 */
export const article: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'article';
	return createElement(elementType, ...args);
};

/**
 * Defines content aside from the page content
 */
export const aside: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'aside';
	return createElement(elementType, ...args);
};

/**
 * Defines embedded sound content
 */
export const audio: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'audio';
	return createElement(elementType, ...args);
};

/**
 * Defines bold text
 */
export const b: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'b';
	return createElement(elementType, ...args);
};

/**
 * Specifies the base URL/target for all relative URLs in a document
 */
export const base: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'base';
	return createElement(elementType, ...args);
};

/**
 * Isolates a part of text that might be formatted in a different direction from other text outside it
 */
export const bdi: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'bdi';
	return createElement(elementType, ...args);
};

/**
 * Overrides the current text direction
 */
export const bdo: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'bdo';
	return createElement(elementType, ...args);
};

/**
 * Defines a section that is quoted from another source
 */
export const blockquote: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'blockquote';
	return createElement(elementType, ...args);
};

/**
 * Defines the document's body
 */
export const body: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'body';
	return createElement(elementType, ...args);
};

/**
 * Defines a single line break
 */
export const br: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'br';
	return createElement(elementType, ...args);
};

/**
 * Defines a clickable button
 */
export const button: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'button';
	return createElement(elementType, ...args);
};

/**
 * Used to draw graphics, on the fly, via scripting (usually JavaScript)
 */
export const canvas: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'canvas';
	return createElement(elementType, ...args);
};

/**
 * Defines a table caption
 */
export const caption: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'caption';
	return createElement(elementType, ...args);
};

/**
 * Defines the title of a work
 */
export const cite: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'cite';
	return createElement(elementType, ...args);
};

/**
 * Defines a piece of computer code
 */
export const code: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'code';
	return createElement(elementType, ...args);
};

/**
 * Specifies column properties for each column within a <colgroup> element
 */
export const col: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'col';
	return createElement(elementType, ...args);
};

/**
 * Specifies a group of one or more columns in a table for formatting
 */
export const colgroup: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'colgroup';
	return createElement(elementType, ...args);
};

/**
 * Adds a machine-readable translation of a given content
 */
export const data: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'data';
	return createElement(elementType, ...args);
};

/**
 * Specifies a list of pre-defined options for input controls
 */
export const datalist: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'datalist';
	return createElement(elementType, ...args);
};

/**
 * Defines a description/value of a term in a description list
 */
export const dd: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'dd';
	return createElement(elementType, ...args);
};

/**
 * Defines text that has been deleted from a document
 */
export const del: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'del';
	return createElement(elementType, ...args);
};

/**
 * Defines additional details that the user can view or hide
 */
export const details: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'details';
	return createElement(elementType, ...args);
};

/**
 * Specifies a term that is going to be defined within the content
 */
export const dfn: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'dfn';
	return createElement(elementType, ...args);
};

/**
 * Defines a dialog box or window
 */
export const dialog: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'dialog';
	return createElement(elementType, ...args);
};

/**
 * Defines a section in a document
 */
export const div: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'div';
	return createElement(elementType, ...args);
};

/**
 * Defines a description list
 */
export const dl: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'dl';
	return createElement(elementType, ...args);
};

/**
 * Defines a term/name in a description list
 */
export const dt: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'dt';
	return createElement(elementType, ...args);
};

/**
 * Defines emphasized text
 */
export const em: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'em';
	return createElement(elementType, ...args);
};

/**
 * Defines a container for an external application
 */
export const embed: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'embed';
	return createElement(elementType, ...args);
};

/**
 * Groups related elements in a form
 */
export const fieldset: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'fieldset';
	return createElement(elementType, ...args);
};

/**
 * Defines a caption for a <figure> element
 */
export const figcaption: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'figcaption';
	return createElement(elementType, ...args);
};

/**
 * Specifies self-contained content
 */
export const figure: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'figure';
	return createElement(elementType, ...args);
};

/**
 * Defines a footer for a document or section
 */
export const footer: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'footer';
	return createElement(elementType, ...args);
};

/**
 * Defines an HTML form for user input
 */
export const form: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'form';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h1: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h1';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h2: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h2';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h3: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h3';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h4: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h4';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h5: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h5';
	return createElement(elementType, ...args);
};

/**
 * <h1> to <h6> 	Defines HTML headings
 */
export const h6: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'h6';
	return createElement(elementType, ...args);
};

/**
 * Contains metadata/information for the document
 */
export const head: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'head';
	return createElement(elementType, ...args);
};

/**
 * Defines a header for a document or section
 */
export const header: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'header';
	return createElement(elementType, ...args);
};

/**
 * Defines a thematic change in the content
 */
export const hr: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'hr';
	return createElement(elementType, ...args);
};

/**
 * Defines the root of an HTML document
 */
export const html: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'html';
	return createElement(elementType, ...args);
};

/**
 * Defines a part of text in an alternate voice or mood
 */
export const i: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'i';
	return createElement(elementType, ...args);
};

/**
 * Defines an inline frame
 */
export const iframe: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'iframe';
	return createElement(elementType, ...args);
};

/**
 * Defines an image
 */
export const img: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'img';
	return createElement(elementType, ...args);
};

/**
 * Defines an input control
 */
export const input: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'input';
	return createElement(elementType, ...args);
};

/**
 * Defines a text that has been inserted into a document
 */
export const ins: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'ins';
	return createElement(elementType, ...args);
};

/**
 * Defines keyboard input
 */
export const kbd: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'kbd';
	return createElement(elementType, ...args);
};

/**
 * Defines a label for an <input> element
 */
export const label: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'label';
	return createElement(elementType, ...args);
};

/**
 * Defines a caption for a <fieldset> element
 */
export const legend: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'legend';
	return createElement(elementType, ...args);
};

/**
 * Defines a list item
 */
export const li: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'li';
	return createElement(elementType, ...args);
};

/**
 * Defines the relationship between a document and an external resource (most used to link to style sheets)
 */
export const link: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'link';
	return createElement(elementType, ...args);
};

/**
 * Specifies the main content of a document
 */
export const main: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'main';
	return createElement(elementType, ...args);
};

/**
 * Defines an image map
 */
export const map: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'map';
	return createElement(elementType, ...args);
};

/**
 * Defines marked/highlighted text
 */
export const mark: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'mark';
	return createElement(elementType, ...args);
};

/**
 * Defines metadata about an HTML document
 */
export const meta: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'meta';
	return createElement(elementType, ...args);
};

/**
 * Defines a scalar measurement within a known range (a gauge)
 */
export const meter: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'meter';
	return createElement(elementType, ...args);
};

/**
 * Defines navigation links
 */
export const nav: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'nav';
	return createElement(elementType, ...args);
};

/**
 * Defines an alternate content for users that do not support client-side scripts
 */
export const noscript: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'noscript';
	return createElement(elementType, ...args);
};

/**
 * Defines a container for an external application
 */
export const object: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'object';
	return createElement(elementType, ...args);
};

/**
 * Defines an ordered list
 */
export const ol: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'ol';
	return createElement(elementType, ...args);
};

/**
 * Defines a group of related options in a drop-down list
 */
export const optgroup: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'optgroup';
	return createElement(elementType, ...args);
};

/**
 * Defines an option in a drop-down list
 */
export const option: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'option';
	return createElement(elementType, ...args);
};

/**
 * Defines the result of a calculation
 */
export const output: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'output';
	return createElement(elementType, ...args);
};

/**
 * Defines a paragraph
 */
export const p: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'p';
	return createElement(elementType, ...args);
};

/**
 * Defines a parameter for an object
 */
export const param: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'param';
	return createElement(elementType, ...args);
};

/**
 * Defines a container for multiple image resources
 */
export const picture: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'picture';
	return createElement(elementType, ...args);
};

/**
 * Defines preformatted text
 */
export const pre: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'pre';
	return createElement(elementType, ...args);
};

/**
 * Represents the progress of a task
 */
export const progress: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'progress';
	return createElement(elementType, ...args);
};

/**
 * Defines a short quotation
 */
export const q: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'q';
	return createElement(elementType, ...args);
};

/**
 * Defines what to show in browsers that do not support ruby annotations
 */
export const rp: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'rp';
	return createElement(elementType, ...args);
};

/**
 * Defines an explanation/pronunciation of characters (for East Asian typography)
 */
export const rt: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'rt';
	return createElement(elementType, ...args);
};

/**
 * Defines a ruby annotation (for East Asian typography)
 */
export const ruby: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'ruby';
	return createElement(elementType, ...args);
};

/**
 * Defines text that is no longer correct
 */
export const s: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 's';
	return createElement(elementType, ...args);
};

/**
 * Defines sample output from a computer program
 */
export const samp: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'samp';
	return createElement(elementType, ...args);
};

/**
 * Defines a client-side script
 */
export const script: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'script';
	return createElement(elementType, ...args);
};

/**
 * Defines a section in a document
 */
export const section: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'section';
	return createElement(elementType, ...args);
};

/**
 * Defines a drop-down list
 */
export const select: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'select';
	return createElement(elementType, ...args);
};

/**
 * Defines smaller text
 */
export const small: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'small';
	return createElement(elementType, ...args);
};

/**
 * Defines multiple media resources for media elements (<video> and <audio>)
 */
export const source: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'source';
	return createElement(elementType, ...args);
};

/**
 * Defines a section in a document
 */
export const span: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'span';
	return createElement(elementType, ...args);
};

/**
 * Defines important text
 */
export const strong: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'strong';
	return createElement(elementType, ...args);
};

/**
 * Defines style information for a document
 */
export const style: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'style';
	return createElement(elementType, ...args);
};

/**
 * Defines subscripted text
 */
export const sub: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'sub';
	return createElement(elementType, ...args);
};

/**
 * Defines a visible heading for a <details> element
 */
export const summary: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'summary';
	return createElement(elementType, ...args);
};

/**
 * Defines superscripted text
 */
export const sup: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'sup';
	return createElement(elementType, ...args);
};

/**
 * Defines a container for SVG graphics
 */
export const svg: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'svg';
	return createElement(elementType, ...args);
};

/**
 * Defines a table
 */
export const table: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'table';
	return createElement(elementType, ...args);
};

/**
 * Groups the body content in a table
 */
export const tbody: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'tbody';
	return createElement(elementType, ...args);
};

/**
 * Defines a cell in a table
 */
export const td: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'td';
	return createElement(elementType, ...args);
};

/**
 * Defines a container for content that should be hidden when the page loads
 */
export const template: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'template';
	return createElement(elementType, ...args);
};

/**
 * Defines a multiline input control (text area)
 */
export const textarea: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'textarea';
	return createElement(elementType, ...args);
};

/**
 * Groups the footer content in a table
 */
export const tfoot: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'tfoot';
	return createElement(elementType, ...args);
};

/**
 * Defines a header cell in a table
 */
export const th: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'th';
	return createElement(elementType, ...args);
};

/**
 * Groups the header content in a table
 */
export const thead: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'thead';
	return createElement(elementType, ...args);
};

/**
 * Defines a specific time (or datetime)
 */
export const time: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'time';
	return createElement(elementType, ...args);
};

/**
 * Defines a title for the document
 */
export const title: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'title';
	return createElement(elementType, ...args);
};

/**
 * Defines a row in a table
 */
export const tr: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'tr';
	return createElement(elementType, ...args);
};

/**
 * Defines text tracks for media elements (<video> and <audio>)
 */
export const track: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'track';
	return createElement(elementType, ...args);
};

/**
 * Defines some text that is unarticulated and styled differently from normal text
 */
export const u: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'u';
	return createElement(elementType, ...args);
};

/**
 * Defines an unordered list
 */
export const ul: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'ul';
	return createElement(elementType, ...args);
};

/**
 * Defines embedded video content
 */
export const video: HTMLElementFunction = (...args: Array<ElementDefinition>): HTMLElement => {
	const elementType = 'video';
	return createElement(elementType, ...args);
};

/**
 * Defines a possible line-break
 */
export const wbr: HTMLElementFunction = (...args:Array <ElementDefinition>): HTMLElement => {
	const elementType = 'wbr';
	return createElement(elementType, ...args);
};

