import $ from './core'
import React from '../react'

var Switch = React.createClass({
    render(){
        return (
            <div class="form-line">
                <label class="form-line-content">
                    {this.props.head}
                    <input type="checkbox" class="ui-switch" /><span></span>
                </label>
            </div>
        );
    }
});

export default Switch