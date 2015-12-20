/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {React} from '../../core';

export default function(node, obj){
    return React.render(
        (
            <div className="">
                <div className="m-masktips-icon">
                {
                    ((icon) => {
                        switch(icon){
                            case 'loading':
                                return <span className="ti-reload"></span>;
                            case 'succ':
                                return <span className="ti-face-smile"></span>
                            case 'error':
                                return <span className="ti-face-sad"></span>
                            default:
                                return <span className={"ti-" + icon}></span>
                        }
                    })(obj.icon)
                }
                </div>
                <div className="m-masktips-text">{obj.text}</div>
            </div>
        )        
        , node);
}