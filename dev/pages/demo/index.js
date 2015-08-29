import $ from '../core'
var Drawer = require('../../common/components/drawer'),
    Select = require('../../common/components/select'),
    Mask = require('../../common/components/Mask'),
    MaskTips = require('../../common/components/MaskTips'),
    Dialog = require('../../common/components/dialog');
$.register('demo', ($) => {
    return {
        init(){
            var drawer = new Drawer;
            callDrawer.addEventListener('click', (e) => {
                drawer.setContent('123123123');
                drawer.show();
            });

            // var select = new Select;
            callSelect.addEventListener('click', (e) => {
                Select.show(
                    3, 
                    [1,2,3,5,6,'吃饭吃饭场景非常非常规范郭富城不会 v 个 v ',457,898,90909,8878,676767], 
                    (item, index) => {
                        console.log(item, index)
                    },
                    'fxxk'
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