var args = process.argv.slice(2);

if(args.indexOf('publish') >= 0){
    require('./dev/bin/package')();
    require('./dev/bin/build')();
}
else if(args.indexOf('clean') >= 0){
    require('child_process').exec('rm -r static');
    require('child_process').exec('rm -r page');
    require('./dev/bin/tabs').forEach(function(tab){
        require('child_process').exec('rm ' + tab + '.html');
    });
}
else{
    require('./dev/bin/package')(true);
    require('./dev/bin/server');
}