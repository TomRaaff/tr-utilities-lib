import {html, LitElement} from "lit";

export class Page1 extends LitElement {
    render() {
        return html`
            <h2>This is page 1!</h2>
            <div>
                <a href="/page2">Go to page 2</a>
            </div>
        `;
    }
}

customElements.define('page-one', Page1);