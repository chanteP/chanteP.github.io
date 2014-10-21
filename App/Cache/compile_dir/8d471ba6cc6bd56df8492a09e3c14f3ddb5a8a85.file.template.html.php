<?php /* Smarty version Smarty-3.1.14, created on 2014-09-27 01:26:46
         compiled from "/Volumes/LINKAREA/web/neetproject/10/static/app/spal/template.html" */ ?>
<?php /*%%SmartyHeaderCode:155109117354035406241299-15498702%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '8d471ba6cc6bd56df8492a09e3c14f3ddb5a8a85' => 
    array (
      0 => '/Volumes/LINKAREA/web/neetproject/10/static/app/spal/template.html',
      1 => 1411752406,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '155109117354035406241299-15498702',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_54035406260f51_61663435',
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
<?php if ($_valid && !is_callable('content_54035406260f51_61663435')) {function content_54035406260f51_61663435($_smarty_tpl) {?><?php if ($_smarty_tpl->tpl_vars['isPage']->value){?>
    <div data-page="<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
" data-status="hide">
<?php if ($_smarty_tpl->tpl_vars['cssFile']->value){?><style><?php echo $_smarty_tpl->tpl_vars['cssFile']->value;?>
</style><?php }?>
<?php if ($_smarty_tpl->tpl_vars['htmlFile']->value){?><?php echo $_smarty_tpl->getSubTemplate (((string)$_smarty_tpl->tpl_vars['htmlFile']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array(), 0);?>
<?php }?>
    </div>
    <script id="spalScript">
    (function(window, self, undefined){
        window.setSPAL('<?php echo $_smarty_tpl->tpl_vars['page']->value;?>
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
    <script id="spalScript">
        <?php echo $_smarty_tpl->tpl_vars['jsFile']->value;?>

    </script>
    <?php }?>
<?php }?>
<?php }} ?>