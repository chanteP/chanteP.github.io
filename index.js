var args = process.argv.slice(2);

if(args.indexOf('dev') >= 0){
    require('./dev/bin/package').dev();
    // require('./dev/bin/build')();
    // require('./dev/bin/server');
}
// else{
//     require('./bin/package').build(function(){
//         require('./bin/build')();
//     });
// }