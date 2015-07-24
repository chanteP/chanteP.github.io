"use strict";
import FormComponent from '../Form.jsx';
import {RemovableItem} from './Setting.jsx';
import Select from '../../../../common/components/select';

var {Component} = React;
var select = Select();

export default class UseTime extends FormComponent {
    constructor(props, context) {
        super(props, context);
        this.state = this.getProp('useTime', {});
        this.addTimeRange = this.addTimeRange.bind(this);
    }

    onChange(key, e) {
        var self = this.constructor;
        var state = {};
        state[key] = self.getValueFromEvent(e);
        this.setState(state);
    }
    static getDefaultRange() {
        return {from: 9, to: 21};
    }

    removeTimeRange(i) {
        var timeRanges = this.state.timeRanges || [];
        timeRanges.splice(i, 1);
        this.setState({timeRanges: timeRanges.slice(0)});
    }
    addTimeRange() {
        var timeRanges = this.state.timeRanges;
        if (!timeRanges || !timeRanges.length) timeRanges = [];
        timeRanges.push({from: 9, to: 21});
        this.setState({timeRanges: timeRanges});
    }
    onTimeChange(index, key, data) {
        var self = this.constructor;
        var timeRanges = this.state.timeRanges || [];
        var time = timeRanges[index] = timeRanges[index] || self.getDefaultRange();
        timeRanges[index][key] = data.value;
        if (time.from > time.to) {
            time.to = time.from + 0.25;
        }
        this.setState({timeRanges: timeRanges});
    }

    render() {
        var self = this.constructor;
        var {useTime, timeRanges} = this.state;
        useTime = Number(useTime);
        timeRanges = timeRanges || [];
        if (!timeRanges.length) {
            timeRanges = [self.getDefaultRange()];
        }
        return <div>
            <div className="settings-attachment top-attached">
                选择消费时间
            </div>
            <div className="ui-settings">
                <div className="item">
                    <label className="radio">
                        <input id="J-all" type="radio" className="ui-radio" name="J-useTime-useTime" checked={useTime}
                            onChange={this.onChange.bind(this, 'useTime')} value={1} />
                        <span htmlFor="J-all">24小时可用</span>
                    </label>
                </div>
                <div className="item">
                    <label className="radio">
                        <input id="J-limit" type="radio" className="ui-radio" name="J-useTime-useTime" checked={!useTime}
                               onChange={this.onChange.bind(this, 'useTime')} value={0} />
                        <span htmlFor="J-limit">部分时间可用</span>
                    </label>
                    {!useTime && <div className="ui-settings">
                        {timeRanges.map((time, i) => {
                            time = time || {};
                            return <RemovableItem key={[time.from, time.to, i]} onRemove={this.removeTimeRange.bind(this, i)}>
                                <div className="ui-timepicker">
                                    <TimeInput value={time.from} onChange={this.onTimeChange.bind(this, i, 'from')} />
                                    <TimeInput value={time.to} onChange={this.onTimeChange.bind(this, i, 'to')} />
                                </div>
                            </RemovableItem>
                        })}
                        <div className="item" onClick={this.addTimeRange}>
                            <i className="fa fa-plus-circle"></i>
                            添加
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    }
}

class TimeInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
        this.showSelect = this.showSelect.bind(this);
    }
    showSelect() {
        var self = this,
            cons = this.constructor;

        select.show(cons.getTimeList().map(function(time){
                var [timeText, className] = cons.timeToDisplay(time);
                return {
                    value : time,
                    text : timeText,
                    className : className
                }
            }), cons.timeToDisplay(this.props.value)[0], function(item){
                self.props.onChange(item);
            });
    }
    render() {
        var props = this.props, state = this.state, self = this.constructor;
        var time = props.value;
        var notToday = time >= 24;

        return <div className={"ui-text" + (notToday ? ' label' : '')} data-label="次日">
            <input type="text" readOnly={true} value={self.timeToDisplay(time, true)} onClick={this.showSelect} />
        </div>
    }
    static getTimeList() {
        var a = 0;
        var list = [];
        while (a < 48) {
            list.push(a);
            a = a + 0.25;
        }
        return list;
    }
    static timeToDisplay(fl, textOnly) {
        var notToday = fl >= 24;
        fl = (fl || 0) % 24;
        var h = Math.floor(fl);
        var m = Math.floor((fl - h) * 60);

        var text = (10000 + h * 100 + m).toString().replace(/.*(\d{2})(\d{2})$/, '$1:$2');
        if (textOnly) return text;

        var className = ['time-select'];
        if (m > 0) className.push('not-on-the-hour');
        if (notToday) className.push('not-today');
        return [text, className.join(' ')]
    }
}
