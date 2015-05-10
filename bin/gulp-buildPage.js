var gutil = require('gulp-util');
var through = require('through2');
var pp = require('preprocess');

var fs = require('fs');

module.exports = function (options) {
    var targetDir = 'built';
    return through.obj(function (file, enc, cb) {
        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
              this.push(file);
              return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
              this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
              return cb();
        }

        // 将文件内容转成字符串，并调用 preprocess 组件进行预处理
        // 然后将处理后的字符串，再转成Buffer形式
        var content = pp.preprocess(file.contents.toString(), options || {});

        var cssLink = /<style>@import url\("([\w\-\/\.]+)"\);<\/style>/.exec(content);
        var jsLink = /<style>@import url\("([\w\-\/\.]+)"\);<\/style>/.exec(content);

        content = content.replace(/<style>@import url\("([\w\-\/\.]+)"\);<\/style>/, function(match, g1){
                if(fs.existsSync(targetDir + g1)){
                    return '<style>' + fs.readFileSync(targetDir + g1) + '</style>';
                }
                return match;
            }).replace(/<script src="([\w\-\/\.]+)"\)"><\/script>/, function(match, g1){
                if(fs.existsSync(targetDir + g1)){
                    return '<script>' + fs.readFileSync(targetDir + g1) + '</script>';
                }
                return match;
            });


        file.contents = new Buffer(content);


        // 下面这两句基本是标配啦，可以参考下 through2 的API
        this.push(file);

        cb();
    });
};