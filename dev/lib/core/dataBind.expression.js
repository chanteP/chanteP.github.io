/*
    <tag>{{a}}</tag> // text vm.a
    <tag attr={{a}}></tag> // attribute vm.a

*/
;(function(window, DataBind, $){
    //################################################################################################################
    var accessor = DataBind.accessor;
    //################################################################################################################
    var getValue = function(expression, context, vm){
        return parser(expression)(typeof context === 'string' ? DataBind.accessor(context) : context, vm);
    }
    //################################################################################################################
    var filter = [

    ];
    //################################################################################################################
    var parserCache = {};
    var parser = function(expression){
        if(typeof expression !== 'string'){return;}
        if(parserCache[expression]){return parserCache[expression];}
        var funcBody;
        funcBody = parseDeps(expression, null, function(match){
            return match.slice(0, 2) === 'vm.' ? match : 'data.' + match;
        });
        // /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g;
        return parserCache[expression] = new Function('data', 'vm', 'return ' + funcBody);
    }
    var parseDeps = function(expression, matchList, matchCallback){
        if(!matchList && !matchCallback){return;}
        var reg = /\b(?!\'|\")([\w|\.]+)(?!\'|\")\b/g, expressionBody;
        expressionBody = expression.replace(reg, function(text, match){
            if(isNaN(match)){
                var dep = matchCallback ? matchCallback(match) : match;
                matchList && matchList.push(dep);
                return dep;
            }
            return match;
        });
        return expressionBody;
    }

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
    DataBind.expression.parseDeps = parseDeps;
})(window, window.DataBind || {}, window.NPWEB_Core);

