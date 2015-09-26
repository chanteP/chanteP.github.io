export default (node) => {
    React.render(
        <div>

            <div className="form-cont">
                <div className="form-group">
                    <div className="form-group-title">测试title</div>
                    <div className="form-line">
                        <div className="form-line-head"><span>什么鬼</span></div>
                        <div className="form-line-content">
                            <input placeholder="哈哈哈哈哈哈" />
                        </div>
                    </div>
                    <div className="form-line">
                        <label className="form-line-content">
                            什么鬼<input type="checkbox" className="ui-switch" /><span></span>
                        </label>
                    </div>
                    <div className="form-line tips">
                        <div className="form-line-content">
                            Tips
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-group-title">321</div>
                    <div className="form-line">
                        <label className="form-line-content">
                            <input type="radio" className="ui-radio" name="a1" />
                            <span>喵了个咪</span>
                        </label>
                    </div>
                    <div className="form-line">
                        <label className="form-line-content">
                            <input type="radio" className="ui-radio" name="a1" />
                            <span>喵了<input className="form-input-mark" size="3" />个咪</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-line">
                        <label className="form-line-content">
                            <input type="checkbox" className="ui-checkbox" name="a1" />
                            <span>喵了个咪</span>
                        </label>
                    </div>
                    <div className="form-line">
                        <label className="form-line-content">
                            <input type="checkbox" className="ui-checkbox" name="a1" />
                            <span>喵了<input className="form-input-mark" size="3" />个咪</span>
                        </label>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-group-title">321</div>
                    <div className="form-line">
                        <textarea placeholder="喵喵喵喵喵喵喵"></textarea>
                    </div>
                </div>
            </div>
        </div>
    , node);
}