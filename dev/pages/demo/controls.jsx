export default (node) => {
    React.render(
    <div>
        <label><input type="checkbox" className="ui-checkbox" name="checkbox" /><span>checkbox</span></label>
        <label><input type="checkbox" className="ui-checkbox" name="checkbox" checked="checked" /><span>checkbox</span></label>
        <label><input type="checkbox" className="ui-checkbox" disabled="disabled" /><span>checkbox</span></label>
        <label><input type="checkbox" className="ui-checkbox" disabled="disabled" checked="checked" /><span>checkbox</span></label>

        <hr className="claerfix" />

        <label><input type="radio" className="ui-radio" name="check" /><span>radio</span></label>
        <label><input type="radio" className="ui-radio" name="check" checked="checked" /><span>radio</span></label>
        <label><input type="radio" className="ui-radio" disabled="disabled" /><span>radio</span></label>
        <label><input type="radio" className="ui-radio" disabled="disabled" checked="checked" /><span>radio</span></label>

        <hr className="claerfix" />

        <label><input type="checkbox" className="ui-switch" /><span></span>switch</label>
    </div>
    , node);
}