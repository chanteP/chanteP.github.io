<?php
class Action{
    function __construct($data){
    	$this->assignData = array();
		method_exists($this, '_init') && $this->_init($data);
    }
    protected function V(){
    	return new View();
    }
    protected function M($table){
    	$modelName = $table . SUFFIX_MODEL;
        $modelFile = PATH_MODEL . '/' . $modelName . '.php';
    	if(file_exists($modelFile)){
            include_once($modelFile);
            if(class_exists($modelName)){
                $m = new $modelName($table);
                return $m;
            }
            return new Model($table);
    	}
		else{
    		return new Model($table);
		}
    }
    public static function setHeader($type, $data){
        switch($type){
            case 'js':
                header("Content-Type:application/x-javascript; Charset=UTF-8");
                break;
            case 'css':
                header("Content-Type:text/css;Charset=UTF-8");
                break;
            case 'text':
                header("Content-Type:text/plain;Charset=UTF-8");
                break;
            case 'html':
                header("Content-Type:text/html;Charset=UTF-8");
                break;
            default:
                Route::status($type, $data);
                break;
        }
    }
    //template
    protected function show($title, $text, $pageForce){
        if($pageForce){
            Route::page('tips', array(
                'title' => $title,
                'text' => $text
            ));
        }
        else{
            Route::page($title);
        }
    }
    protected function status($code, $data){
        Route::status($code, $data);
    }
    protected function assign($name, $args){
        $this->assignData[$name] = func_get_args();
    }
    protected function fetch($route){
    	$view = $this->V();
		$view->assignall($this->assignData);
		return $view->fetch($route);
    }
    protected function display($route, $analysis = 1){
    	$view = $this->V();
		$view->assignall($this->assignData);
		$view->display($route, $analysis);
		return $view;
    }
    //request
    protected function ajax($code, $data, $msg){
    	return Communication::ajax($code, $data, $msg);
    }
    protected function jsonp($code, $data, $msg){
    	return Communication::jsonp($code, $data, $msg);
    }
    //
    protected function run($url){
        return Route::run($url);
    }
    protected function load($url){
        return Route::load($url);
    }
    protected function check($url){
        return Route::check($url);
    }
    protected function redirect($url){
        return Route::redirect($url);
    }
}