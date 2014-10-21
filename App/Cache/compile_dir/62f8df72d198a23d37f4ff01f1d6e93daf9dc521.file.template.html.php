<?php /* Smarty version Smarty-3.1.14, created on 2014-10-19 00:46:14
         compiled from "/Volumes/LINKAREA/web/neetproject/10/static/app/spa/template.html" */ ?>
<?php /*%%SmartyHeaderCode:704505515425a32a77edf4-13845343%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '62f8df72d198a23d37f4ff01f1d6e93daf9dc521' => 
    array (
      0 => '/Volumes/LINKAREA/web/neetproject/10/static/app/spa/template.html',
      1 => 1413650774,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '704505515425a32a77edf4-13845343',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_5425a32a7b7117_71452067',
  'variables' => 
  array (
    'isPage' => 0,
    'page' => 0,
    'cssFile' => 0,
    'htmlFile' => 0,
    'jsFile' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5425a32a7b7117_71452067')) {function content_5425a32a7b7117_71452067($_smarty_tpl) {?><?php if ($_smarty_tpl->tpl_vars['isPage']->value){?>
    <div data-page="<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
" data-status="hide">
<?php if ($_smarty_tpl->tpl_vars['cssFile']->value){?><style><?php echo $_smarty_tpl->tpl_vars['cssFile']->value;?>
</style><?php }?>
<?php if ($_smarty_tpl->tpl_vars['htmlFile']->value){?><?php echo $_smarty_tpl->getSubTemplate (((string)$_smarty_tpl->tpl_vars['htmlFile']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
<?php }?>
    </div>
    <script id="spaScript">
    (function(window, self, undefined){
        window.setPage('<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
', document.querySelector('[data-page]'));
        <?php if ($_smarty_tpl->tpl_vars['jsFile']->value){?>var define = window.define;
        <?php echo $_smarty_tpl->tpl_vars['jsFile']->value;?>
<?php }?>
    })(window.parent === window ? window : window.parent, self);
    </script>
<?php }else{ ?>
    <div data-page="<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
" data-status="show">
<?php if ($_smarty_tpl->tpl_vars['cssFile']->value){?><style><?php echo $_smarty_tpl->tpl_vars['cssFile']->value;?>
</style><?php }?>
<?php if ($_smarty_tpl->tpl_vars['htmlFile']->value){?><?php echo $_smarty_tpl->getSubTemplate (((string)$_smarty_tpl->tpl_vars['htmlFile']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
<?php }?>
    </div>
    <?php if ($_smarty_tpl->tpl_vars['jsFile']->value){?>
    <script id="spaScript">
        <?php echo $_smarty_tpl->tpl_vars['jsFile']->value;?>

    </script>
    <?php }?>
<?php }?>
<?php }} ?>