/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'
import SelectSheet from '../ui/select'

var Select = React.createClass({
    getInitialState(){
        return {
            value : this.props.hasOwnProperty('value') ? this.props.options[SelectSheet.findCurrent(this.props.options, this.props.value)] : null
        }
    },
    showSelect(){
        SelectSheet.show(this.props.options, this.state.value ? this.state.value.text : this.state.value).then((item) => {
            this.setState({value : item}, () => {
                this.props.onChange && this.props.onChange(this.state.value);
                $.trigger(this.refs.valueNode.getDOMNode(), 'change');
            });
        });
    },
    render(){
        var value = this.state.value;
        var valueText = value ? (value.text || value) : this.props.placeholder || '无',
            finalValue = value ? (value.value || value) : '';

        return (
            <Xcell text={this.props.text} active {...this.props} className={(this.props.className || '') + " nowrap"} onClick={this.props.disabled ? null : this.showSelect}>
                <label>
                    <div className={"form-cell-input text-ellipsis " + ((this.props.disabled || !value) ? 'form-placeholder' : '')}>{valueText}</div>
                    <input ref="valueNode" type="hidden" name={this.props.name} required={this.props.required} data-rule={this.props.rule} value={finalValue} />
                </label>
            </Xcell>
        );
    }
});

export default Select