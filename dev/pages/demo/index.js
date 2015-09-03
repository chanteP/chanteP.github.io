import $ from '../core'
import Drawer from '../../common/components/drawer'
import Select from '../../common/components/select'
import Mask from '../../common/components/Mask'
import MaskTips from '../../common/components/MaskTips'
import Dialog from '../../common/components/dialog'

$.register('demo', ($) => {
    return {
        init(){
            var drawer = new Drawer;
            callDrawer.addEventListener('click', (e) => {
                drawer.setContent('123123123');
                drawer.show();
            });

            var options = [], num = 20;
            while(num){
                options.unshift(num--);
            }
            // var select = new Select;
            callSelect.addEventListener('click', (e) => {
                Select.show(
                    3, 
                    options,
                    (item, index) => {
                        console.log('haha', item, index)
                    },
                    'fxxk'
                );
            });
            callSelectNoTitle.addEventListener('click', (e) => {
                Select.show(
                    3, 
                    options,
                    (item, index) => {
                        console.log('hehe', item, index)
                    },
                    null
                );
            });
            // var select = new Select;
            callMask.addEventListener('click', (e) => {
                Mask.show(50);
                setTimeout(()=>{
                    Mask.hide();
                }, 1200)
            });

            // var select = new Select;
            callDialog.addEventListener('click', (e) => {
                Dialog.show({
                    title : '什么鬼',
                    content : '什么鬼'
                }, true);
            });

            // var select = new Select;
            callMaskTips.addEventListener('click', (e) => {
                MaskTips.show({
                    icon : 'loading',
                    text : '什么鬼'
                }, true);
            });
        },
        show(){
        },
        hide(){
        }
    };
});