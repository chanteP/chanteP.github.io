var React = require('../../react');
module.exports = function(node, config){
    var btnStyle = {
            width : 100 / config.button.length + '%' 
        },
        buttonBoxStyle = {
            display : config.button && config.button.length ? 'block' : 'none'
        },
        titleBoxStyle = {
            display : config.title ? 'block' : 'none'
        };
    React.render(
        <div className="midcont">
            <div className="dia-wrap">
                <div>
                    <h1 className="dia-head" data-node="title"  style={titleBoxStyle}>{config.title}</h1>
                </div>
                <div className="dia-content" data-type={config.type} data-node="content">
                </div>
                <div className="dia-btnbox" data-node="btnbox" style={buttonBoxStyle}>
                    {
                        config.button.map(function(btn, i){
                            return (
                                <div key={i} className={"dia-btn " + btn.style} style={btnStyle}>
                                    <a data-diabtnid={i}>
                                        {btn.text}
                                    </a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    , node);
}