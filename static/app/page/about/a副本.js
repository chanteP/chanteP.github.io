.page_about{
	position: relative;
	background: #ccc repeat;
	/*background: #fcc repeat;*/
	/*background-image: radial-gradient(#fff, #fff 40%, transparent 44%);;*/
	background-size:60px 60px;
	transition:box-shadow .3s ease .5s;
}
[data-cur] .page_about{
	box-shadow: rgba(0,0,0,.1) 0 0 300px inset;
}
.info{
	position: absolute;
	right: 0;
	bottom: 0;
	width: 100%;
	text-align: right;
}
.info dl{
	padding: 0 2%;
	margin: 5% 5%;
	line-height: 1.8;
	color:#666;
	border-bottom: 1px #666 solid;
}
.page_about ::selection{
    background: #999;
    color: #fff;
}
