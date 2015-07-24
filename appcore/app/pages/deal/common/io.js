var lockMap = {};
var query = function(url, data, succFunc, errFunc, config){
    config = $.extend({
        url : url,
        data : data,
        type : 'get',
        lock : true,
        success : function(data){
            lockMap[config.url] = false;
            if(data.status !== 1){
                errFunc(data.message || '数据获取失败');
                return;
            }
            succFunc && succFunc(data.data);
        },
        error : function(){
            lockMap[config.url] = false;
            errFunc && errFunc('');
        }
    }, config || {});

    if(config.lock){
        if(lockMap[config.url]){
            return;
        }
        else{
            lockMap[config.url] = true;
        }
    }
    else{
        lockMap[config.url] = false;
    }

    return $.ajax(config);
};
module.exports = {
    post : function(url, data, succFunc, errFunc, config){
        config = config || {};
        config.type = 'post';
        return query(url, data, succFunc, errFunc, config);
    },
    get : function(url, data, succFunc, errFunc, config){
        return query(url, data, succFunc, errFunc, config);
    }
}