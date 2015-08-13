// var args = process.argv.slice(2);
// if(!(__dirname.slice(-3) == 'dev')){
//     if(args.indexOf('dev') >= 0){
//         require('./dev/bin/package')();
//         require('./dev/bin/build')(true);
//     }
//     else if(args.indexOf('publish') >= 0){
//         require('./dev/bin/package')();
//         require('./dev/bin/build')();
//     }
//     else if(args.indexOf('clean') >= 0){
//         clean();
//     }
//     else{
//         require('./dev/bin/package')(true);
//         require('./dev/bin/server');
//     }
//     function clean(){
//         require('child_process').exec('rm -r static');
//         require('child_process').exec('rm -r pages');
//         require('./dev/bin/tabs').forEach(function(tab){
//             require('child_process').exec('rm ' + tab + '.html');
//         });
//     }
// }

var program = require('commander');
 
program
  .version('0.0.1')
  .option('-d, --dev', 'develop env')
  .option('-c, --clean', 'clean development folder')
  .option('-m, --deploy', 'deploy master')
  .parse(process.argv);
 
if(program.deploy){
    require('./deployClean')(function(){
        require('./deployMaster')();
    }); 
}
else if(program.clean){
    require('./deployClean')(function(){
    }); 
}
else{
    require('./deployClean')(function(){
        require('./deployDevelop')();
        require('./deployServer')();
    });   
}
