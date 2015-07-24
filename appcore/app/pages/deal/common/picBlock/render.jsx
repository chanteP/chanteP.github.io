module.exports = function(node, photoList, config){
    config = config || {};
    var typeId = config.typeId;
    var delBtnStyle = {display:config.del?'':'none'};
    return React.render(
        <div>
            <div className="form-item-title" gaevent={typeId == 2 ? "InnerLink|Click|/project/edit/pcPic/reminder" : ''}>
                {config.name + ' （'+photoList.length+'/'+config.max+'）'}
                <span className="fa fa-question-circle"></span>
            </div>
            <div className="form-item-content">
                <ul data-node="photoCont">
                    {
                        photoList.map(function(photo, i){
                            return (
                                <li key={i+1} data-value={i}>
                                    <div className="mid picunit">
                                        <img className="midcont" src={photo.thumbnailUrl || ''} data-typeid={typeId} data-value={i}  gaevent="InnerLink|Click|/project/edit/bigPic" />
                                        <div data-act="del" style={delBtnStyle}>
                                            <span>×</span>
                                        </div>
                                    </div>
                                </li> 
                            )
                        }).concat(
                            config.upload && config.max && config.max > photoList.length ? 
                                config.max > 1 ?
                                    (
                                        <li key="0">
                                            <div className="mid picunit">
                                                <label className="midcont view-holder">
                                                    <input type="file" data-node="uploader" data-typeid={typeId} multiple="multiple" className="hidden" />
                                                </label>
                                            </div>
                                        </li>
                                    ) : 
                                    (
                                        <li key="0">
                                            <div className="mid picunit">
                                                <label className="midcont view-holder">
                                                    <input type="file" data-node="uploader" data-typeid={typeId} className="hidden" />
                                                </label>
                                            </div>
                                        </li>
                                    ) : 
                                []
                        )
                    }
                </ul>
            </div>
        </div>
        , node);
}