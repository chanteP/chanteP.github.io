var fs = require('fs');
var path = require('path');
var named = require('vinyl-named');
var gulp = require('gulp');
var gulpLoadPlugin = require('gulp-load-plugins');

module.exports = ({srcDir, destDir}) => {
    return {
        shrinkDir : (file) => {
            var filename;
            filename = file.dirname;
            file.dirname = '';
            file.basename = file.basename.replace(/index/, filename);
        },
        webpack : (watch = true) => {
            return $.webpack({
                watch: watch,
                context : path.join(__dirname, srcDir),
                module: {
                    loaders: [
                        { test: /\.css$/, loader: 'style!css' },
                        { test: /\.html$/, loader: 'html' },
                        { test: /\.scss$/, loader: 'style!css!sass' },
                        {
                          test: /\.jsx?$/,
                          exclude: /(node_modules|bower_components)/,
                          loader: 'babel'
                        }
                    ]
                },
                resolve:{
                    extensions: ["", ".json", ".js", ".coffee", ".ls", ".jsx", ".scss", ".css", ".html"]
                },
                resolveLoader: {
                      modulesDirectories: [
                          path.join(__dirname, './node_modules')
                      ]
                }
            });
        },
        vnamed : (base) => {
            return named((file) => {
                return path.relative(__dirname + '/' + base, file.path).replace(/\.[\w]*$/, '');
            })
        },
        buildSass : () => {
            return $.sass({
                outputStyle: 'nested', // libsass doesn't support expanded yet
                precision: 10,
                includePaths: ['.'],
                onError: (e) => {
                    console.error('\033[31m [sass error]', e.message, '\033[0m');
                }
            })
        },
        insertStyle : () => {
            return $.replace(/<style>@import\surl\(\'([\w\.\/\-\+]+)\'\);<\/style>/g, (str, url) => {
                var uri = destDir.slice(0, -1) + url;
                var content = '';
                if(fs.existsSync(uri)){
                    content = fs.readFileSync(uri);
                }
                return '<style>' + content + '</style>';
            })
        },
        parseInclude : () => {
            return $.replace(/\{%\sinclude\s([\w\/\.\-\+]+)\s%\}/g, (text, file) => {
                var url = srcDir + 'includes/' + file;
                if(!fs.existsSync(url)){
                    return text;
                }
                return fs.readFileSync(url);
            })
        }
    }
}