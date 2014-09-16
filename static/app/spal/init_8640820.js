define('spal', function(require, exports){
	var defaultPage = 'home', pageCache = {}, pageList = [], maxPageCount = 10, pageWrap = $.find('#wrapper'), pageModulePrefix = 'page/';
	var pageReg = new RegExp('^' + $CONFIG.root + '([^\/#\?]+)');
	var vm;

	var template = {
		'404' : [
			'<div data-page="404"></div>'
		].join('')
	}

	var page = {
		'parse' : function(pathname){
			var rs = pageReg.exec(pathname || '');
			return rs ? rs[1] : defaultPage;
		},
		'init' : function(pageName){
			[].forEach.call(pageWrap.children, function(el){
				if(!el.dataset.page || el.dataset.page in pageCache){return;}
				page.setRel(el.dataset.page, el);
			});
			if(pageName && !pageCache[pageName]){
				pageCache[pageName] = ;
			}
			page.clear();
		},
		'setRel' : function(name, dom){
			if(!dom){
				dom = $.create(template['404']);
			}
			pageCache[name] = dom;
		},
		'check' : function(value, oldValue){
			if(!value){
				value = page.parse(location.pathname);
			}
			page[value in pageCache ? 'show' : 'load'](value, oldValue);
		},
		'show' : function(pageName, oldPageName){
			var mod;
			mod = require(pageModulePrefix + oldPageName);
			// if(mod && typeof mod.hide === 'function'){
				// mod.hide();
			// }
			pageWrap.innerHTML = '';
			pageCache[pageName].dataset.status = 'show';
			pageWrap.appendChild(pageCache[pageName]);
			mod = require(pageModulePrefix + pageName);
			// if(mod && typeof mod.show === 'function'){
				// mod.show();
			// }
		},
		'load' : function(pageName){
			var iframe = $.create('<iframe style="width:0;height:0;border:0;visibility:hidden;" data-for="'+pageName+'"></iframe>');
			iframe.src = $CONFIG.root + 'page/' + pageName;
			iframe.onload = function(e){
				if(!pageCache[pageName]){
					page.setRel(pageName);
				}
				this.parentNode.removeChild(iframe);
				page.check();
			}
			document.body.appendChild(iframe);
		},
		'clear' : function(){
			[].forEach.call($.findAll('[id="spalScript"]'), $.remove);
			[].forEach.call($.findAll('[data-node="script"]'), $.remove);
		}
	}
	var init = function(){
		page.init();
		vm = new DataBind('spal', {
			'page' : {
				'change' : page.check
			},
			'url' : {
				'value' : location.pathname,
				'set' : function(url){
					this.page = page.parse(url);
					return url;
				}
			}
		});
		$.evt(document.body).on('click', 'a[href^="/"]',function(e){
			e.preventDefault();
			var url = $CONFIG.root + this.getAttribute('href').slice(1);
			history.pushState(null, document.title, url);
			vm.url = url;
		});
		window.addEventListener('popstate', function(e){
			vm.url = location.pathname;
		});
	}
	init();
	window.setSPAL = page.setRel;

	exports.vm = vm;
});
