import $ from './core'
import React from '../react'

var Radio = React.createClass({
    render(){
        return {
            [].map((options) => {
                <div class="form-line">
                    <label class="form-line-content">
                        <input type="radio" class="ui-radio" name={options.name} value={options.value} />
                        <span>{options.text}</span>
                    </label>
                </div>
            })
        };
    }
});

export default Radio