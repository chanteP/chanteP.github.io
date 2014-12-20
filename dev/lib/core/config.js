var config = {
    debug : true

    ,'expHead' : '[['
    ,'expFoot' : ']]'

    ,DOMPrefix : 'data-'
    ,initDOM : false

    ,apiHost : 'http://neetproject.sinaapp.com'

    ,isMobileMode : document.documentElement.clientWidth <= 750

};
module.exports = config;