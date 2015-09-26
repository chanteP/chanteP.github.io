var drawer = new Drawer;
var callDrawer = (e) => {
    drawer.setContent('123123123');
    drawer.show();
});

var options = [], num = 20;
while(num){
    options.unshift(num--);
}
// var select = new Select;
var options1 = [].concat(options);
var callSelect = (e) => {
    Select.show(
        3, 
        options1,
        (item, index) => {
            console.log('haha', item, index)
        },
        'fxxk'
    );
});
var options2 = [].concat(options.reverse());
var callSelectNoTitle = (e) => {
    Select.show(
        3, 
        options2,
        (item, index) => {
            console.log('hehe', item, index)
        },
        null
    );
});
// var select = new Select;
var callMask = (e) => {
    Mask.show(50);
    setTimeout(()=>{
        Mask.hide();
    }, 1200)
});

// var select = new Select;
var callDialog = (e) => {
    Dialog.show({
        title : '什么鬼',
        type : 'info',
        content : '什么鬼'
    }, true);
});

// var select = new Select;
var callMaskTips = (e) => {
    MaskTips.show({
        icon : 'loading',
        text : '什么鬼'
    }, true);
});

export default (node) => {
    React.render(
        <div>
            <div><label><a onClick={callDrawer || function(){}}>Drawer</a></label></div>
            <div><label><a onClick={callSelect || function(){}}>Select</a></label></div>
            <div><label><a onClick={callSelectNoTitle || function(){}}>SelectNoTitle</a></label></div>
            <div><label><a onClick={callDialog || function(){}}>Dialog</a></label></div>
            <div><label><a onClick={callPicview || function(){}}>Picview</a></label></div>
            <div><label><a onClick={callMask || function(){}}>Mask</a></label></div>
            <div><label><a onClick={callMaskTips || function(){}}>MaskTips</a></label></div>
        </div>
    , node);
}