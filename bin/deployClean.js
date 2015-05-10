var exec = require('child_process').exec;

module.exports = function(callback){
    exec('rm -r built', callback || function(){});
}