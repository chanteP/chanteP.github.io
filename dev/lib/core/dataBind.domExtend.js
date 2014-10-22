;(function(window, DataBind, $){
    var expPreg = /{{([^}]+)}}/m, tagPreg = /^<([\s\S]*?)>/m;
    var prefix = 'vm-';
	var marker = {
		'model' : prefix + 'model',
		'list' : prefix + 'list'
	}
    var vm = DataBind.accessor();
    //################################################################################################################
    var func = {
        'evt' : $.evt,
        'contains' : $.contains,
        'isList' : function(node){
            if(node.getAttribute(marker.list)){return true;}
        }
    }
    var main = {
        'expression' : DataBind.expression,
        'bindDocument' : function(){
			var evtBody = func.evt(document.body);
			evtBody
				.on('change', [
						'input[type=checkbox]['+marker.model+']',
						'input[type=radio]['+marker.model+']'
					].join(','), 
					function(e){
						console.log(e.type, e.target)
				})
				.on('change', 'select['+marker.model+']', function(){
						console.log(e.type, e.target)
				})
				.on('change', 'file['+marker.model+']', function(){
						console.log(e.type, e.target)
				})
				.on('keyup', [
						'input[type=text]['+marker.model+']',
						'textarea['+marker.model+']'
					].join(','), 
					function(e){
						console.log(e.type, e.target)
				});
		},
        'parseNode' : function(node){
            if(node.nodeType === 1){
                if(!expPreg.test(node.outerHTML)){return;}
                if(func.isList(node)){return;}
                //tag scan
                main.checkAttr(node);
                //model
                [].forEach.call(node.childNodes, function(el){
                    main.parseNode(el);
                });
            }
            else if(node.nodeType === 3){
                if(!expPreg.test(node.nodeValue)){return;}
                main.bind.text(node, node.nodeValue);
            }
        },
        'checkAttr' : function(node){
            var html = tagPreg.exec(node)[1], preg, match;
            preg = /\b([^\s]*?)\=\"([^\"]*?{{([^\"]*?)}}[^\"]*?)\"/mg;
            while(match = preg.exec(html)){
                main.bind.attr(node, match[1], match[2], match[3]);
            }
        },
        'parse' : {
            'deps' : function(text, context, expressions){
                var deps = [];
                expressions = expressions || main.parse.exps(text);
                expressions.forEach(function(expression){
                    main.expression.parseDeps(expression, deps, function(dep){
                        if(dep.slice(0, 2) === 'vm.'){return dep.slice(2, -1)}
                        else{return context ? context + '.' + dep : dep;}
                    });
                });
                return deps;
            },
            'exps' : function(text){
                var expressions = [], preg = /{{([^}]*)}}/mg, match;
                while(match = preg.exec(text)){
                    expressions.push(match[1]);
                }
                return expressions;
            },
            'text' : function(text, context){
                return text.replace(/{{([^}]*)}}/mg, function(t, match){
                    return DataBind.expression(match, context, vm);
                });
            },
            'context' : function(node){
                if(node.getAttribute && node.getAttribute(marker.bind)){
                    return node.getAttribute(marker.bind);
                }
                return node.parentNode ? main.parse.context(node.parentNode) : '';
            }
        },
        'bind' : {
            'attr' : function(node, attr, text, expression){
                var context = main.parse.context(node), deps = main.parse.deps(text, context, [expression]);
                deps.forEach(function(prop){
                    DataBind.observe(prop, function(){
                        node.setAttribute(attr, main.parse.text(text));
                    });
                });
            },
            'text' : function(node, text){
                var context = main.parse.context(node), deps = main.parse.deps(text, context, [expression]);
                deps.forEach(function(prop){
                    DataBind.observe(prop, function(){
                        node.nodeValue = main.parse.text(text);
                    });
                });
            }
        }
    }
    //################################################################################################################
    DataBind.scan = function(node, init){
        main.parseNode(node || document.body);
        init && main.bindDocument();
    }
	window.document.on('DOMContentloaded', main.bindDocument);

    //################################################################################################################
})(window, window.DataBind, window.NPWEB_Core);

