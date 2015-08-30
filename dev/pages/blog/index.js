import $ from '../core'
import Drawer from '../../common/components/drawer'
import css from './frame.scss'

$.insertStyle(css);

$.register('blog', ($) => {
	var drawer = new Drawer;
	drawer.setContent('<iframe class="blog-drawer" name="blogPage"></iframe>');
    return {
        init(){
        	$.evt(this.node)
        		.on('click', '[data-act="open"]', function(e){
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    $.find('[name=blogPage]', drawer.node).src = href;
        			drawer.show({
        				href : href
        			});
        		});
        },
        show(){
        },
        hide(){
        }
    };
});