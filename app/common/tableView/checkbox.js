/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'

var Checkbox = React.createClass({
    render(){
        return (
            <Xcell {...this.props}>
                <label>
                    <input type="checkbox" onChange={this.props.onChange} required={this.props.required} className="ui-checkbox" name={this.props.name} defaultChecked={this.props.checked} disabled={this.props.disabled} value={this.props.value} />
                    <span>{this.props.children}</span>
                </label>
            </Xcell>
        );
    }
});

export default Checkbox