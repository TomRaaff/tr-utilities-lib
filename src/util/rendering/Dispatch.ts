export default function dispatch(eventName: string) {
	document.dispatchEvent(new CustomEvent(eventName, {bubbles: false, cancelable: false}));
}
