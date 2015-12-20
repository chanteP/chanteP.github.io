/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {React} from '../../core'

export default (node, obj) => {
    var options = obj.options,
        msg = obj.message;

    var selectOne = function(e){
        var i = e.currentTarget.dataset.index;
        obj.hide();
        if(+i >= 0){
            obj.select(i);
        }
    }
    return React.render(
            <div className="m-actionsheet">
                <ul>
                    {msg ? <li className="m-actionsheet-message">{msg}</li>: null}
                    {
                        options.map((option, i) => {
                            let text = (option && typeof option === 'object') ? option.text : option,
                                style = (option && typeof option === 'object') ? option.style : '';
                            if(typeof text === 'function'){
                                text = text(option, i);
                            }
                            return <li key={i} className={style} data-index={i} onClick={style === 'disabled' ? null : selectOne}><label>{text}</label></li>;
                        })
                    }
                </ul>
                <ul>
                    <li className="cancel" data-index={-1} onClick={selectOne}>取消</li>
                </ul>
            </div>
        , node);
}