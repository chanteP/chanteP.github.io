import React from '../../react';

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
            cb && cb();
        });
    },
    calcSelected(){
        let cont = React.findDOMNode(this.refs['slider']),
            lis = cont.children;

        let midLine = cont.clientHeight / 2,
            checkLine = midLine + cont.scrollTop;

        [].some.call(lis, (li, index) => {
            let offset = li.offsetTop + li.scrollHeight - checkLine;
            if(offset >= 0){
                this.setCurrent(index);
                return true;
            }
        }) || this.setCurrent(this.props.options.length - 1);
    },

    onTouchstart(){
        this.props.component.tweenAni && this.props.component.tweenAni.stop();
    },
    onScroll(){
        if(this.props.component.noTitle){return;}
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => this.calcSelected(), 1000 / 5);
    },
    onSelect(e){
        if(!this.props.component.noTitle){return;}
        let target = e.currentTarget,
            index = +target.dataset.index;
        this.setCurrent(index, () => {
            this.select();
        });
    },

    hide(){
        this.props.component.hide();
    },
    select(){
        this.props.callback && this.props.callback(this.props.options[this.state.current], this.state.current);
        this.hide();
    },

    render(){
        let current = this.state.current;

        return (
            <div className="m-controls-select clearfix">
                {!this.props.component.noTitle ?
                    <div className="m-controls-select-head">
                        <a className="m-controls-select-cancel" onClick={this.hide}>取消</a>
                        <a className="m-controls-select-submit" onClick={this.select}>选择</a>
                        <h1>{this.props.title}</h1>
                    </div> : 
                    null
                }
                <div className="m-controls-slidercont">
                    <ul className="m-controls-slider" data-node="slider" ref="slider" onTouchstart={this.onTouchstart} onScroll={this.onScroll}>
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
                </div>
            </div>
            );
    }
});

export default function(node, obj){
    return React.render(
        <Select current={obj.current} options={obj.options} callback={obj.callback} title={obj.title} component={obj} />
        , node);
}
