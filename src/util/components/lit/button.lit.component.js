import {html, LitElement} from "lit";

/**
 * Attributes:
 * isLoading: boolean
 * text: string
 *
 * Output events:
 * 'onClick'
 */
export class ButtonLitComponent extends LitElement {
    static properties = {
        isLoading: {type: Boolean},
        text: {type: String},
    }

    constructor() {
        super();
        this.isLoading = false;
        this.text = 'I am a button';
    }

    onClick() {
        this.dispatchEvent(new CustomEvent('onClick', { detail: {thisIs: 'an Object' } }));
    }

    render() {
        const displayText = this.isLoading ? '...loading' : this.text;
        return html`
            <button @click="${this.onClick}">${displayText}</button>
        `
    }
}

customElements.define('button-lit-component', ButtonLitComponent);