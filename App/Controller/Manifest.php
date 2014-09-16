<?php
class ManifestAction extends Action{
	public $_mapping = array(
		'cache' => '/{file}'
	);
    
    function cache(){
    	$this->status('404');
    	$this->show('');
    }
}