var dataAPI;
var findInArr = function(arr, id, key){
    var item, index;
    arr.some(function(cur, i){
        if(cur[key] + '' === id + ''){
            item = cur;
            index = i;
            return true;   
        }
    });
    return {item, index};
}
var className = 'scarlet-red';
module.exports = function(dataHandler, editable){
    if(editable){return;}
    dataAPI = dataHandler;
    dataAPI.onload(function(){
        $('[data-for="poi"][data-while="1"]')[dataAPI.get('change.pois.length') ? 'addClass' : 'removeClass'](className);

        ['1', '2'].forEach(function(typeId){
            (dataAPI.get(`change.photos.${typeId}`) || []).forEach(function(id){
                var {item, index} = findInArr(dataAPI.get(`photos.${typeId}`) || [], id, 'id');
                if(item){
                    $(`[data-photocontent="${typeId}"] [data-value="${index}"]`).addClass(className);
                }
            })
        });

        (dataAPI.get('change.attributeIds') || []).forEach(function(id){
            $(`[data-attrid*="${id}"]`).addClass(className);
        });
    });
}