var program = require('commander');
 
program
    .version('0.0.1')
    .option('-d, --dev', 'develop env')
    .option('-s, --server', 'develop server')
    .option('-c, --clean', 'clean development folder')
    .option('-m, --deploy', 'deploy master')
    .option('-k, --fake', 'deploy master with server')
    .parse(process.argv);

var cleanup = (callback) => {
    require('child_process').exec('rm -r temp', callback || () => {})
}
 
if(program.deploy){
    cleanup(() => {
        require('./deployMaster')();
    }); 
}
else if(program.clean){
    cleanup(() => {
    }); 
}
else if(program.dev){
    cleanup(() => {
        require('./deployDevelop')();
    });   
}
