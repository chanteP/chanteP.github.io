/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, Promise, React} from '../../core'

var thumbSize;

export default class PhotoViewCont extends React.Component{
    constructor(){
        super();
        this.state = {
            current : 0
        }
    }
    select(i){
        this.setState({
            current : i >= 0 ? i >= this.props.list.length ? this.props.list.length - 1 : i : 0
        });
    }
    upload(e){
        var obj = this.props.obj,
            config = this.props.config;
        var inputNode = e.currentTarget;
        var files = inputNode.files;
        if(typeof config.onUpload === 'function'){
            config.onUpload.call(obj, files, (item, i) => {
                this.add(item, i);
                inputNode.value = '';
            }, inputNode);
        }
    }
    remove(i){
        var obj = this.props.obj,
            config = this.props.config,
            item = this.props.list[i];
        if(typeof config.onDelete === 'function'){
            config.onDelete.call(obj, item, () => {
                this.delete(i);
            });
        }
        else{
            this.delete(i);
        }
    }
    change(item, i){
        var obj = this.props.obj,
            config = this.props.config;
        if(typeof config.onChange === 'function'){
            config.onChange.call(obj, item, i);
        }
    }
    add(item, i){
        if(this.props.list.length >= this.props.config.max){
            return;
        }
        i = i === undefined ? this.props.list.length : i; 
        this.props.list.splice(i, 0, item);
        this.select(i);
        this.change(item, i);
    }
    delete(i){
        var item = this.props.list[i];
        this.props.list.splice(i, 1);
        this.select(i - 1);
        this.change(item, i);
    }
    setSliderPos(){
        var current = this.state.current;
        var slider = this.refs.listSlider;
        if(slider){
            slider = slider.getDOMNode();
            var unit = slider.children[current];
            if(unit){
                $.scrollTo([unit.offsetLeft], slider);
            }
        }
    }
    checkMainImage(src){
        if(this.src === src){
            this.refs.mainImageCont.getDOMNode().classList.remove('loading');
            this.refs.mainImage.getDOMNode().src = src;
        }
    }
    loadMainImage(){
        var src = this.src;
        if(!src){
            this.refs.mainImage.getDOMNode().src = this.props.config.emptyPhoto;
            this.refs.mainImageCont.getDOMNode().classList.remove('loading');
            return;
        }
        var i = new Image();
        i.onload = this.checkMainImage.bind(this, src);
        i.src = src;
    }
    componentDidUpdate(){
        this.loadMainImage();
        this.setSliderPos();
    }
    componentDidMount(){
        this.loadMainImage();
        this.setSliderPos();
    }
    render(){
        var config = this.props.config;
        var obj = this.props.obj;
        var current = this.state.current;
        var list = this.props.list;

        var mainSrc = this.src = typeof list[current] === 'object' ? list[current][config.property] : list[current];

        return (
            <div>
                {
                    config.showCounter ? 
                        <div className="m-photoview-head">{Math.min(+current+1, list.length) + '/' + list.length}</div> :
                        null
                }
                <div className="m-photoview-cont loading" ref="mainImageCont">
                    <img ref="mainImage" data-src={mainSrc || ''} />
                </div>
                {
                    config.thumbnail ?
                        <div className="m-photoview-list">
                            <ul ref="listSlider">
                                {
                                    list.map((item, i) => {
                                        return (
                                            <li key={i} className={i === current ? 'current' : undefined} onClick={this.select.bind(this, i)}>
                                                <img src={typeof item === 'object' ? item[config.thumbProperty] : item} />
                                                {
                                                    config.deletable ?
                                                    <span className="icon transparent close" onClick={this.remove.bind(this, i)}></span> : 
                                                    null
                                                }
                                            </li>
                                        );
                                    })
                                }
                                {
                                    (config.uploadable && config.onUpload && list.length < config.max) ?
                                        <li className="m-photoview-uploader">
                                            <label className="ti-plus"><input type="file" className="hidden" accept="image/*" onChange={this.upload.bind(this)} /></label>
                                        </li> :
                                        null
                                }
                            </ul>
                        </div> :
                        null
                }
                <div className="m-photoview-close" onClick={obj.hide.bind(obj)}><b className="icon transparent close"></b></div>
            </div>
        );
    }
}