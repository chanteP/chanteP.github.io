/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
import ModalView from '../../base/modalView';
import Picker from '../../base/picker';

export default class DatePicker extends ModalView{
    constructor(){
        super({
            title : '',
            text : '选择',
            textL : '取消'
        });
        this.content.classList.add('m-datepicker');
        // this.YScroll = new Picker('<div class="m-datepicker-y"></div>');
        // this.MScroll = new Picker('<div class="m-datepicker-m"></div>');
        // this.DScroll = new Picker('<div class="m-datepicker-d"></div>');
    }
    static show(cfg){
        checkDatePicker().show();
    }
    static hide(){
        checkDatePicker().hide();
    }
}
var commonDatePicker;
var checkDatePicker = () => {
    if(commonDatePicker){
        return commonDatePicker;
    }
    return commonDatePicker = new DatePicker;
}
