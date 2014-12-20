var args = process.argv.slice(2);

if(args.indexOf('dev') >= 0){
    require('./bin/package').dev();
    require('./bin/server');
}
else{
    require('./bin/package').build(function(){
        require('./bin/build')();
    });
}