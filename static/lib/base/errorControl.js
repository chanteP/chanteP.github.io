export default ($) => {
    window.onerror = (e, filename, lineNo) => {
        var debugType = $config.debug;
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