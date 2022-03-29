function handleData() {
    const name = document.querySelector('[id="name"]');
    const age = document.querySelector('[id="age"]');
    const email = document.querySelector('[id="email"]');
    const color = document.querySelector('[id="color"]');
    const birthday = document.querySelector('[id="birthday"]');
    console.log({name, age, email, color, birthday});
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

function setVisible(selector: string, isVisible: boolean) {
    (document.querySelector(selector) as HTMLElement).style.display = (isVisible) ? '' : 'none';
}

function addEvent(selector: string, event: string, handler: (event: Event) => void) {
    const element = document.querySelector(selector);
    element?.addEventListener(event, handler);
    return function remove() {
        element?.removeEventListener(event, handler);
    }
}

const form = document.querySelector('form');
const formData = (form) ? new FormData(form) : undefined;

addEvent('form', 'submit', (event) => {
    event.preventDefault();
    handleData();
    console.log(formToObject(formData));
});

addEvent('#extraQuestion', 'change', (event) => {
    const addExtraQuestion = (event.target as HTMLInputElement).checked;
    setVisible('.petName', addExtraQuestion);
});
