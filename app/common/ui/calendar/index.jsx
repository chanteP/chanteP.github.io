/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, Promise, React} from '../../core'
import css from './style.scss'
import ModalView from '../../base/modalView'
import calendarCalc from '../../utils/calendarCalc'

var defaultCfg = {
    title : '',
    text : '确定',
    // showOutside : true,
    weekdayList : ['日', '一', '二', '三', '四', '五', '六'],
    max : 1,
    // showCurrent : true,
    value : [],
    //[[before, after], date]
    disableDays : null,

    callback : function(){
        this.res(this.getValue());
        this.hide();
    }
}
var foreverDay = calendarCalc.getInfo('2200-10-1').id,
    originDay = calendarCalc.getInfo('1900-10-1').id;
var fixLimitArr = (arr, current) => {
    if(!Array.isArray(arr)){return null;}
    return arr.map((duration) => {
        if(Array.isArray(duration)){
            return [
                duration[0] ? calendarCalc.getInfo(duration[0]).id : originDay,
                duration[1] ? calendarCalc.getInfo(duration[1]).id : foreverDay];
        }
        else{
            var id = calendarCalc.getInfo(duration[0]).id;
            return [id, id];
        }
    });
}
var emptyFunc = function(){};

export default class Calendar extends ModalView{
    constructor(cfg, ...args){
        super($.merge(defaultCfg, cfg), ...args);

        this.content.classList.add('m-calendar');
    }
    checkEnable(info){
        var id = info.id;
        if(!this.disableDays || !this.disableDays.length){
            return true;
        }
        return !this.disableDays.some((duration) => {
            return id >= duration[0] && id <= duration[1];
        });
    }
    getValue(){
        return this.cfg.max === 1 ? this.value[0] : this.value;
    }
    select(value, selected){
        if(this.cfg.max === 1){
            this.value[0] = value;
        }else{
            !selected && this.value.push(value);
        }
        this.render(value);
    }
    render(dateString){
        var data = calendarCalc(dateString);
        React.render(
            <div>
                <div className="calendar-title">
                    <i className="icon transparent ti-angle-left icon-prev" onClick={this.render.bind(this, data.currentDate.year + '-' + (data.currentDate.month))}></i>
                    <i className="icon transparent ti-angle-right icon-next" onClick={this.render.bind(this, data.currentDate.year + '-' + (data.currentDate.month + 2))}></i>
                    {data.currentDate.year + '-' + (data.currentDate.month + 1)}
                </div>
                <div className="list-weekday">
                    <ul>
                        {this.cfg.weekdayList.map((day, i) => {
                            return <li key={i}><em>{day}</em></li>;
                        })}
                    </ul>
                </div>
                <div className="list-date">
                    <div className="calendar-background">{data.currentDate.month + 1}</div>
                    <ul>
                        {data.map((info, i) => {
                            var selected = this.value.indexOf(info.dateString) >= 0;
                            var enable = this.checkEnable(info);
                            return <li 
                                key={info.id} 
                                data-enable={enable || undefined} 
                                data-day={info.day}
                                data-year={info.year}
                                data-month={info.month}
                                data-date={info.date}
                                data-timestamp={info.timestamp}
                                className={[
                                    (data.currentDate.month === info.month ? 'cur-month' : ''),
                                    (selected ? 'selected' : '')
                                ].join(' ')}
                                onClick={enable ? this.select.bind(this, info.dateString, selected) : emptyFunc}
                                ><em>{info.date}</em></li>
                        })}
                    </ul>
                </div>
            </div>
            , this.content);
    }

    show(current, cfg, clean){
        clean && (this.cfg = defaultCfg);
        current = current || new Date();
        super.config(cfg || {});

        this.value = [].concat(this.cfg.value);
        this.disableDays = fixLimitArr(this.cfg.disableDays, current);
        this.render(current);
        super.show();
        return this.promise = new Promise((res) => {
            this.res = res;
        });
    }
    hide(){
        super.hide();
    }
    static show(...args){
        return checkCalendar().show(...args);
    }
    static hide(...args){
        return checkCalendar().hide(...args);
    }
}
var commonCalendar;
var checkCalendar = () => {
    if(commonCalendar){
        return commonCalendar;
    }
    return commonCalendar = new Calendar;
}
