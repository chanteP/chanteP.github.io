/**
 * <p>给HTML标签添加gaevent属性,实现dom事件ga追踪</p>
 */
var body;

var gaAccount = $data.cos_gaAccount;

function loadUA() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', gaAccount, 'auto');
    ga('send', 'pageview');
}
function track(gConf) {
    $(body).on('click', '[gaevent]', function(e){
        var targetNd = e.target;
        trackGACustomEvent(targetNd);
    }, true);

    $(body).on('click', 'a', function(e){
        var targetNd = e.target;
        trackOutLink(targetNd);
    }, true);
}
/**
 * 处理自定义GA事件
 * @method trackGACustomEvent
 * @param { Node } nd DOM节点
 */
function trackGACustomEvent(nd) {
    var attr = nd.getAttribute('gaevent'),
        params,
        category,
        label,
        action,
        value;

    params = attr.split('|');
    if (params.length < 3) {
        category = 'InnerLink';
        action = 'Click';
        label = params[0];
        value = params[1];
    } else {
        category = params[0];
        action = params[1];
        label = params[2];
        value = params[3];
    }

    if (!label && nd.getAttribute('href')) {
        label = nd.getAttribute('href').replace('http://', '');
    }
    if (value) {
        window.ga && window.ga('send', 'event', category, action, label, value);
    } else {
        window.ga && window.ga('send', 'event', category, action, label);
    }
}
/**
 * 处理外链
 * @method trackOutLink
 * @param { Node } nd Node节点
 */
function trackOutLink(nd) {
    var link = nd.getAttribute('href'),
        reg = /^(http:\/\/|mailto:)/,
        index,
        label;

    if (link && reg.test(link)) {
        link = link.replace('http://', '');
        index = link.indexOf('?');
        label = nd.getAttribute('galbel');
        if (index > 0) {
            link = link.substring(0, index);
        }

        if (/\.(meituan|mt|sankuai)\.com/.test(link)) {
            // 跳过美团内部链接
            return;
        }

        if (label) {
            link += '#label=' + label;
        }

        window.ga && window.ga('send', 'event', 'OutLink', 'Click', link);
    }
}
module.exports = function(){
    if (gaAccount && window.location.href.indexOf('sh.e.meituan') >= 0 || window.location.search.indexOf('online_debug') >= 0){
        window.addEventListener('load', function(){
            loadUA();
            body = window.document.body;
            track();
        });
    }
}

