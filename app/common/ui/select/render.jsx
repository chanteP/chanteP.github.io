/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../../core';

var Select = React.createClass({
    getInitialState(){
        return {
            current : null
        }
    },
    setCurrent(index, cb){
        this.setState({
            current : index
        }, () => {
            this.props.component.scrollEffect && this.props.component.scrollEffect(React.findDOMNode(this.refs['slider']), index);
            
            let slider = React.findDOMNode(this.refs['slider']);
            let target = $.find('[data-index="'+index+'"]', slider) || $.find('[data-index="0"]', slider);
            setTimeout(() => {
                if(target){
                    $.scrollTo(target.offsetTop + target.clientHeight / 2 - slider.clientHeight / 2, slider);
                }
            }, 0);
        
            cb && cb();
        });
    },

    onSelect(e){
        let target = e.currentTarget,
            index = +target.dataset.index;
        this.setCurrent(index, () => {
            this.props.component.select && this.props.component.select(this.state.current);
        });
    },

    hide(){
        this.props.component.hide();
    },

    render(){
        let current = this.state.current;
        let config = this.props.config;

        return (
            <div className="m-controls-select clearfix">
                <div className="m-select-slidercont">
                    <ul className={"m-select-slider " + (config.middle ? 'middle' : '')} data-node="slider" ref="slider">
                        {this.props.options.map((item, i) => {
                            let option = (typeof item === 'string' || typeof item === 'number') ?
                                {text:item}:
                                item;
                            return (
                                <li key={i} data-index={i} onClick={this.onSelect} className={(option.className || '') + (i === current ? ' current' : '')}>
                                    {option.text}
                                </li>
                            )
                        })}
                    </ul>
                    <ul className="m-select-funcbar">
                        <li onClick={config.onCancel || this.hide} className={(config.cancelStyle || '') + " cancel"}>{config.cancelText || '取消'}</li>
                    </ul>
                </div>
            </div>
            );
    }
});

export default function(node, obj){
    return React.render(
        <Select current={obj.current} options={obj.options} component={obj} config={obj.cfg || {}} />
        , node);
}
