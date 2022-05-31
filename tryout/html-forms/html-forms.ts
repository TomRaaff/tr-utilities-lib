// --- Types --- //
type EventHandler = (event: Event) => void;
type RemoveEventHandler = () => void;

// --- Utilities --- //
const select = document.querySelector;

function addEvent(selector: string, event: string, handler: EventHandler): RemoveEventHandler {
    const element = document.querySelector(selector);
    element?.addEventListener(event, handler);
    return function remove() {
        element?.removeEventListener(event, handler);
    }
}

function formToObject(form?: FormData): unknown {
    const dataObj: any = {};
    if (form) {
        // @ts-ignore
        for (let [key, value] of form.entries()) {
            dataObj[key] = value;
        }
    }
    return dataObj;
}

function toggleVisiblity(selector: string, setVisible: boolean): void {
    const element = document.querySelector(selector) as HTMLElement;
    if (setVisible) {
        element.classList.remove('invisible');
    } else {
        element.classList.add('invisible');
    }
}

function prepareForm(selector: string, isEnabled: boolean): void {
    // const partnerForm = document.querySelector('form[id="partner-form"]') as HTMLFormElement;
    // partnerForm.reset();
    const inputNodes = document
        .querySelector(selector)
        ?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    // @ts-ignore
    [...inputNodes]
        .forEach((input: HTMLInputElement) => {
            if (isEnabled) {
                /*
                TODO: How do I reset the validity AND have it be required?
                    option 1: addEventListener that sets required only after it has been touched...
                        This will create a bug: if the input is not touched, it will not be required...
                    option 2: destroy and create the input elements whenever the form visibility is toggled
                    option 3:
                 */
                input.required = true;
            } else {
                input.required = false;
                // input.value = '';
            }
        });
}

// --- Event listeners --- //
addEvent('form', 'submit', (event: Event) => {
    event.preventDefault();
    const formData = (event.target) ? new FormData(event.target as HTMLFormElement) : undefined;
    console.log(formToObject(formData));
});

addEvent('#extraQuestion', 'change', (event) => {
    const addExtraQuestion = (event.target as HTMLInputElement).checked;
    toggleVisiblity('.petName', addExtraQuestion);
});

addEvent('#status', 'change', (event) => {
    const isPartnerFormEnabled = (event.target as HTMLSelectElement).value === 'married';
    toggleVisiblity('.partner-form', isPartnerFormEnabled);
    prepareForm('.partner-form', isPartnerFormEnabled);
});
