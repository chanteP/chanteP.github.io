var sass = require('node-sass');
module.exports = function(src){
    var stats = {};
    return sass.renderSync({
        file : src,
        outputStyle: 'compressed',
        stats: stats
    });
}