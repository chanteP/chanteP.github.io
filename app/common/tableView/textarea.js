/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'
import Xcell from './cell'

var Textarea = React.createClass({
    render(){
        return (
            <Xcell {...this.props}>
                <textarea className="form-cell-input" placeholder={this.props.placeholder} defaultValue={this.props.value} name={this.props.name} disabled={this.props.disabled} />
            </Xcell>
        );
    }
});

export default Textarea