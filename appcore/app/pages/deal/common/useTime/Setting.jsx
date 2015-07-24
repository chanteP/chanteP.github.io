"use strict";
var {Component} = React;

export class RemovableItem extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            onRemove: false
        };
        this.toggleOnRemove = this.toggleOnRemove.bind(this);
        this.closeOnRemove = this.closeOnRemove.bind(this);
    }
    componentDidMount() {
        document.addEventListener('click', this.closeOnRemove, true);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.closeOnRemove, true);
    }
    toggleOnRemove(e) {
        e.stopPropagation();
        this.setState({onRemove: !this.state.onRemove})
    }
    closeOnRemove() {
        this.setState({onRemove: false})
    }
    render() {
        var {onRemove} = this.state;
        return <div className={"item removable" + (onRemove ? ' on-remove' : '')}>
            <i className="fa fa-minus-circle" role="button" onClick={this.toggleOnRemove} data-touchable></i>
            <div className="item-remove-button" onClick={this.props.onRemove} role="button" data-touchable>
                删除
            </div>
            {this.props.children}
        </div>
    }
}
