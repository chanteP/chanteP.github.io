import React from '../../react';

var Select = React.createClass({
    getInitialState(){
        return {
            current : this.props.current,
            options : this.props.options,
            title : this.props.title
        }
    },
    componentDidMount(){
        this.setCurrent(this.props.current);
    },
    setCurrent(index, cb){
        this.setState({
            current : index
        }, () => {
            cb && cb();
            if(this.props.component.scrollEffect){
                this.props.component.scrollEffect(index);
            }
        });
    },
    onTouchstart(){
        this.props.component.tweenAni && this.props.component.tweenAni.stop();
    },
    onScroll(){
        if(this.noTitle){return;}
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(() => this.props.component.calcSelected(), 1000 / 5);
    },
    onSelect(e){
        let target = e.currentTarget,
            index = +target.dataset.index;
        this.setCurrent(index, () => {
            if(!this.props.component.noTitle){
                this.select();
            }
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
                    <ul className="m-controls-slider" data-node="slider" onTouchstart={this.onTouchstart} onScroll={this.onScroll}>
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