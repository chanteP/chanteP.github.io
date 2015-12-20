/** track@alpha:{"version":"0.2.43","build":"2015-12-18 22:34:52","hash":""} */
/*
    错误控制&devkit
*/
export default ($) => {
    window.onerror = (e, filename, lineNo) => {
        console && console.log(e, 'filename:' + filename, 'lineNo:' + lineNo);
    }
    var kit = $.devkit;
    if(kit){
        var clog = console.log;
        var tempConsoleStorage = [];
        window.console.log = function(...args){
            tempConsoleStorage.push([...args]);
            Function.prototype.call.call(clog, console, ...args);
        }   
        $.domReady(() => {
            var panel = $.create([
                    '<div style="position:fixed;top:0;right:0;max-height:100%;overflow:hidden;z-index:999999;opacity:.4;pointer-events:none;">',
                        // '<label style=""><input type="text" /></label>',
                        '<ul style="margin:0;padding:0;">',
                            '<li></li>',
                        '</ul>',
                    '</div>'
                ].join(''));
            var list = panel.children[panel.children.length-1];
            var log = function(color, ...args){
                var msg = args.map((arg) => {
                    return (arg && arg.toString) ? arg.toString() : arg;
                }).join(' | ');
                var li = document.createElement('li');
                li.style.cssText = 'text-align:right;display:block;padding:.1rem .2rem;border-bottom:1px solid #ccc;background:rgba(255,255,255,.4);color:'+color+';font-size:.18rem;line-height:1.2;clear:both;word-break:break-all;';
                li.textContent = msg;
                list.insertBefore(li, list.firstChild);
            }
            document.body.appendChild(panel);
            tempConsoleStorage.forEach(([...args]) => {
                log('#00f', ...args);
            });

            window.console.log = function(...args){
                log('#00f', ...args);
                Function.prototype.call.call(clog, console, ...args);
            }
        });
    }

}