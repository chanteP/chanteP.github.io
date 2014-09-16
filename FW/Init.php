<?php
session_start();

define(PATH_CORE_CONF   , PATH_CORE . 'Conf/');
define(PATH_CORE_LIB    , PATH_CORE . 'Lib/');
define(PATH_CORE_TPL    , PATH_CORE . 'Tpl/');
//#########################################################
set_include_path('.' . PATH_SEPARATOR . './' . APP_PATH . PATH_SEPARATOR);
//#########################################################
include_once(PATH_CORE_LIB . '/Function.php');
$CONFIG = parse_config(array(), array(
    PATH_CORE_CONF . 'Config.php',
    PATH_CONF . 'Config.php',
));
include_once(PATH_CORE_LIB . 'smarty' . (PLATFORM == 'SAE' ? '4sae' : '') . '/Smarty.class.php');
include_once(PATH_CORE_LIB . 'Model' . (PLATFORM == 'SAE' ? '4sae' : '') . '.class.php');
include_once(PATH_CORE_LIB . 'Folder.class.php');
include_once(PATH_CORE_LIB . 'Cache.class.php');
include_once(PATH_CORE_LIB . 'View.class.php');
include_once(PATH_CORE_LIB . 'Request.class.php');
include_once(PATH_CORE_LIB . 'Route.class.php');
include_once(PATH_CORE_LIB . 'Action.class.php');

Folder::findAll(PATH_LIB, false, function($dir, $file){include_once($dir.'/'.$file);});
// include_once(PATH_CORE_LIB . '/Packagekit.class.php');
//#########################################################
$url = ROUTE::run('_init/index');
ROUTE::load(
    $url ? $url : $_SERVER['PATH_INFO']
);
ROUTE::run('_end/index');
