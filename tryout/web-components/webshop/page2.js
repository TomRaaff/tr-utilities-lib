import {html, LitElement} from "lit";

export class Page2 extends LitElement {
    render() {
        return html`
            <h2>This is the second page!</h2>
            <div>
                <a href="/page1">Go back to page1</a>
            </div>
        `;
    }
}

customElements.define('page-two', Page2);