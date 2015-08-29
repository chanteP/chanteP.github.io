import React from '../../react';

var Select = React.createClass({
    getInitialState(){
        return {
            current : this.props.current
            // list : this.props.list
        }
    },
    onSelect(e){
        let target = e.currentTarget;
        this.setState({
            current : +target.dataset.index
        })
    },
    hide(){
        this.props.component.hide();
    },
    select(){
        this.props.callback && this.props.callback(this.props.list[this.state.current], this.state.current);
        this.hide();
    },
    render(){
        let current = this.state.current;

        return (
            <div className="m-controls-select clearfix">
                <div className="m-controls-select-head">
                    <a className="m-controls-select-cancel" onClick={this.hide}>取消</a>
                    <a className="m-controls-select-submit" onClick={this.select}>选择</a>
                    <h1>{this.props.title}</h1>
                </div>
                <ul>
                    {this.props.list.map((item, i) => 
                        (
                            <li key={i} data-index={i} onClick={this.onSelect} className={(item.className || '') + (i === current ? ' current' : '')}>
                                {(typeof item === 'string' || typeof item === 'number') ? item : item.text}
                            </li>
                        )
                    )}
                </ul>
            </div>
            );
    }
});

export default function(node, obj){
    return React.render(
        <Select current={obj.current} list={obj.data} callback={obj.callback} title={obj.title} component={obj} />
        , node);
}