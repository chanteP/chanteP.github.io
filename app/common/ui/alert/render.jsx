/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {React} from '../../core';

var Dialog = React.createClass({
    btnClick(e){
        var id = e.currentTarget.dataset.diabtnid;
        var func = this.props.button[id].callback;
        //TODO
        func && func.call(this.props.component, this.props.component, e.currentTarget);
    },
    setContent(content){
        var contentNode = this.refs.content.getDOMNode();
        if(typeof content === 'string'){
            contentNode.innerHTML = content;
        }
        else if(content && content.nodeType){
            contentNode.innerHTML = '';
            contentNode.appendChild(content);
        }
    },
    componentDidUpdate(){
        if(typeof this.props.content !== 'string'){
            this.setContent(this.props.content);
        }
    },
    render(){
        var buttons = this.props.button || [];
        var btnStyle = {
            width : 100 / buttons.length + '%' 
        };
        var type = this.props.type;
        switch(type){
            case 'succ' : type = 'check';break;
            case 'error' : type = 'error close';break;
            case 'info' : type = 'info ti-info';break;
            case 'warn' : type = 'warn ti-bolt-alt';break;
        }

        return (
            <div className="midcont">
                <div className="dia-wrap">
                    <div style={{display : this.props.title ? '' : 'none'}}>
                        <h1 className="dia-head">{this.props.title}</h1>
                    </div>
                    <div className="dia-content" ref="content">
                        <div className="dia-contwrap">
                            {
                                type ? 
                                    <i className={"icon " + type}></i> : 
                                    null
                            }
                            {typeof this.props.content === 'string' ? this.props.content : null}
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
    return React.render(
        <Dialog button={obj.button} title={obj.title} content={obj.content} component={obj} />
    , node);
}