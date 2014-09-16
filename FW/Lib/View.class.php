<?php
class View{
    function __construct(){
    	global $CONFIG;
		$smarty = $this->smarty = new Smarty;
		$smarty->debugging 		= false;
		$smarty->caching 		= false;
		$smarty->template_dir  	= PATH_VIEW;
        $smarty->compile_dir 	= PATH_CACHE . 'compile_dir';
        $smarty->cache_dir 		= PATH_CACHE . 'cache_dir';
		$smarty->compile_locking =  false;
    }
	public function assignall($data){
		foreach($data as $name => $args){
			call_user_func_array(array($this->smarty, 'assign'), $args);
		}
	}
	public function assign($args){
		call_user_func_array(array($this->smarty, 'assign'), $args);
	}
	public function display($url, $analysis = true){
		if($analysis){
			$this->smarty->display($url);
		}
		else{
			echo file_get_contents(PATH_VIEW . '/' . $url);
		}
	}
	public function fetch($url){
		return $this->smarty->fetch($url);
	}
}