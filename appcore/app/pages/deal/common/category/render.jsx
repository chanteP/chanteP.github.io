module.exports = function(node, showList, currentId){
    return React.render(
        <div className="category-outer">
            <div className="category-desc" data-node="categoryDesc">
                <div>
                    <p>费率说明：美团从您售卖的服务中收取的服务费，即扣点。</p>
                </div>
            </div>
            <div className="category-cont clearfix" data-node="categoryContent">
                {
                    showList.map(function(levelList, i){
                        return (
                            <ul className={i < 1 ? 'category-left' : 'category-right'} data-level={i + 1} key={i}>
                                {
                                    levelList.map(function(item){
                                        return currentId[i] === item.id ? (
                                                <li key={item.id} data-id={item.id} className="current">
                                                    {item.name + (item.priceRate ? ' (费率'+item.priceRate+'％)' : '')}
                                                </li>
                                            ) : (
                                                <li key={item.id} data-id={item.id}>
                                                    {item.name + (item.priceRate ? ' (费率'+item.priceRate+'％)' : '')}
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    , node);
}
