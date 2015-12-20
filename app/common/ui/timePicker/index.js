/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, Promise} from '../../core'
import css from './style.scss'
import ModalView from '../../base/modalView'
import Picker from '../../base/picker'

var buildScroll = (num, fix) => {
    var i = 0, arr = [];
    while(i++ < num){
        arr.push(fix ? fix(i) : i);
    }
    return arr;
}

var zeroPad = function(i){
    if(i < 10){
        i = '0' + i;
    }
    return i + '';
}
var HHScroll = buildScroll(23, zeroPad),
    hhScroll = buildScroll(24, function(i){
        i = i - 1;
        return (i <= 12 ? '上午' : '下午') + (i <= 12 ? i : i - 12);
    }),
    mmScroll = buildScroll(59, zeroPad),
    ssScroll = buildScroll(59, zeroPad);

export default class TimePicker extends ModalView{
    constructor(cfg, ...args){
        super($.merge({
            text : '选择',
            callback : () => {
                this.hide();
            }
        }, cfg), ...args);

        this.node.classList.add('m-timepicker');
        this.content.classList.add('m-timepicker-content');
        this.content.classList.add('m-picker-background');
        this.content.classList.add('m-picker-marker');

        this.pickers = {
            HH : new Picker(HHScroll),
            hh : new Picker(hhScroll),
            mm : new Picker(mmScroll),
            ss : new Picker(ssScroll)
        }
    };

    getValue(){
        return this.formatList.map((mark) => {
            return this.pickers[mark].getValue();
        }).join(':');
    }

    format(currentTimeString = '09:00:00', type = 'HH:mm:ss'){
        this.formatList = type.split(':');
        this.content.innerHTML = '';

        var valueArr = currentTimeString.split(':');

        this.formatList = this.formatList.filter((mark, i) => {
            if(this.pickers[mark]){
                this.content.appendChild(this.pickers[mark].node);
                this.pickers[mark].setCurrent(this.pickers[mark].find(valueArr[i]));
                return true;
            }
            return false;
        });
        this.formatStr = this.node.dataset.format = this.formatList.join(':');
    }

    /* 24:00 */
    show(currentTimeString, format = 'HH:mm:ss', title = ''){
        this.format(currentTimeString, format);

        super.config({
            title : title,
            callback : () => {
                this.res(this.getValue());
                this.hide();
            }
        });

        super.show();
        return this.promise = new Promise((res) => {
            this.res = res;
        })
    };
    hide(){
        return super.hide();
    };
    static show(...args){
        return checkSelect().show(...args);
    }
    static hide(...args){
        return checkSelect().hide(...args);
    }
}
var commonTimePicker;
var checkSelect = () => {
    if(commonTimePicker){
        return commonTimePicker;
    }
    return commonTimePicker = new TimePicker;
}
