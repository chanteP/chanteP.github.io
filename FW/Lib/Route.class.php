<?php

class Route{
    public static function load($url){
        self::parse($url, 1);
    }
    public static function run($url){
        return self::parse($url);
    }
    public static function check($url){
        return self::parse($url, 2);
    }

    // func ####################
    //type : 0:run, 1:load, 2:check
    public static function parse($url, $type){
        preg_match('/^\/?([^\/]*)(.*)/', $url, $rs);
        $actionUrl = $rs[2];
        $c = $rs[1] ? $rs[1] : DEF_CONTROLLER;
        $c = self::check_controller($c);

        if(!$c){
            $type == 1 && self::page('404');
            return false;
        }
        $controller = new $c();
        $actionData = self::check_action($controller, $actionUrl, $c);
        if(!$actionData){
            $type == 1 && self::page('404');
            return false;
        }
        if($type == 2){
            return true;
        }
        $type == 1 && self::run_action($controller, '_init', $actionData);
        $ret = self::run_action($controller, $actionData['action'], $actionData);
        $type == 1 && self::run_action($controller, '_end', $actionData);
        return $ret;
    }
    private static function check_controller($controllerName){
        $controllerName = $controllerName . SUFFIX_CONTROLLER;
        $controller_file = PATH_CONTROLLER . $controllerName . '.php';
        if(!is_file($controller_file)){
            return false;
        }
        include_once($controller_file);
        if(!class_exists($controllerName)){
            return false;
        }
        return $controllerName;
    }
    private static function check_action($controller, $url, $controllerName){
        $action = DEF_ACTION;
        $url = $url ? $url : '/';
        if(is_array($controller->_mapping)){
            foreach ($controller->_mapping as $key => $value) {
                $check = self::parse_url($url, $value);
                if($check['check']){
                    $action = $check['rs'][ACTION] ? $check['rs'][ACTION] : $key;
                    break;
                }
            }
        }
        else{
            $check = self::parse_url($url, '/' . ACTION);
            if($check['check'])
                $action = $check['rs'][ACTION];
        }
        if(!method_exists($controller, $action)){
            return false;
        }
        return array(
            'controller' => $controllerName,
            'action' => $action,
            'data' => $check ? $check : array(),
            'url' => $url
        );
    }
    private static function run_action($controller, $action, $data){
        if(method_exists($controller, $action)){
            return $controller->$action($data);
        }
    }

    public static function redirect($url){
        if(isset($url)){
            header("Location: $url");
        }
    }

    public static function parse_url($url, $rule){

        $protorule = str_replace('/', '\/', $rule);
        // $routerule = '/^\/*' . preg_replace_callback('/{(.*?)}/', create_function('$matches', 'return "(?<".$matches[1].">[^\/]*)";'), $protorule) . '\/?(.*)/i';
        $routerule = '/^' . preg_replace_callback('/{(.*?)}/', create_function('$matches', 'return "(?<".$matches[1].">[^\/]*)";'), $protorule) . '\/?$/i';
        $check = preg_match($routerule, $url, $rs);
        return array(
            'check' => $check,
            'rs' => $rs
        );
    }
    // static page & status ####################
    public static function status($code){
        switch ($code) {
            case '404':
                header("HTTP/1.0 404 Not Found");
                header("Status: 404 Not Found");  
                break;
            case '403':
                header("HTTP/1.0 403 Forbidden");
                header("Status: 403 Forbidden");  
                break;
            default:
                break;
        }
    }
    public static function page($code, $data){
        $html = '';
        switch ($code){
            case '404' : 
                self::status('404');
                $html = file_get_contents(PATH_CORE_TPL . '404.html');
                break;
            case 'webkitOnly' : 
                self::status('403');
                $html = file_get_contents(PATH_CORE_TPL . 'webkitOnly.html');
                break;
            case 'tips' : 
                $html = file_get_contents(PATH_CORE_TPL . 'tips.html');
                $html = str_replace('{$title}', $data['title'] ? $data['title'] : '', $html);
                $html = str_replace('{$text}', $data['text']? $data['text']: '', $html);
                break;
        }
        $html = str_replace('href="/', 'href="' . PATH_ROOT, $html);
        $html = str_replace('href="./', 'href="' . PATH_ROOT . PATH_CORE_TPL, $html);
        echo $html;
    }
}