<?php /* Smarty version Smarty-3.1.14, created on 2014-09-27 01:35:01
         compiled from "static/app/spal/template.html" */ ?>
<?php /*%%SmartyHeaderCode:201697859554131beec2e125-80142193%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'f6606bdcc27a49d84d1a82c6e512903ab8c4764b' => 
    array (
      0 => 'static/app/spal/template.html',
      1 => 1411752686,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '201697859554131beec2e125-80142193',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_54131beecbbea3_04983346',
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
<?php if ($_valid && !is_callable('content_54131beecbbea3_04983346')) {function content_54131beecbbea3_04983346($_smarty_tpl) {?><?php if ($_smarty_tpl->tpl_vars['isPage']->value){?>
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