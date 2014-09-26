;(function(window, DataBind, $){
	//################################################################################################################
    DataBind.expression = function(expressionText, context, vm){
        if(typeof expressionText !== 'string'){return '';}
        var expressionRs;
        //三目
        if(expressionRs = trinocular.check(expressionText)){
            return trinocular(expressionRs, context, vm);
        }
        //filter
        else if(expressionRs = filterExp.check(expressionText)){
            filterExp(expressionRs, context, vm);
        }
        //prop
        else if(expressionRs = calc.check(expressionText)){
            calc(expressionRs, context, vm);
        }
        //prop
        else if(expressionRs = getProp.check(expressionText)){
            getProp(expressionRs, context, vm);
        }
        else{
            return expressionText;
        }
    }
    //################################################################################################################
    var getProp = function(expression, context, vm){

    }
    getProp.check = function(expressionText){
        return /^\s*([\w\.]+)\s*$/.exec(expressionText);
    }
    //################################################################################################################
    var calc = function(expressionRs, context, vm){

    }
    calc.check = function(expressionText){
        return /^([\s\S]+?)([\+\-\*\/])([\s\S]+)$/
    }
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
})(window, window.DataBind, window.NPWEB_Core);

