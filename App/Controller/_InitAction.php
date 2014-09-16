<?php
class _InitAction extends Action{
	function index(){
		$webkit = stristr(get_user_agent(), 'webkit');
    	if(!$webkit){ 
    		$this->show('webkitOnly');
    		die();
    	}
	}
}