<?php /* Smarty version Smarty-3.1.14, created on 2014-09-16 23:39:15
         compiled from "/Volumes/LINKAREA/web/neetproject/10/static/app/page/lab/template.html" */ ?>
<?php /*%%SmartyHeaderCode:409306401541321177696b7-37090187%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'd360810835a99d001ad26b069f3aa502d0768e99' => 
    array (
      0 => '/Volumes/LINKAREA/web/neetproject/10/static/app/page/lab/template.html',
      1 => 1410881944,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '409306401541321177696b7-37090187',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_54132117796839_28253481',
  'variables' => 
  array (
    'labonshow' => 0,
    'curdata' => 0,
    'labdata' => 0,
    'rs' => 0,
  ),
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_54132117796839_28253481')) {function content_54132117796839_28253481($_smarty_tpl) {?><div class="page_lab p_nm p_nsh <?php echo $_smarty_tpl->tpl_vars['labonshow']->value;?>
" data-node="mainbox">
	<section class="wrap labcont">
		<header class="labhead">
			<h1 class="lab_title" data-node="title"><?php echo $_smarty_tpl->tpl_vars['curdata']->value['title'];?>
</h1>
			<div class="lab_func">
				<a target="_blank" title="新窗口打开" href="<?php echo $_smarty_tpl->tpl_vars['curdata']->value['link'];?>
" data-node="blank">&#x21f1;</a>
				<a title="刷新" data-node="refresh">&#x21bb;</a>
				<a title="关闭" href="/lab">&#x00d7;</a>
			</div>
		</header>
		<iframe class="iframe" src="<?php echo $_smarty_tpl->tpl_vars['curdata']->value['link'];?>
" data-node="labiframe"></iframe>
	</section>
	<section class="wrap labbox scrollbox">
		<h1 class="f_line" style="display:none;">lab list</h1>
		<div class="labtop">
			<input class="search" data-node="search" type="text" placeholder="keyword" />
		</div>
		<ul class="list clearfix">
			<?php  $_smarty_tpl->tpl_vars['rs'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['rs']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['labdata']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['rs']->key => $_smarty_tpl->tpl_vars['rs']->value){
$_smarty_tpl->tpl_vars['rs']->_loop = true;
?>
			<li class="lab" data-labid="<?php echo $_smarty_tpl->tpl_vars['rs']->value['id'];?>
" data-node="labview" data-link="<?php echo $_smarty_tpl->tpl_vars['rs']->value['link'];?>
" data-tag="<?php echo $_smarty_tpl->tpl_vars['rs']->value['tags'];?>
 <?php echo $_smarty_tpl->tpl_vars['rs']->value['title'];?>
 <?php echo $_smarty_tpl->tpl_vars['rs']->value['about'];?>
">
				<a href="/lab/<?php echo $_smarty_tpl->tpl_vars['rs']->value['id'];?>
">
					<figure class="unit">
						<img class="view" src="<?php echo $_smarty_tpl->tpl_vars['rs']->value['image'];?>
" alt="" />
						<figcaption class="mask">
							<h2 class="mask_title" data-title="<?php echo $_smarty_tpl->tpl_vars['rs']->value['title'];?>
" title="<?php echo $_smarty_tpl->tpl_vars['rs']->value['title'];?>
"><?php echo $_smarty_tpl->tpl_vars['rs']->value['title'];?>
</h2>
							<p class="mask_date"><?php echo $_smarty_tpl->tpl_vars['rs']->value['date'];?>
</p>
							<p class="mask_text"><?php echo $_smarty_tpl->tpl_vars['rs']->value['about'];?>
</p>
						</figcaption>
					</figure>
				</a>
			</li>
			<?php }
if (!$_smarty_tpl->tpl_vars['rs']->_loop) {
?>
			<li class="lab" data-labid="13" data-node-test="labli" data-node="labview" data-link="http://npkit.sinaapp.com/data/colorName.html" data-tag="color 颜色名称查询 无聊做了个查询颜色名称的东西....">
				<a href="/lab/13">
					<figure class="unit">
						<img class="view" src="http://ww1.sinaimg.cn/bmiddle/94fef42egw1efqtkrrc3cj21kw0v1tjk.jpg" alt="">
						<figcaption class="mask">
							<h2 class="mask_title" data-title="颜色名称查询">颜色名称查询</h2>
							<p class="mask_date">2014-04-24 17:59:21</p>
							<p class="mask_text">无聊做了个查询颜色名称的东西....</p>
						</figcaption>
					</figure>
				</a>
			</li>
			<?php } ?> 
		</ul>
	</section>
</div><?php }} ?>