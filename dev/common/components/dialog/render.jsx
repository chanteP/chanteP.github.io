import React from '../../react';

var Dialog = React.createClass({
    getInitialState(){
        return {
            button : this.props.button || [],
            content : this.props.content,
            title : this.props.title
        }
    },
    btnClick(e){
        var id = e.currentTarget.dataset.diabtnid;
        var func = this.props.button[id].callback;
        //TODO
        func && func.call(this.props.component, this.props.component, e.currentTarget);
    },
    render(){
        var buttons = this.props.button || [];
        var btnStyle = {
            width : 100 / buttons.length + '%' 
        };

        return (
            <div className="midcont">
                <div className="dia-wrap">
                    <div style={{display : this.props.title ? '' : 'none'}}>
                        <h1 className="dia-head">{this.props.title}</h1>
                    </div>
                    <div className="dia-content">
                        <div className="dia-contwrap">
                            {this.props.content}
                        </div>
                    </div>
                    <div className="dia-btnbox">
                        {
                            buttons.map((btn, i) => {
                                return (
                                    <div key={i} className={"dia-btn " + btn.style} style={btnStyle}>
                                        <a data-diabtnid={i} onClick={this.btnClick}>
                                            {btn.text}
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = function(node, obj){
    React.render(
        <Dialog button={obj.button} title={obj.title} content={obj.content} component={obj} />
    , node);
}