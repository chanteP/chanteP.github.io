module.exports = function(file, data, succFunc, errFunc){
    if(!file){
        errFunc && errFunc('请选择文件');
    }
    //TODO MIME?
    if(!file.name || !/\.(jpg|jpeg|png|bmp|gif)$/.test(file.name.toLowerCase())){
        errFunc && errFunc('文件格式目前只支持jpg、jpeg、png、bmp、gif');
        return;
    }

    var formData = new FormData();
    formData.append('dealId', data.dealId);
    formData.append('typeId', data.typeId);
    // formData.append('name', '');
    formData.append('serviceItemId', data.serviceItemId || '');
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('post', '/photo/upload.json', true);
    xhr.onload = function(){
        var data = JSON.parse(this.response);
        if(data.status){
            succFunc && succFunc(data.data);
        }
        else{
            errFunc && errFunc(data.message);
        }
    }
    xhr.onerror = function(){
        errFunc && errFunc('');
    }
    xhr.send(formData);
}