import $ from '../core'
import Drawer from '../../common/components/drawer'

var pages = {
	controls : require('./controls.jsx'),
	icon : require('./icon.jsx'),
	plugins : require('./plugins.jsx'),
	forms : require('./forms.jsx')
}

$.register('demo', ($) => {
    return {
        init(){
        	$.listener(this.node)
        		.on('click', '[data-act="page"]', function(){
        			var forPage = this.dataset.for;
        			var drawer;
        			if(pages[forPage] instanceof Drawer){
        			}
        			else{
        				drawer = new Drawer();
        				pages[forPage](drawer.node);
        				pages[forPage] = drawer;
        			}
    				pages[forPage].show();
        		});
        },
        show(){
        },
        hide(){
        }
    };
});