<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="content-language" content="zh-CN" />
        
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
        <meta content="telephone=no" name="format-detection" />
        
        <title>${title!'商家自助'}</title>
        
        <link rel="stylesheet" href="/static/app/css/main.css" />
        <script src="/static/app/lib/react.js"></script>
        <script src="/static/app/lib/mithril.js"></script>
        <script src="http://jc.meituan.net/combo/?f=/mtdeal2/app/lib/zepto.js;/mtdeal2/app/lib/fastclick.js"></script>
        <script type="text/javascript">
            var $data = {
                cos_gaAccount : 'UA-28174807-20'
            };
        </script>
    </head>
    <body class="loading">
<div class="wrapper" id="wrapper">
${body}
</div>
${script}
<script type="text/javascript">
window.addEventListener('load', function() {
    var androidVer = /Android\s([\d]+)\b/i.exec(navigator.userAgent);
    if(androidVer && +androidVer[1] < 4){
        document.body.innerHTML = '<h3 style="padding-top:1rem;text-align:center;">安卓系统版本太低，暂不支持</h3>';
    }
    document.body.className = document.body.className.replace('loading', '');
});
</script>
    </body>
</html>
