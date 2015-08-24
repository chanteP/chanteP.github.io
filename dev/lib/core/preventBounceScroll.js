var startPos, curPos;
var notPreventScrollElement = function(element){
    return isExtraElement(element) || isScrollElement(element);
}
//其他不爽的element
var isExtraElement = function(element){
    switch(true){
        case element.tagName === 'INPUT' && element.type === 'range':;
            return true;
        default :
            return false;
    }
}
//能滚的element
var isScrollElement = function(element) {
    while(element) {
        if (checkScrollElement(element)){
            return element;
        }
        element = element.parentElement;
    }
    return false;
}
var checkScrollElement = function(element){
    //任性
    return (window.getComputedStyle(element)['overflow'] === 'auto' || window.getComputedStyle(element)['overflow'] === 'scroll')
        && element.scrollHeight > element.clientHeight
        && !(startPos <= curPos && element.scrollTop === 0)
        && !(startPos >= curPos && element.scrollHeight - element.scrollTop === window.parseInt(window.getComputedStyle(element).height));
        // && element.scrollHeight > element.offsetHeight;
}

//bind
var bindFunc = {
    move : function(e) {
        curPos = e.touches ? e.touches[0].screenY : e.screenY;
        notPreventScrollElement(e.target) || e.preventDefault();
    },
    start : function(e){
        startPos = e.touches ? e.touches[0].screenY : e.screenY;
    }
}
module.exports = {
    bind : function(){
        document.addEventListener('touchmove', bindFunc.move, false);
        document.addEventListener('touchstart', bindFunc.start, false);
    },
    destory : function(){
        document.removeEventListener('touchmove', bindFunc.move, false);
        document.removeEventListener('touchstart', bindFunc.start, false);
    }
}
