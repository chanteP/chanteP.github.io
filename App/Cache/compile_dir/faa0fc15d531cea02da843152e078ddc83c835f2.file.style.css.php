<?php /* Smarty version Smarty-3.1.14, created on 2014-09-11 01:07:22
         compiled from "/Volumes/LINKAREA/web/neetproject/10/static/app/page/home/style.css" */ ?>
<?php /*%%SmartyHeaderCode:122266542054035406263440-88728715%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'faa0fc15d531cea02da843152e078ddc83c835f2' => 
    array (
      0 => '/Volumes/LINKAREA/web/neetproject/10/static/app/page/home/style.css',
      1 => 1410368842,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '122266542054035406263440-88728715',
  'function' => 
  array (
  ),
  'version' => 'Smarty-3.1.14',
  'unifunc' => 'content_5403540626cf28_38124291',
  'has_nocache_code' => false,
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_5403540626cf28_38124291')) {function content_5403540626cf28_38124291($_smarty_tpl) {?>.page_home{
	background: none #fff no-repeat;
	background-image: linear-gradient(0deg, rgba(0,0,100,.1), transparent 50%);
	background-size:100% 100%;
	overflow: hidden;
}
.page_home .title{
	font-size: 94px;
	font-weight: 100;
	line-height: .9;
	text-transform: uppercase;

    background: none #333 no-repeat;
    /*background-image: url('../images/bg.jpg');*/
    background-size: 100% auto;
	background-position: center 63%;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

}
@media screen and (max-width : 750px){
	.page_home .title{
		font-size: 70px;
	}
}

.page_home .wrap{
	position: relative;
	width: 100%;
	top:38%;
}
@media screen and (max-width : 750px){
	.page_home .wrap{
		position:absolute;
		bottom: 3em; 
	}
}
.page_home .desc{
	text-indent: 1em;
	padding-top: 4px;
	padding-bottom: 4px;
	color: #333;
	/*background: #333;*/
	font-size: 12px;
}
.page_home .dec{
	width: 0;
	transition: width 2s ease;
	border-bottom: 1px solid #333;
}
[data-cur] .page_home .dec{
	width: 100%;
}
.page_home .nav{
	padding-top: 10px;
	overflow: hidden;
}
.page_home .navlist{
	float: left;
	width: 14em;
	min-width: 6em;
	margin-left: 8px;
}
@media screen and (max-width : 750px){
	.page_home .navlist{
		width: 32%;
	}
}
.page_home .navlist li{
	display: block;
	border-left:3px solid #333;
	transition:border-color .2s ease;
}
.page_home .navlist li:hover{
	border-left-color:#f90;
}
.page_home .navlist li:first-child{
	border-left-color:#f90;
}
.page_home .navlist li.dis{
	text-decoration: line-through;
}

.page_home .navlist li.dis:active{
	-webkit-animation: "hl_dis" .5s linear 2;
}
@-webkit-keyframes "hl_dis"{
	0% {
		border-left-color:#f90;
	}
	50% {
		border-left-color:#f00;
	}
	100% {
		border-left-color:#f90;
	}
}

.page_home .navlist a{
	display: block;
	padding: 6px 10px;
	text-decoration: none;
	color: #333;
}<?php }} ?>