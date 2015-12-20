/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
import css from './style.scss';
import Control from '../../base/control';


export default class Mask extends Control{
    constructor(zIndex = 50){
        super('middle', false);
        this.zIndex = zIndex;
        this.zIndex = zIndex;
    }
    show(zIndex = 50, touchable){
        touchable !== undefined && (this.touchable = touchable);
        super.show();
    }
    hide(){
        super.hide();
    }
    static show(zIndex, ...args){
        checkCommonMask(zIndex).show(zIndex, args);
    }
    static hide(zIndex){
        checkCommonMask(zIndex).hide();
    }
}

var commonMask;
var checkCommonMask = function(zIndex){
    if(commonMask){
        return commonMask;
    }
    return commonMask = new Mask(zIndex);
}
