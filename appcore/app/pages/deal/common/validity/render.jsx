"use strict";
import FormComponent from '../Form.jsx';
import Select from '../../../../common/components/select';
var {Component} = React;
var select = Select();

export default class Validity extends FormComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            monthCount: this.getProp('monthCount', 12),
            useDay: this.getProp('useDay', {useDay: false}),
            renewal: this.getProp('renewal', true)
        };
        this.showMonthSelect = this.showMonthSelect.bind(this);
    }
    onChange(key, e) {
        var self = this.constructor;
        var state = {};
        state[key] = self.getValueFromEvent(e);
        this.setState(state);
    }
    showMonthSelect() {
        var self = this;

        select.show([1,2,3,4,5,6,7,8,9,10,11,12].map(function(month){
                return {
                    value : month,
                    text : month + '个月'
                };
            }), this.state.monthCount + '个月', function(item){
                self.onChange.call(self, 'monthCount', item);
            });
    }
    render() {
        var state = this.state;
        return (
            <div>
                <div className="settings-attachment top-attached">
                    选择有效期
                </div>
                <div className="ui-settings">
                    <div className="form-item text tips-select" onClick={this.showMonthSelect}>
                        <div className="form-item-title">
                            自上线后
                        </div>
                        <div className="form-item-content selectable">
                            <div>{state.monthCount} 个月</div>
                        </div>
                    </div>
                </div>
                <DateUnavailable value={state.useDay} onChange={this.onChange.bind(this, 'useDay')} />
                <div className="ui-settings">
                    <div className="form-item switch">
                        <div className="form-item-title">支持自动延期</div>
                        <div className="form-item-content">
                            <label>
                                <input id="autoContinue" type="checkbox" checked={state.renewal} onChange={this.onChange.bind(this, 'renewal')} />
                                <span className="ui-switch"></span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class DateUnavailable extends FormComponent {
    constructor(props, context) {
        super(props, context);
    }
    onChange(key, e) {
        var self = this.constructor;
        var value = this.props.value || {};
        if(key === 'useDay'){
            value[key] = !+self.getValueFromEvent(e);
        }
        else{
            value[key] = +self.getValueFromEvent(e);
        }
        (this.props.onChange || function() {})({value: value});
    }
    render() {
        var value = this.props.value || {};
        var showDays = !+value.useDay;
        return (
            <div>
                <div className="form-item switch">
                    <div className="form-item-title">不可用日期</div>
                    <div className="form-item-content">
                        <label>
                            <input id="limitDate" type="checkbox" checked={showDays} onChange={this.onChange.bind(this, 'useDay')} />
                            <span className="ui-switch"></span>
                        </label>
                    </div>
                </div>
                {showDays &&

                <div className="form-item checkbox">
                    <div className="form-item-content">
                        <span>
                            <label>
                                <input id="weekendLimit" className="ui-checkbox" type="checkbox" checked={value.weekend} onChange={this.onChange.bind(this, 'weekend')}  />
                                <span>周六日不可用</span>
                            </label>
                            <label>
                                <input id="holidayLimit" className="ui-checkbox" type="checkbox" checked={value.holiday} onChange={this.onChange.bind(this, 'holiday')}  />
                                <span>节假日不可用</span>
                            </label>
                        </span>
                    </div>
                </div>
                }

            </div>
        )
    }
}
