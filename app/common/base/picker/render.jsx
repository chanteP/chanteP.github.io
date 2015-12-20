/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../../core';

var Picker = React.createClass({
    calcSelected(){
        var slider = this.refs.slider.getDOMNode(),
            lis = slider.children;

        let midLine = slider.clientHeight / 2,
            checkLine = midLine + slider.scrollTop;

        [].some.call(lis, (li, index) => {
            let offset = li.offsetTop + li.scrollHeight - checkLine;
            if(offset >= 0){
                this.setCurrent(index);
                return true;
            }
        }) || this.setCurrent(this.props.component.options.length - 1);
    },
    onScroll(e){
        var slider = this.refs.slider.getDOMNode();
        this.lastOffset = slider.scrollTop;
        // console.log('all', this.lastOffset);
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => {
            // console.log('end', !$.isTouched && slider.scrollTop === this.lastOffset);
            !$.isTouched && slider.scrollTop === this.lastOffset && this.calcSelected();
        }, 300);
    },
    setCurrent(index, force){
        force && this.forceUpdate();
        var slider = this.refs.slider.getDOMNode();
        var target = $.find('[data-index="'+index+'"]', slider) || $.find('[data-index="0"]', slider);
        if(!target){return;}
        this.props.component.current = index;
        if(this.scrollAni){
            this.scrollAni.stop();
        }
        this.scrollAni = $.scrollTo(target.offsetTop + target.clientHeight / 2 - slider.clientHeight / 2, slider);
        // $.trigger(this.props.component, 'change', [index]);
    },
    componentDidMount(){
        var slider = this.refs.slider.getDOMNode();
        slider.addEventListener('scroll', this.onScroll);
        slider.addEventListener('touchend', this.onScroll);
        this.setCurrent(this.props.current);
    },
    render(){
        var options = Array.isArray(this.props.component.options) ? this.props.component.options : [];
        // var currentObj = options[current];
        return (
            <div className="picker-slider">
                <ul ref="slider">
                    {options.map((option, i) => {
                        let type = option && typeof option === 'object';
                        let text = type ? option.text : option;
                        let style = type ? option.style : '';
                        return <li key={i} data-index={i} data-text={text} className={style}>{text}</li>
                    })}
                </ul>
            </div>
        );
    }
})

export default (node, obj) => {
    return React.render(
        <Picker current={obj.current} component={obj} />
        , node);
}