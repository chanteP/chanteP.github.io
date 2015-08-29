import $ from '../../core'

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
        if(this.outer){
            if(value){
                this.outer.setAttribute('data-show', '1');
                this._aniTypes[0] && $.animate(this.outer, this._aniTypes[0]);
            }
            else{
                this.outer.removeAttribute('data-show');
                this._aniTypes[1] && $.animate(this.outer, this._aniTypes[1]);
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
}
