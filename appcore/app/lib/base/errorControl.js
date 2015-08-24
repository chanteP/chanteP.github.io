module.exports = function(bool){
    if(!bool){return;}
    window.onerror = function(e, filename, lineNo){
        if(window.location.search.indexOf('debug') < 0){return;}
        debugger
        alert(e + '\n' + filename + '\n' + lineNo)
        console.log(e);
    }
}