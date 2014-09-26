define('page/lab', function(require, exports){
	var api = {};
	var nav = require('nav'), spal = require('spal');
	var page, mainbox, iframe, iframeTitle, iframeBlank, search;
	
	// var func = {
	// 	'toggleLab' : function(value, oldValue){
	// 		if(typeof value != 'undefined'){
	// 			mainbox.classList.add('onshow');
	// 		}
	// 		else{
	// 			mainbox.classList.remove('onshow');
	// 		}
	// 		func.setIframe(value);
			
	// 	},
	// 	'setIframe' : function(id){
	// 		if(typeof id != 'undefined'){
	// 			clearTimeout(arguments.callee.timer);
	// 			iframe.style.opacity = 0;
	// 			var i = $.find('[data-labid="'+id+'"]', page);
	// 			if(!i){return;}
	// 			iframeTitle.innerHTML = $.find('[data-title]', i).innerHTML;
	// 			iframeBlank.href = iframe.src = i.dataset.link;

	// 			iframe.addEventListener('load', func.showIframe);
	// 		}
	// 		else{
	// 			iframe.style.opacity = 0;
	// 			arguments.callee.timer = setTimeout(function(){
	// 				iframeTitle.innerHTML = '';
	// 				iframeBlank.href = iframe.src = '';
	// 			}, 400);
	// 		}
	// 	},
	// 	'showIframe' : function(){
	// 		iframe.style.opacity = 1;
	// 	},
	// 	'refresh' 	: function(){
	// 		iframe.src = iframe.src;
	// 	},
	// 	'search' 	: function(){
	// 		var val = this.value, rs, all;
	// 		all = $.findAll('[data-node="labview"]', mainbox);
	// 		if(val === ''){
	// 			rs = all;
	// 		}
	// 		else{
	// 			var valsp = val.split(' ');
	// 			rs = [];
	// 			valsp.forEach(function(kw){
	// 				var drs = $.findAll('[data-node="labview"][data-tag*="'+kw+'"]', mainbox);
	// 				[].forEach.call(drs, function(el){
	// 					rs.push(el);
	// 				});
	// 			});
	// 		}
	// 		[].forEach.call(all, function(el){
	// 			if([].indexOf.call(rs, el) < 0){
	// 				el.classList.add('hide');
	// 			}
	// 			else{
	// 				el.classList.remove('hide');
	// 			}
	// 		});
	// 	} 
	// }

	var init = function(){
	// 	page = $.find('[data-page=lab]');
	// 	mainbox = $.find('[data-node=mainbox]', page);

	// 	iframe = $.find('[data-node=labiframe]', page);
	// 	iframeTitle = $.find('[data-node=title]', mainbox);
	// 	iframeBlank = $.find('[data-node=blank]', mainbox);

	// 	search = $.find('[data-node=search]', mainbox);

	// 	$.evt(mainbox)
	// 		.on('tap', '[data-node=refresh]', func.refresh);

	// 	search.addEventListener('keyup', func.search);

	// 	url.ob('lab', func.toggleLab);
		nav.reg('lab');
	}
	init();
});