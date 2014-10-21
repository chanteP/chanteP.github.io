<?php
class ExtAction extends Action{
	public function setPage(){
		$this->assign('isPage', true);
		$this->isPage = true;
	}
	public function getPage($page, $display){
        $page = strtolower($page);
		$appStaticPath = PATH_STATIC . APP_STATIC;

		$jsFile = "page/$page/init.js";
        if(file_exists($appStaticPath . $jsFile)){
	        $this->assign('jsFile', file_get_contents($appStaticPath . $jsFile));
        }
		$cssFile = "page/$page/style.css";
        if(file_exists($appStaticPath . $cssFile)){
	        $this->assign('cssFile', file_get_contents($appStaticPath . $cssFile));
        }
		$htmlFile = "page/$page/template.html";
        if(file_exists($appStaticPath . $htmlFile)){
	        $this->assign('htmlFile', '../' . $htmlFile);
        }

		$this->assign('page', $page);
        $this->assign('KITPATH', 'http://npkit.sinaapp.com');
        $this->assign('root', PATH_ROOT);
        $this->assign('static', PATH_ROOT . $appStaticPath);
        $this->assign('style', 'proto');
        $this->assign('isMobile', is_mobile());

        if($display){
            sleep(2);
        	$this->display('spal/template.html');
        }
	}
	public function _end($data){
		if($this->isPage){return;}
		$pageHTML = $this->getPage(rtrim($data['controller'], 'Action'));
		$this->display('frame/template.html');
	}
}