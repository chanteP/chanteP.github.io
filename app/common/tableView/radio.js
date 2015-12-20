/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'

var Radio = React.createClass({
    render(){
        return (
            <Xcell {...this.props}>
                <label>
                    <input type="radio" className="ui-radio" onChange={this.props.onChange} name={this.props.name} required={this.props.required} defaultChecked={this.props.checked} disabled={this.props.disabled} value={this.props.value} />
                    <span>{this.props.children}</span>
                </label>
            </Xcell>
        );
    }
});

export default Radio