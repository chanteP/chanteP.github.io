<?php /* Smarty version Smarty-3.1.14, created on 2014-10-19 00:52:48
         compiled from "static/app/frame/template.html" */ ?>
<?php /*%%SmartyHeaderCode:290736318540354061f5f85-42814310%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '10414993942224e3c8af1d36bc55770b3f390980' => 
    array (
      0 => 'static/app/frame/template.html',
      1 => 1413651160,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '290736318540354061f5f85-42814310',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_5403540623c180_35374698',
  'variables' => 
  array (
    'KITPATH' => 0,
    'root' => 0,
    'isMobile' => 0,
    'style' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5403540623c180_35374698')) {function content_5403540623c180_35374698($_smarty_tpl) {?><!DOCTYPE html>
<html manifest="/manifest/base.appcache">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="content-language" content="zh-CN" />
        
        <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style" />
        <meta content="telephone=no" name="format-detection" />
        
        <title>neetproject ver.6</title>
        
        <!--        <link rel="shortcut icon" href="/favicon.ico" /> -->
        <!-- <link href='http://fonts.googleapis.com/css?family=Roboto:400,100' rel='stylesheet' type='text/css'> -->
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/lib/global_357b8a7.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/frame/style_c8f6cf2.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/nav/style_909fea8.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/spa/style_6da59a0.css" />
        <script>
            var config = {
                kitpath : '<?php echo $_smarty_tpl->tpl_vars['KITPATH']->value;?>
',
                root : '<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
',
                pagePath : '<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
static/app/',
                isMobile : '<?php echo $_smarty_tpl->tpl_vars['isMobile']->value;?>
',
                style : '<?php echo $_smarty_tpl->tpl_vars['style']->value;?>
',
                base : '<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
static/app/'
            };
        </script>
        <script src="http://127.0.0.1/neetproject/10/static/lib/core_9d6571a.js" data-node="script"></script>
        <script src="http://127.0.0.1/neetproject/10/static/app/spa/init_2fb8dc1.js" data-node="script"></script>
        <script src="http://127.0.0.1/neetproject/10/static/app/nav/init_b1536b1.js" data-node="script"></script>
    </head>
    <body>
        <div id="wrapper">
<?php echo $_smarty_tpl->getSubTemplate ("../spa/template.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

        </div>
        <div id="syscomp">
<?php echo $_smarty_tpl->getSubTemplate ("../nav/template.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

        </div>
        <script data-node="script">$.loader.use(['nav', 'spa'], function(nav, spa){spa.init()});</script>
    </body>
</html><?php }} ?>