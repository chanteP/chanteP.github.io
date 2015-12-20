/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
import {$} from '../../core';
var PushPage = require('../../base/pushPage');


export default class Drawer extends PushPage{
	constructor(...args){
		super(...args);
		$.listener(this.outer).on('click', '[data-act="closeDwarer"]', () => {
			this.hide();
		});
	}
}