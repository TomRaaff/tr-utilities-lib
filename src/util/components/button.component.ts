const template = document.createElement('template');
template.innerHTML = `
    <style>
       button {
         padding: 0.5rem 1rem;
         background: lightblue;
         border: none;
         border-radius: 0.625rem;
       }
       button:active {
         background: lightcyan;
       }
       button:hover {
         cursor: pointer;
       }
    </style>
    
    <button>
        <span id="loader">Loading...</span>
        <span id="text"></span>
    </button>
`;

/**
 * Input props:
 * { text: string, isLoading: boolean-string }
 *
 * Events:
 * { 'onClick' }
 */
class ButtonComponent extends HTMLElement {
    private _isLoading = false;

    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot!.appendChild(template.content.cloneNode(true));
        const textSpan: HTMLSpanElement = this.shadowRoot!.querySelector('#text')!;
        textSpan!.innerText = this.getAttribute('text') || 'Click';
        this.setLoader(this.getAttribute('isLoading') === 'true');
    }

    get isLoading() {
        return this._isLoading;
    }
    set isLoading(isLoading: boolean) {
        this._isLoading = isLoading;
        this.setLoader(isLoading);
    }

    connectedCallback() {
        this.shadowRoot!.querySelector('button')!
            .addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('onClick'));
            });
    }

    private setLoader(isLoading: boolean): void {
        this.shadowRoot!.getElementById('loader')!.hidden = !isLoading;
        this.shadowRoot!.getElementById('text')!.hidden = isLoading;
    }
}

window.customElements.define('button-component', ButtonComponent);
