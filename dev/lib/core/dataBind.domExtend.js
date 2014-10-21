;(function(window, DataBind, $){
	//################################################################################################################
	/*
		desc:
			{{expression}}
			
			vm-list="a.b.c"
			vm-model="value" 

	*/
	//################################################################################################################
	var preg = /{{([^}]+)}}/m;
	var prefix = 'vm-';
	var marker = {
		'model' : prefix + 'model',
		'list' : prefix + 'list'
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
	DataBind.scan = function(node){
		main.parseNode(node || document.body);
	}
	window.document.on('DOMContentloaded', main.bindDocument);

	//################################################################################################################
})(window, window.DataBind, window.NPWEB_Core);

