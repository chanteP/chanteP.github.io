var React = require('../../react');
module.exports = function(node, list, current){
    list = Array.isArray(list) ? list : [];
    return React.render(
            <div className="m-controls-select">
                <ul>
                    {list.map(function(item, i){
                        var className = (item && item.className) ? item.className : '';
                        return (
                            <li key={i} data-index={i} data-act="select" className={className + (i === current ? ' current' : '')}>
                                {(typeof item === 'string' || typeof item === 'number') ? item : item.text}
                            </li>
                        );
                    })}
                </ul>
            </div>
        , node);
}