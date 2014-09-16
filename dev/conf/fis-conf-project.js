//fis release -pmd ./public
// fis.config.set('modules.postpackager', 'simple');
//开始autoCombine可以将零散资源进行自动打包
// fis.config.set('settings.postpackager.simple.autoCombine', true);
//开启autoReflow使得在关闭autoCombine的情况下，依然会优化脚本与样式资源引用位置
// fis.config.set('settings.postpackager.simple.autoReflow', true);

fis.config.set('roadmap.domain', 'http://127.0.0.1/neetproject/10/static');

fis.config.set('roadmap.path', [
    {
        reg: /(.*)\b(release|map\.json)\b(.*)/i,
        release : false
    },
    {
        reg: /^\/conf\/(.*)/i,
        release : false
    },
    {
        reg: /^\/admin\/(.*)/i,
        release : false
        // release : 'admin/$1',
        // useHash : false
    },
    {
        reg: /^\/lib\/([^\/]+)\/(.*)$/i,
        release : false
    },
    {
        reg: /^\/?([^\/]*)?\/(?:.*)\/([\w\W]+)(?:jpg|jpeg|png|font|svg|psd)$/i,
        // url: '{$root}/static/$1/resource/$2',
        useDomain : true,
        release : '$1/resource/$2'
    },
    {
        reg: /^\/?app\/page\/(.*)$/i,
        // release : 'app/page/$1',
        useHash : false
    },
    {
        reg: /^\/?(.*)/i,
        // url: '{$root}/static/$1',
        useDomain : true,
        release : '$1'
    }
]);

//在postprocessor对所有js后缀的文件进行内容处理：
// fis.config.set('modules.postprocessor.js', function(content, file){
//     //只对模块化js文件进行包装
//     if(file.isComponents || file.isComponentModules){
//         content = 'define("' + file.id + 
//                   '", function(require,exports,module){' +
//                   content + '});';
//     }
//     return content;
// });

