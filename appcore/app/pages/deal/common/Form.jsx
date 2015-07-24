"use strict";
var {Component} = React;

export default class FormComponent extends Component {
    get value() {
        var value = {}, state = this.state, key;
        if (!state) return value;
        for (var key in state) {
            if (state.hasOwnProperty(key) && key.charAt(0) !== '_') {
                value[key] = state[key];
            }
        }
        return value;
    }
    set value(v) {}

    getValue() {
        return this.value;
    }

    getProp(key, def) {
        var props = this.props;
        if (props.hasOwnProperty(key)) {
            return props[key];
        }
        return def;
    }
    static getValueFromInput(nodeInput) {
        if (!nodeInput || nodeInput.tagName  !== 'INPUT') return;
        switch(nodeInput.type) {
            case 'checkbox':
            case 'radio':
                if (nodeInput.name) return nodeInput.value;
                return nodeInput.checked;
                break;
            default:
                return nodeInput.value;
        }
    }
    static getValueFromEvent(e) {
        if (!e) return;
        if (e.target) {
            return this.getValueFromInput(e.target);
        } else if (e.hasOwnProperty('value')) {
            return e.value;
        } else {
            return e;
        }
    }
}
