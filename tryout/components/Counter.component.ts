import Component from "../../src/util/rendering/Component";
import {li, button} from "../../src";

export class Counter extends Component {
    constructor(counter: number) {
        super();
        this.setState({counter});
    }

    render() {
        return li({},
                   this.state.counter.toString(),
                   button({onclick: () => this.state.counter = this.state.counter + 10},
                       'click me'
                   )
               )
    }
}