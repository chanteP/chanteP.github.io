<?php
/**
 *	packagekit for npframe in neetproject ver6
 *
 *	简单易懂的前端打包工具 fix@140406
 * 		合并多个文件, 支持css、js和普通文本三种类型
 * 		$Import()
 * 
 * 	参数：
 * 		type	：打包类型，默认是文本 [text|js|css]
 * 		route	：打包文件目录，加了这个之后list参数里面就不用写那么多重复的路径了
 * 		list	：打包文件列表，类型里面定义了type的话就不用写后缀，逗号分隔
 * 		replaceImport		：路径替换规则
 * 
 *  初始化参数，执行时相对根目录路径如：../，import时相对路径的修正路径如：public/
 *	$pack = new PackageKit($rootfix, $routeFix);
 *	$pack->set(array(
 *		'list'
 *		'type'
 *		'route'
 *		'replaceImport' => array(from, to)
 *	));
 *	$pack->output();
 *	
 *	目录形式：
 * 		import中： 	［根目录］ ＋ routeFix ＋ import（非根目录开始）
 *					［根目录］ ＋ rootFix ＋ import（根开始）
 *		列表中：		［根目录］ ＋ route ＋ 路径
*/
define(KITVERSION 		, "3.0.0");
date_default_timezone_set('Asia/Shanghai');

