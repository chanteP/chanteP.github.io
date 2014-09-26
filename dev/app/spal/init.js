define('spal', function(require, exports){
	var defaultPage = 'home', pageCache = {}, pageList = [], maxPageCount = 10, pageWrap = $.find('#wrapper'), pageModulePrefix = 'page/';
	var removeMarker = '[id="spalScript"], [data-node="script"]';
	var pageReg = new RegExp('^' + $CONFIG.root + '([^\/#\?]+)');
	var vm;

	var template = {
		'404' : [
			'<div data-page="404">404</div>'
		].join(''),
		'loading' : [
			'<div data-page="loading" style="background:#fff;">loading</div>'
		].join('')
	}

	var page = {
		'parse' : function(pathname){
			var rs = pageReg.exec(pathname || location.pathname);
			return rs ? rs[1] : defaultPage;
		},
		'check' : function(value, oldValue){
			if(page.rel(value)){
				page.show(value, oldValue);
			}
			else{
				page.show('loading', oldValue);
				page.load(value, oldValue);
			}
		},
		'init' : function(pageName){
			[].forEach.call(pageWrap.children, function(el){
				if(!el.dataset.page || page.rel(el.dataset.page)){return;}
				page.rel(el.dataset.page, el);
			});
			if(pageName && !page.rel(pageName)){
				page.rel(pageName, null);
			}
			page.rel('loading', $.create(template['loading']));
			page.clear();
		},
		/*
		cachepage相关
		*/
		'rel' : function(pageName, dom){
			if(arguments.length === 1){
				return pageName in pageCache ? pageCache[pageName] : false;
			}
			else if(arguments.length === 2){
				return pageCache[pageName] = dom || $.create(template['404']);
			}
		},
		/*
		toggle相关
		*/
		'show' : function(pageName, oldPageName){
			var mod;
			mod = require(pageModulePrefix + oldPageName);
			if(mod && typeof mod.hide === 'function'){
				mod.hide();
			}
			page.effect(pageWrap, page.rel(pageName), page.rel(oldPageName));
			mod = require(pageModulePrefix + pageName);
			if(mod && typeof mod.show === 'function'){
				mod.show();
			}
		},
		'effect' : function(wrapper, page, oldPage){
			wrapper.innerHTML = '';
			page.dataset.status = 'show';
			wrapper.appendChild(page);
			return;		

			if(page){
				page.className = 'animated flipInY';
				page.dataset.status = 'show';
				wrapper.appendChild(page);
			}
			if(oldPage){
				page.className = 'animated flipOutY';
				oldPage.dataset.status = 'hide';
			}
			// wrapper.innerHTML = '';
		},
		'effectEnd' : function(wrapper, page, oldPage){

		},
		'load' : function(pageName){
			var iframe = $.create('<iframe style="width:0;height:0;border:0;visibility:hidden;" data-for="'+pageName+'"></iframe>');
			iframe.src = $CONFIG.root + 'page/' + pageName;
			iframe.onload = function(e){
				this.parentNode.removeChild(iframe);
				if(!page.rel(this.dataset.for)){
					page.rel(this.dataset.for, null);
				}
				if(vm.page === this.dataset.for){
					vm.check('page');
				}
			}
			document.body.appendChild(iframe);
		},
		'clear' : function(){
			[].forEach.call($.findAll(removeMarker), $.remove);
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
		$.evt(document.body).on('webkitAnimationEnd', '[data-page]', function(e){
			debugger
			console.log(this, this.dataset.status)
			if(this.dataset.status == 'show'){

			}
			else{
				pageWrap.removeChild(this);
			}
		});
		window.addEventListener('popstate', function(e){
			vm.url = location.pathname;
		});
	}
	init();
	window.setSPAL = page.rel;

	exports.vm = vm;
});
