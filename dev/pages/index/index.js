import $ from '../core'
$.register('index', ($) => {
    return {
        init(){
            console.log('index init')
        },
        show(){
            console.log('index show')
        },
        hide(){
            console.log('index hide')
        }
    };
});