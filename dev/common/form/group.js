import $ from './core'
import React from '../react'

var Group = React.createClass({
    render(){
        return (
            <div class="form-group">
                <div class="form-group-title">{this.props.title}</div>
                {}
            </div>
        );
    }
});

export default Group