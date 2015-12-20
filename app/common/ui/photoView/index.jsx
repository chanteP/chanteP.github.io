/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    唯一
*/
import {$, Promise, React} from '../../core'
import Toggle from '../../base/toggle'
import css from './style.scss'
import PhotoViewCont from './photoViewCont'

var template = [
    '<div class="m-photoview fullscreen">',
    '</div>'
].join('');
var defauleConfig = {
    property : 'src' //如果元素是对象时取的地址属性
    ,thumbProperty : 'src' //如果元素是对象时取的缩略图地址属性
    ,thumbnail : false //下面一列缩略图
    ,showCounter : false //顶部计数
    ,emptyPhoto : '' //无图片时的holder
    ,uploadable : false //上传按钮
    ,deletable : false //删除按钮
    ,max : 999 //最大展示数量、上传最大数量控制
    ,onUpload : null //inputchange时，参数file
    ,onDelete : null //delete时处理，参数
    ,onChange : null //列表改变时触发
};

export default class PhotoView extends Toggle{
    constructor(...args){
        super(['fadeIn', 'fadeOut']);

        this.outer = $.create(template);
        this.node = this.outer;
        window.document.body.appendChild(this.outer);

        this.res = null;
        this.config = null;
    }
    show(list, currentIndex, cfg){
        if(!Array.isArray(list)){return;}
        if(typeof currentIndex !== 'number'){
            cfg = currentIndex;
            currentIndex = 0;
        }
        this.config = $.merge(defauleConfig, cfg);

        React.render(<PhotoViewCont list={list} current={currentIndex} config={this.config} obj={this} />, this.node);
        this.componentsApi.push(this);
        super.show();
        $.trigger(this, 'show');
        return new Promise((res) => {this.res = res;});
    }
    hide(){
        this.componentsApi.remove(this);
        super.hide();
        $.trigger(this, 'hide');
        this.res();
        this.res = null;
    }
    static show(...args){
        return checkCommonPhotoView().show(...args);
    }
    static hide(){
        return checkCommonPhotoView().hide();
    }
}
var commonPhotoView;
var checkCommonPhotoView = () => {
    if(commonPhotoView){
        return commonPhotoView;
    }
    else{
        return commonPhotoView = new PhotoView;
    }
};