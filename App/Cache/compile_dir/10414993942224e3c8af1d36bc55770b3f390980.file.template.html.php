<?php /* Smarty version Smarty-3.1.14, created on 2014-09-17 00:39:03
         compiled from "static/app/frame/template.html" */ ?>
<?php /*%%SmartyHeaderCode:290736318540354061f5f85-42814310%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '10414993942224e3c8af1d36bc55770b3f390980' => 
    array (
      0 => 'static/app/frame/template.html',
      1 => 1410885540,
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
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/lib/global_1602e06.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/frame/style_1cf294d.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/nav/style_909fea8.css" />
        <link rel="stylesheet" media="screen" href="http://127.0.0.1/neetproject/10/static/app/spal/style_6da59a0.css" />
        <script>
            var $CONFIG = new Object();
            $CONFIG['kitpath'] = '<?php echo $_smarty_tpl->tpl_vars['KITPATH']->value;?>
';
            $CONFIG['root'] = '<?php echo $_smarty_tpl->tpl_vars['root']->value;?>
';
            $CONFIG['isMobile'] = '<?php echo $_smarty_tpl->tpl_vars['isMobile']->value;?>
';
            $CONFIG['style'] = '<?php echo $_smarty_tpl->tpl_vars['style']->value;?>
';
        </script>
        <script src="http://127.0.0.1/neetproject/10/static/lib/core_c118653.js" data-node="script"></script>
    </head>
    <body>
        <div id="wrapper">
<?php echo $_smarty_tpl->getSubTemplate ("../spal/template.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

        </div>
        <div id="syscomp">
<?php echo $_smarty_tpl->getSubTemplate ("../nav/template.html", $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>

        </div>
        <script src="http://127.0.0.1/neetproject/10/static/app/nav/init_2bca478.js" data-node="script"></script>
        <script src="http://127.0.0.1/neetproject/10/static/app/spal/init_ddcfb2e.js" data-node="script"></script>
        <script>seajs.use(['nav', 'spal']);</script>
    </body>
</html><?php }} ?>