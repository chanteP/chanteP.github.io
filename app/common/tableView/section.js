/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'

var Section = React.createClass({
    render(){
        return (
            <div className="form-section">
                {
                    typeof this.props.header === 'string' ? 
                        <div className="form-section-header">{this.props.header}</div> : 
                        null
                }
                {this.props.children}
                {
                    typeof this.props.footer === 'string' ? 
                        <div className="form-section-footer">{this.props.footer}</div> : 
                        null
                }
            </div>
        )
    }
});

export default Section