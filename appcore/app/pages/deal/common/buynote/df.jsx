var DynamicForm = require('../../../../lib/dynamicform');

module.exports = function(content, meta, data){
    var buildData = {};
    meta.forEach(function(item){
        if(item.name in data){
            buildData[item.name] = data[item.name];
        }
    });
    return React.render(
        <DynamicForm data={buildData} meta={meta}/>,
        content
    );
}



