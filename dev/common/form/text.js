import $ from './core'
import React from '../react'

var Text = React.createClass({
	render(){
		return (
			<div class="form-line">
                <div class="form-line-head"><span>{this.state.head}</span></div>
                <div class="form-line-content">
                    <input placeholder={this.props.placeholder} value={this.state.value} />
                </div>
            </div>
		);
	}
});

export default Text