;(function(window, DataBind, $){
	//################################################################################################################
    DataBind.expression = function(expressionText, context, vm){
        debugger
        if(typeof expressionText !== 'string'){return '';}
        var expressionRs, expressionFunc, check;
        [trinocular, filterExp, calc, getProp].some(function(func){
            check = func.check(expressionText);
            if(check){
                expressionFunc = func;
                expressionRs = check;
                return true;
            }
        });
        return check ? expressionFunc(expressionRs, context, vm) : expressionText;
    }
    //################################################################################################################
    var accessor = DataBind.accessor;
    //################################################################################################################
    var getProp = function(expressionRs, context, vm){
        if(expressionRs[1] in context){
            return context[expressionRs[1]];
        }
        else{
            return '';
        }
    }
    getProp.check = function(expressionText){
        return /^\s*([\w\.]+)\s*$/.exec(expressionText);
    }
    //################################################################################################################
    var calc = function(expressionRs, context, vm){

    }
    calc.check = function(expressionText){
        return /^([\s\S]+?)([\+\-\*\/])([\s\S]+)$/.exec(expressionText);
    }
    calc.checkList = [
        
    ];
    //################################################################################################################
    var trinocular = function(expressionRs, context, vm){
        var cond = expressionRs[1], valT = expressionRs[2], valF = expressionRs[3];
    }
    trinocular.check = function(expressionText){
        return /^([\s\S]+?)\?([\s\S]+)\:([\s\S]+)$/.exec(expressionText);
    }
    //################################################################################################################
    var filterExp = function(expressionRs, context, vm){
        var prop = expressionRs[1], valT = expressionRs[2], valF = expressionRs[3];
    }
    filterExp.check = function(expressionText){
        return /^([\s\S]+?)\|([\s\S]+)\:?([\s\S]+)?$/.exec(expressionText);
    }
    var filter = {

    }
})(window, window.DataBind || {}, window.NPWEB_Core);

