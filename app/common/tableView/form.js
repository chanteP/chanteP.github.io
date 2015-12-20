/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'

var Form = React.createClass({
    render(){
        return (
            <div {...this.props}>
                {this.props.children}
            </div>
        )
    }
});

export default Form;