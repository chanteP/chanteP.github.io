import $ from './core'
import React from '../react'

var Checkbox = React.createClass({
    render(){
        return {
            [].map((options) => {
                <div class="form-line">
                    <label class="form-line-content">
                        <input type="checkbox" class="ui-checkbox" name={options.name} value={options.value} />
                        <span>{options.text}</span>
                    </label>
                </div>
            })
        };
    }
});

export default Checkbox