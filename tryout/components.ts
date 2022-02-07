import {h1, div} from "../src";
import Component from "../src/util/rendering/Component";

class Clock extends Component {
    constructor() {
        super();
        this.setState({counter: '1'});
    }

    render() {
        setTimeout(() => {
            this.state.counter = (parseInt(this.state.counter) + 1).toString();
        }, 1000);

        return div(
            h1(this.state.counter)
        )
    }
}

document.querySelector('main')!.append(new Clock().render());
