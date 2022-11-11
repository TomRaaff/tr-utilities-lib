import {html, LitElement} from "lit";

import './page1.js';
import './page2.js';

export class WebshopMain extends LitElement {
    static properties = {
        route: { type: String }
    }

    constructor() {
        super();
        this.route = 'page1';
    }

    routerOutput(route) {
        let component;
        switch (route) {
            case('page1'):
                component = html`<page-one></page-one>`;
                break;
            case('page2'):
                component = html`<page-two></page-two>`;
                break;
            default:
                throw new Error('unknown route' + route);
        }
        return component;
    }

    render() {
        return this.routerOutput(this.route);
    }
}

customElements.define('webshop-main', WebshopMain);