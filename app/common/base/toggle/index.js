/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core'

var componentsApi = {};
var emptyFunc = function(){};
componentsApi.push = componentsApi.remove = componentsApi.pop = emptyFunc;

export default class toggleBase{
    constructor(aniTypes = []){
        this._isShown = false;
        this._aniTypes = aniTypes;
    }

    get isShown(){
        return this._isShown;
    };
    set isShown(value){
        if(!!this._isShown === !!value){
            return this._isShown;
        }
        this.outer = this.outer || this.node;
        if(this.outer){
            if(value){
                // setTimeout(() => {
                    this.outer.setAttribute('data-show', '1');
                    typeof this._aniTypes[0] === 'string' ? 
                        this.animate(this.outer, this._aniTypes[0]) : 
                        (this.outer.style.display = 'block');
                // }, 0);
            }
            else{
                // setTimeout(() => {
                    this.outer.removeAttribute('data-show');
                    typeof this._aniTypes[1] === 'string' ?
                        this.animate(this.outer, this._aniTypes[1]) : 
                        (this.outer.style.display = 'none');
                // }, 0);
            }
        }
        return this._isShown = !!value;
    };

    show(check){
        if(check && this.isShown){
            return false;
        }
        this.isShown = true;
        return true;
    }
    hide(check){
        if(check && !this.isShown){
            return false;
        }
        this.isShown = false;
        return true;
    }
    destory(){
        if(this.outer && this.outer.parentNode){
            this.outer.parentNode.removeChild(this.outer);
        }
    }
}
toggleBase.prototype.componentsApi = $.components || componentsApi;
toggleBase.prototype.animate = $.animate || function(node, type, cb){
    setTimeout(cb, 0);
};

