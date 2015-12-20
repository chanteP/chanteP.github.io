/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$, React} from '../../core';

export default function(head, obj){
    var cfg = obj.cfg;
    return React.render(
        <div >
            <h1>{cfg.title}</h1>
            {cfg.textL ? <div data-node="cancel" onClick={cfg.callbackL.bind(obj)}>{cfg.textL}</div> : null}
            {cfg.text ? <div data-node="check" onClick={cfg.callback.bind(obj)}>{cfg.text}</div> : null}
        </div>
        , head);
}