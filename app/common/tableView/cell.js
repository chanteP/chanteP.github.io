/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../core'

var Cell = React.createClass({
    render(){
        return (
            <div className={["form-cell ",this.props.active ? "active" : '',this.props.className || ''].join(' ')} onClick={this.props.onClick}>
                {
                    this.props.text ? 
                        <div className="form-cell-text" style={{width:this.props.width}}><span>{this.props.text}</span></div> : 
                        null
                }
                <div className="form-cell-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

export default Cell