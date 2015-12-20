/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../../core';
import Toggle from '../../base/toggle';

class NavToggle extends Toggle{
    constructor(){
        super([]);

        this.node = build();
        $.domReady(() => {
            var wrapper = $.find('#wrapper');
            if(wrapper){
                document.body.insertBefore(this.node, wrapper);
            }
            else{
                document.body.appendChild(this.node);
            }
        });
    }
    show({title = '', left = null, right = null} = {}, mode){
        React.render(<Nav left={left} right={right} title={title} />, this.node);
        super.show();
    }
    hide(){
        super.hide();
    }
}

export default new NavToggle

class Nav extends React.Component{
    constructor(props){
        super(props);
        $.listener(document).on('setTitle', () => {
            if(this.refs.title){
                this.refs.title.getDOMNode().innerHTML = document.title;
            }
        });
    }
    checkBtns(){
        if(this.props.left === 'string'){
            this.refs.left.getDOMNode().innserHTML = this.props.left;
        }
        if(this.props.right === 'string'){
            this.refs.right.getDOMNode().innserHTML = this.props.right;
        }
    }
    back(){
        ($.app && $.app.back) ?
            $.app.back() : 
            history.go(-1);
    }
    componentDidUpdate(){
        this.checkBtns();
    }
    render(){
        var left = this.props.left, 
            right = this.props.right;
        var title = this.props.title;
        if(typeof left === 'string'){
            left = undefined;
        }
        else if(!left){
            left = <a className="ti-angle-left" onClick={this.back}></a>;
        }
        if(typeof right === 'string' || !right){right = undefined;}
        if(!title){
            title = document.title;
        }

        return (
            <div>
                <h1 ref="title" className="nav-title">{title}</h1>
                <div ref="left" className="nav-btn nav-btn-left">{left}</div>
                <div ref="right" className="nav-btn nav-btn-right">{right}</div>
            </div>
        );
    }
}



function build(){
    var nav = document.createElement('div');
    nav.className = 'bar-nav';
    return nav;
}