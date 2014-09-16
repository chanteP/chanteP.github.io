<?php
class PageAction extends ExtAction{
    public $_mapping = array(
    	'page' => '/{page}/?(?<param>.*)'
    );
    public function page($data){
    	$this->setPage();
    	$page = $data['data']['rs']['page'];
    	$param = $data['data']['rs']['param'];
    	if($this->check($page . '/' . $param)){
	    	$this->getPage($page, true);
    	}
    	else{
    		$this->status(404);
    	}
    }
}