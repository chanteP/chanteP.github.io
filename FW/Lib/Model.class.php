<?php
//sae限定
class Model{
	function __construct($table){
		if($table){
			$this->init($table);
		}
	}
	private function quoteField($text, $delimiter){
		$fields = is_array($text) ? 
			$text : 
			explode(' ', $text);
		foreach ($fields as $key=>$field) {
			$fields[$key] = '`' . $field . '`';
		}
		return implode(isset($delimiter) ? $delimiter : ' ', $fields);
	}
	public function init($table, $db){
		if(!isset($db)){
			$db = $CONFIG['DB_HOST'];
		}
		$this->table = $table;
		$this->tablex = $this->quoteField($table);
		$this->conn;
		$this->error = $this->conn->errmsg;
		return $this;
	}
	//################################################
	public function query($sql){
		// return $this->conn->getData($sql);
	}
	public function sql($sql){
		// return $this->conn->runsql($sql);
	}
}
