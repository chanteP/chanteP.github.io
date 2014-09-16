<?php
define(DEBUGMODE        , E_ALL & ~E_NOTICE & ~E_WARNING);
// define(DEBUGMODE     , 0);
error_reporting(DEBUGMODE);

/* 时区
-----------------------------------------------*/
date_default_timezone_set('PRC');

/* app分发
-----------------------------------------------*/
$APP_INFO = array(
    'neetproject' => array(
        'name' => 'neetproject',
        'path' => 'APP/',
        'static'=> 'app/',
       	'root' => '/neetproject/10/'
    ),
    'admin' => array(
        'name' => 'admin',
        'path' => 'Admin/',
        'static'=> 'admin/',
       	'root' => '/neetproject/10/'
    )
);

define(APP         		, 'neetproject');
define(APP_NAME         , $APP_INFO[APP]['name']);
define(APP_PATH         , $APP_INFO[APP]['path']);
define(APP_STATIC       , $APP_INFO[APP]['static']);
define(APP_ROOT	        , $APP_INFO[APP]['root']);

/* 开发配置
-----------------------------------------------*/
define(ISLOCAL          , stristr($_SERVER['SERVER_NAME'], '192') || stristr($_SERVER['SERVER_NAME'], '127') || $_SERVER['SERVER_NAME'] == 'localhost');
define(DEV              , ISLOCAL);
define(PLATFORM         , ISLOCAL ? '' : 'SAE');
define(PATH_ROOT        , ISLOCAL ? APP_ROOT : '/');

/* core目录
-----------------------------------------------*/
define(PATH_CORE        , 'FW/');

/* app目录
-----------------------------------------------*/
define(PATH_STATIC      , 'static/');
define(PATH_LIB  		, APP_PATH . 'Lib/');
define(PATH_CONTROLLER  , APP_PATH . 'Controller/');
define(PATH_MODEL       , APP_PATH . 'Model/');
define(PATH_CONF        , APP_PATH . 'Conf/');
define(PATH_COMMON      , APP_PATH . 'Common/');
define(PATH_CACHE       , APP_PATH . (PLATFORM == 'SAE' ? 'saemc://' : 'Cache/'));
define(PATH_TPL	        , APP_PATH . 'Template/');
define(PATH_VIEW        , PATH_STATIC . APP_STATIC);

/* 设置默认Controller和action和路径规则
-----------------------------------------------*/
// define(CONTROLLER       , 'Controller');
define(ACTION           , 'Action');
define(DEF_CONTROLLER   , 'Home');
define(DEF_ACTION       , 'index');
// define(ROUTERULE        , '{'. CONTROLLER .'}');
// define(ROUTERULE        , '{'. CONTROLLER .'}/{'. ACTION .'}/{data}');
// define(ROUTERULE        , '{'. ACTION .'}/{data}/{ext}');

/* 后缀
-----------------------------------------------*/
define(SUFFIX_MODEL		, 'Model');
define(SUFFIX_CONTROLLER, 'Action');
