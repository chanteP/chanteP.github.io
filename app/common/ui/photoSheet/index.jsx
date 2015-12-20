/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    show : 
*/
import {$, Promise} from '../../core'
import ActionSheet from '../actionSheet'

export default class photoSheet{
    constructor(...args){

    }

    static show(multiple, options, ...args){
        return new Promise((res) => {
            var select = function(e){
                var input = e.currentTarget;
                var files = input.files;
                if(!multiple){
                    files = [files[0]];
                }
                res(files);
                input.value = '';
            }
            options = options || [
                {
                    text : () => {
                        return <span>拍照<input type="file" device="camera" capture accept="image/*" className="hide" defaultValue="" onChange={select} /></span>;
                    },
                    value : 1
                },
                {
                    text : () => {
                        return <span>从相册选择<input type="file" multiple maxLength="1" size="1" accept="image/*" className="hide" defaultValue="" onChange={select} /></span>;
                    },
                    value : 0
                }
            ]
            ActionSheet.show(options, ...args);
        });
    }
    static hide(...args){
        return ActionSheet.hide(...args);
    }
}