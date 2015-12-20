/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
var gaAccount;

function loadUA() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', gaAccount, 'auto');
    ga('send', 'pageview');
}
module.exports = function($){
    gaAccount = $config.cos_gaAccount;
    if(!gaAccount || $.isLocalhost){return;}
    loadUA();
    return {
        ga : ga
    }
}

