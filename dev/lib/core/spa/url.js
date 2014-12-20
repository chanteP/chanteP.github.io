
var state = window.history;
var evtList = [];

var runList = function(dir, url){
    evtList.forEach(function(func){
        func(url, dir);
    });
};
window.addEventListener('popstate', function(){
    runList(-1);
});
module.exports = {
    set : function(url, title, data, real){
        if(url !== location.pathname)
            state.pushState(data, title, url);
        runList(1, url);
    },
    on : function(func){
        evtList.push(func);
    }
};