Class PackageKit{
	private $routeFix, $rootFix;
	private $excImport;

	private $loadedList;
	private $packageInfoList;

	private $hasInit;

	function __construct($rootPath = '', $routeFix = ''){
		$this->routeFix = $routeFix ? rtrim(ltrim($routeFix, '/'), '/') . '/' : '';
		$this->rootFix = rtrim($rootPath, '/') . '/';
	}
	//通用 ########################################################################################################
	public static function setHeader($type){
		switch($type){
			case 'js':
				header ( "Content-Type:application/x-javascript; Charset=UTF-8" );
				break;
			case 'css':
				header ( "Content-Type:text/css;Charset=UTF-8" );
				break;
			default:
				header ( "Content-Type:text/plain;Charset=UTF-8" );
				break;
		}
	}
	private function str_split_unicode($str, $l = 0) {
		if ($l > 0) {
		    $ret = array();
		    $len = mb_strlen($str, "UTF-8");
		    for ($i = 0; $i < $len; $i += $l) {
		        $ret[] = mb_substr($str, $i, $l, "UTF-8");
		    }
		    return $ret;
		}
		return preg_split("//u", $str, -1, PREG_SPLIT_NO_EMPTY);
	}
	//import相关 ########################################################################################################
	private function replaceImport($m){
		$route = $m[1];
		if($this->excImport){
			$route = preg_replace($this->excImport[0], $this->excImport[1], $m[1]);
		};
		return $this->getFile($route);
	}
	private function replaceI($m){
		return str_replace('$Import', '$_Import', $m[0]);
	}
	private function parseImport($filetxt){
		$filterText = $filetxt;
		$filterText = preg_replace_callback("/\/\*([\s\S]*?)\*\//", 'self::replaceI', $filterText);
		$filterText = preg_replace_callback("/(\n[\s\t]*)?\/\/([^\n]*)/", 'self::replaceI', $filterText);

		$filterText = preg_replace_callback('/\$Import\([\'|\"]([\w|\d|\.|\/]*)[\'|\"]\);?/', 'self::replaceImport', $filterText);
		return str_replace('$_Import', '$Import', $filterText);
	}
	//获取file相关 ########################################################################################################
	private function zipFile($text){
		//TODO 卧槽好难写
		return $text;
	}
	private function checkFile($path){
		$path = substr($path, 0, 1) == '/' ? rtrim($this->rootFix, '/') . $path : $this->rootFix . $this->routeFix . $path;
		preg_match('/\.(\w+)$/', $path, $type);
		if(!$type || ($type[1] != 'js' && $type[1] != 'css' && $type != 'html')){
			$path .= '.' . $this->type;
			$fileType = $this->type;
		}
		else{
			$fileType = $type[1];
		}
		if($fileType == 'php'){
			$check = false;
		}
		else{
			$check = is_file($path);
		}
		return array(
			'path' 	=> dirname($path) . '/' . basename($path),
			'check'	=> $check,
			'type' 	=> $fileType
		);
	}
	private function getFile($path, $parse = true){
		$text 	= '';
		$rs 	= $this->checkFile($path);

		$path = $rs['path'];
		$pathInfo = ltrim($path, '.');

		if(in_array($pathInfo, $this->loadedList)){
			return $text;
		}
		$this->loadedList[] = $pathInfo;
		if(!$rs['check']){
			$this->packageInfoList[] = $pathInfo . "\t\t//file not found";
			return $text;
		}
		else{
			$this->packageInfoList[] = $pathInfo;
		}
		$text = file_get_contents($path);
		$text = preg_replace('/^\xEF\xBB\xBF/', "", $text);
		if($this->type == $rs['type']){
			$text .= "\n";
		}
		else if($this->type == 'js' && ($rs['type'] == 'html' || $rs['type'] == 'css')){
			$text = $this->zipInLine($text);
			$text = '"' . $text . '"';
		}
		$text = $parse ? $this->parseImport($text) : $text;

		return $text;
	}
	public static function zipInLine($text){
		$text = ltrim($text);
		$text = preg_replace('/(\r|\n\s*)/', "", $text);
		$text = str_replace("\"", "\\\"", $text);
		$text = str_replace("'", "\\'", $text);
		return $text;
	}
	//列表相关 ########################################################################################################
	private function package($list) {
		$pack = "";
		if(is_array($list)){
			foreach ($list as $index => $path) {
				$filetxt = is_integer($index) ? $this->getFile($path) : $path;
				$pack .= $filetxt;
			}
		}
		else{
			$pack = $this->getFile($list);
		}
		return $this->zipFile($pack);
	}
	private function parseList($list, $r = ''){
		if(!is_array($list)){
			$list = explode(",", $list);
		}
		foreach ($list as $key => $value) {
			$list[$key] = $r . $value;
		}
		return $list;
	}
	//参数相关 ########################################################################################################
	public function set($param = array()){
		if(!isset($param['list'])){return;}
		$this->list 		= $this->parseList($param['list'], $param["route"]);
		$this->type 		= isset($param['type']) ? $param['type'] : 'js';
		$this->zip 			= isset($param["zip"]) ? $param["zip"] : 0;
		$this->excImport 	= isset($param["replaceImport"]) ? $param["replaceImport"] : NULL;

		$this->loadedList	= array();
		$this->packageInfoList 	= array();

		$this->cache 		= NULL;
		$this->hasInit 		= true;
		return $this;
	}
	public function reset(){
		$this->hasInit 		= false;
		$this->set(array());
		return $this;
	}
	//输出相关 ########################################################################################################
	private function listHead(){
		$text = 
		"/*!------------------------------------------------------------------------\n".
		"  * packagekit ver. " . KITVERSION . " \n".
		"  * modify @ " . date("Y-m-d H:i:s") . " \n".
		"  * list-> " . implode($this->packageInfoList, "\n  *        ") . "\n" . 
		"  *------------------------------------------------------------------------\n".
		"  */\n";
		return $text;
	}
	private function checkOutputInfo($hasInfo = true){
		$info = $hasInfo ? 
				$this->listHead() : "";
		echo $info;
		return $this;
	}
	private function saveCache($text = ''){
		$this->cache = $text;
		$this->fullCache = $this->listHead() . $this->cache;
		return $this->cache;
	}
	public function insertText($text, $before){
		if(!$this->cache){return false;}
		if($before){
			$this->saveCache($text . $this->cache);
		}
		else{
			$this->saveCache($this->cache . $text);
		}
	}
	public function result(){
		return $this->cache;
	}
	public function parse($text){
		if(!$this->hasInit){return '';}
		if(isset($text)){
			$text = $this->parseImport($text);
		}
		else{
			if($this->cache){
				$text = $this->cache;
			}
			else{
				$text = $this->package($this->list);
			}
		}
		$this->saveCache($text);
		return $text;
	}
	public function saveAs($filename = 'file.txt', $hasInfo = true){
		$this->parse();
		header("Content-Type: application/save-as");
		header("Content-disposition: attachment; filename=".$filename);
		$this->checkOutputInfo($hasInfo);
		echo $this->cache;
		return $this->cache;
	}
	public function saveFile($filename, $hasInfo){
		if(!$filename){return;}
		$this->parse();
		$textArr = $this->str_split_unicode($this->cache, 10 * 1024);
		foreach ($textArr as $key => $value) {
			file_put_contents($filename, $value, FILE_APPEND);
		}
	}				
	public function output($hasInfo = true){
		$this->parse();
		$this->setHeader($this->type);
		$this->checkOutputInfo($hasInfo);
		echo $this->cache;
		return $hasInfo ? $this->fullCache : $this->cache;
	}
}
