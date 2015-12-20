/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'

var Switch = React.createClass({
    render(){
        return (
            <Xcell {...this.props}>
                <label className={this.props.disabled ? 'form-disabled' : ''}>
                    {this.props.children}
                    <input type="checkbox" onChange={this.props.onChange} className="ui-switch" name={this.props.name} defaultChecked={this.props.on} disabled={this.props.disabled} value={this.props.on ? 'on' : 'off'} /><span></span>
                </label>
            </Xcell>
        );
    }
});

export default Switch