var exec = require('child_process').exec;

module.exports = function(callback){
    exec('rm -r temp', callback || function(){});
}