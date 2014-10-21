/*
    <tag>{{a}}</tag> // text vm.a
    <tag attr={{a}}></tag> // attribute vm.a

*/
;(function(window, DataBind, $){
	//################################################################################################################
    DataBind.expression = function(expressionText, context, vm){
        if(typeof expressionText !== 'string' || !expressionText.trim() || expressionText[0] === '#'){return '';}
        //TODO char
        var filterData = expressionText.split('|'), filterArgs = /^\s*([\w]+)\(([\w\s\,]+)\)/.exec(filterData[1]);
        var rs = getValue(filterData[0], context, vm);
        if(filterArgs && filterArgs[1]){
            return filter[filterArgs[1]](rs, filterArgs[2].split(','), context, vm);
        }
        return rs;
    }
    //################################################################################################################
    var accessor = DataBind.accessor;
    //################################################################################################################
    var infixToPostfix = function(exp){
        var escape = false, quot = [], brackets = [], pExp = [], token = [], code;
        for(var i = 0, j = exp.length; i < j; i++){
            code = exp[i].charCodeAt();
        }
    }
    //################################################################################################################
    var getValue = function(expression, context, vm){
        return eval(expression) || '';
    }
    var filter = [

    ];


})(window, window.DataBind || {}, window.NPWEB_Core);

