;(function(window, DataBind, $){
	//################################################################################################################
	/*
		desc:
			{{expression}}
			
			vm-bind
			vm-list="a.b.c"
			vm-bind="a.b" vm-click="value" 

	*/
	//################################################################################################################
	var preg = /{{([^}]+)}}/m;
	var marker = {
		'bind' : 'vm-bind',
		'list' : 'vm-list',
		'evt' : ['tap', 'change'],
	}
	//################################################################################################################
	var func = {
		'evt' : $.evt,
		'isList' : function(node){
			if(node.getAttribute(marker.list)){return true;}
		}
	}
	var main = {
		'expression' : DataBind.expression,
		'bindDocument' : function(){
			var evtBody = func.evt(document.body);
			marker.evt.forEach(function(evt){
				evtBody.on(evt, 'vm-' + evt, function(e){
					console.log(e.type)
				});
			});
		},
		'parseNode' : function(node){
			if(node.nodeType === 1){
				if(!preg.test(node.outerHTML)){return;}
				if(func.isList(node)){return;}
				[].forEach.call(node.childNodes, function(el){
					main.parseNode(el);
				});
			}
			else if(node.nodeType === 3){
				if(!preg.test(node.nodeValue)){return;}
				main.bind.text(node);
			}
		},
		'parseText' : function(text){
			return text;
		},
		'bind' : {
			'attr' : function(node, attr){

			},
			'text' : function(node){
				node.nodeValue = 'hahahhaahhahahahha'
			}
		}
	}
	//################################################################################################################
	DataBind.scan = function(node, init){
		main.parseNode(node || document.body);
		init && main.bindDocument();
	}

	//################################################################################################################
})(window, window.DataBind, window.NPWEB_Core);

