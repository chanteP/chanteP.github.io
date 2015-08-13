<?php
define(DEBUGMODE , E_ALL & ~E_NOTICE & ~E_WARNING);
error_reporting(DEBUGMODE);

    function query($sql){
        $conn = new SaeMysql();
        return $conn->getData($sql);
    }
    
    function packageData($data, $isSuccess, $msg){
        return json_encode(array(
            'data' => $data,
            'isSuccess' => $isSuccess ? true : false,
            'msg' => $msg ? $msg : '' 
        ));
    }
    function postJSON($json){
        // header('Access-Control-Allow-Origin: http://neetproject.sinaapp.com');
        // header('Access-Control-Allow-Origin: http://neetproject.com');
        // header('Access-Control-Allow-Origin: http://neetproject.info');
        // header('Access-Control-Allow-Origin: http://localhost:9000');
        // header('Access-Control-Allow-Origin: http://localhost');
        header('Access-Control-Allow-Origin: *');
        header("Content-Type:application/x-javascript; Charset=UTF-8");
        echo $json;        
    }