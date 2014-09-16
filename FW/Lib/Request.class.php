<?php
class Request {
	public $code = array(
			'100000' => 'success',
			
			'200001' => 'need login',
			'200002' => 'param missing',
			'200003' => 'param error',
			
			'300001' => 'forbidden',
			
			'400001' => 'page not found'
		);
	static function ajax($code, $data, $msg){
		header('Content-type: application/json');
		echo json_encode(array(
			'code' => $code ? $code : '100000',
			'data' => $data ? $data : '',
			'msg'  => isset($msg)  ? $msg  : $code[$code]
		));
	}
	static function jsonP($code, $data, $msg){
		header('Content-type: application/javascript');
		$callback = isset($_GET['callback']) ? $_GET['callback'] : 'callback';
		echo $callback . ' && ' . $callback . '(' . json_encode(array(
			'code' => $code ? $code : '100000',
			'data' => $data ? $data : '',
			'msg'  => isset($msg)  ? $msg  : $code[$code]
		)) . ');';
	}
	static function post($remote_server, $query_string) {   
		$ch = curl_init();   
		curl_setopt($ch, CURLOPT_URL, $remote_server);   
		curl_setopt($ch, CURLOPT_POSTFIELDS, $query_string);   
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);   
		curl_setopt($ch, CURLOPT_USERAGENT, "np ver.5.5");   
		$data = curl_exec($ch);   
		curl_close($ch);   

		return $data;   
	}
	static function get($remote_server, $query_string) {   
		$data = file_get_contents($remote_server . '?' . $query_string);
		return $data;
	}
}
