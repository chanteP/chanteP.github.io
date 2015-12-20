/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'

var Input = React.createClass({
    render(){
        return (
            <Xcell text={this.props.text} active={this.props.active} {...this.props}>
                <label>
                    <input className={"form-cell-input "} placeholder={this.props.placeholder} required={this.props.required} data-rule={this.props.rule} defaultValue={this.props.value} name={this.props.name} readOnly={this.props.readOnly} disabled={this.props.disabled} />
                    {this.props.icon ? <span className={"mark " + this.props.icon}></span> : null}
                </label>
            </Xcell>
        );
    }
});

export default Input