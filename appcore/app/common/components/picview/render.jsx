module.exports = function(base){
    return function(node, list, index, config){
        var btnStyle = {
                width : 100 / config.btnList.length + '%'
            };
        var maincontStyle = {
            height : base.screen.height - 194 * base.screen.pixelRatio
        };
        var delBtnStyle = {
            display : config.del ? '' : 'none'
        }
        index = Math.max(0, Math.min(index, list.length - 1));

        React.render(
            <div className="view-wrap">
                <div className="view-head" data-node="counter">{Math.min(list.length, Math.max(+index+1, 0))}/{list.length}</div>
                <div className="view-list">
                    <div className="view-thumblist">
                        <ul data-node="photoCont">
                            {
                                list.map(function(photo, i){
                                    return (
                                        <li key={i+1} data-act="select" data-value={i} className={i === +index ? "current" : ''}>
                                            <img className="img" src={photo.thumb || photo.src || ''} />
                                            <div data-act="del" style={delBtnStyle}><span>×</span></div>
                                        </li>
                                    )
                                }).concat(
                                    config.upload && config.max && config.max > list.length ? 
                                        <li key="0"><label className="view-holder" gaevent={config.gaevent || ''}><input type="file" data-node="uploader" className="hidden" /></label></li> : 
                                        []
                                )
                            }
                        </ul>
                    </div>
                    <div className="view-btnbox clearfix" data-node="btnbox">
                        {
                            config.btnList.map(function(btn, i){
                                return <label key={i} data-actid={i} style={btnStyle} dangerouslySetInnerHTML={{__html:'<a>'+btn.text+'</a>'}}></label>
                            })
                        }
                    </div>
                </div>
                <div className="view-main mid" style={maincontStyle} data-node="imgCont">
                    <img className="midcont" data-node="showImg" src={list[index] ? list[index].src : '/static/app/images/nopic.png'} />
                </div>
            </div>
        , node);
    }
}