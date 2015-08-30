import $ from '../core'
import Drawer from '../../common/components/drawer'

$.register('blog', ($) => {
	var drawer = new Drawer;
	drawer.setContent('<iframe class="blog-drawer" name="blogPage"></iframe>');
    return {
        init(){
        	$.evt(this.node)
        		.on('click', '[data-act="open"]', function(e){
        			drawer.show({
        				href : this.getAttribute('href')
        			});
        		});
        },
        show(){
        },
        hide(){
        }
    };
});