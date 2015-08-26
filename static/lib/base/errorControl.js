module.exports = function($){
    window.onerror = function(e, filename, lineNo){
        var debugType = $.querySearch('debug');
        if(!debugType){return;}
        switch(debugType){
            case 'alert' : 
                alert(e + '\n' + filename + '\n' + lineNo)
                break;
            case 'console' :
                console.log(e, filename, lineNo);
                break;
            case 'debugger':
                debugger
                break;
        }
    }
}