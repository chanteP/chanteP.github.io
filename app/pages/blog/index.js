import {$} from '../core'
import Drawer from '../../common/ui/drawer'
import css from './frame.scss'

$.register('blog', ($) => {
	var drawer = new Drawer;
    drawer.setContent('<iframe class="blog-drawer" name="blogPage"></iframe>');
    var iframe = $.find('[name=blogPage]', drawer.node);
    iframe.onload = iframe.onerror = function(){
        drawer.node.classList.remove('loading');
    }
    return {
        init(){
        	$.listener(this.node)
        		.on('click', '[data-act="open"]', function(e){
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    iframe.src = href;
                    drawer.node.classList.add('loading');
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