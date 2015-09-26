
var program = require('commander');
 
program
    .version('0.0.1')
    .option('-d, --dev', 'develop env')
    .option('-s, --server', 'develop server')
    .option('-c, --clean', 'clean development folder')
    .option('-m, --deploy', 'deploy master')
    .option('-k, --fake', 'deploy master with server')
    .parse(process.argv);

var cleanup = function(callback){
    require('child_process').exec('rm -r temp', callback || function(){})
}
 
if(program.deploy){
    cleanup(function(){
        require('./deployMaster')();
    }); 
}
else if(program.clean){
    cleanup(function(){
    }); 
}
else if(program.dev){
    cleanup(function(){
        require('./deployDevelop')();
    });   
}
