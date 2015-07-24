var PoiList = React.createClass({
    getInitialState : function(){
        console.log('init')
        return {
            list : this.props.list,
            value : this.props.value,
            valueMap : (function(arr){
                var map = {};
                arr.forEach(function(item, i){
                    map[item.id] = 1;
                });
                return map;
            })(this.props.value || []),
            show : this.props.config.show,
            verifiable : this.props.config.verifiable
        }
    },
    getValue : function(){
        return this.state.value;
    },
    setChecked : function(e){
        var bool = e.currentTarget.checked,
            id = e.currentTarget.value;
        var self = this;
        if(bool){
            this.state.valueMap[+id] = 1;
            this.props.list.some(function(item){
                if(+item.id === +id){
                    self.state.value.push(item);
                    return true;
                }
            });
        }
        else{
            if(this.state.valueMap[+id]){
                delete this.state.valueMap[+id];
                this.state.value.some(function(item, i){
                    if(+item.id === +id){
                        self.state.value.splice(i, 1);
                        return true;
                    }
                });
            }
        }
        //this.forceUpdate();
    },
    setShow : function(e){
        var bool = +e.currentTarget.checked,
            id = e.currentTarget.value;
        this.state.value.some(function(item){
            if(+item.id === +id){
                item.show = bool;
                return true;
            }
        })// && this.forceUpdate();
    },
    setVerifiable : function(e){
        var bool = +e.currentTarget.checked,
            id = e.currentTarget.value;
        this.state.value.some(function(item){
            if(+item.id === +id){
                item.verifiable = bool;
                return true;
            }
        })// && this.forceUpdate();
    },
    buildTips : function(){
        return this.props.config.show || this.props.config.verifiable ?
            (<div className="poi-tips">
                <p>验券：设置该门店验不验券</p>
                <p>显示：设置团购详情页上显示门店电话、地址等。</p>
            </div>) : 
            '';
    },
    buildList : function(){
        var self = this;
        var show = this.state.show,
            verifiable = this.state.verifiable;
        return this.props.list.map(function(poi, i){
            var checked = self.state.valueMap[+poi.id];
            //TODO 抽抽抽
            return (
                <li className="poi form-item" key={poi.id}>
                    <div className="poi-side-info">
                        <label>
                            <div className="poi-side-check mid">
                                <div className="midcont">
                                    <input type="checkbox" className="ui-checkbox" name="poi" data-index={i} value={poi.id} id={"poi" + poi.id} defaultChecked={checked} onChange={self.setChecked} />
                                    <span>&nbsp;</span>
                                </div>
                            </div>
                            <dl>
                                <dt>{poi.name || ''}</dt>
                                <dd>{poi.address || ''}</dd>
                            </dl>
                        </label>
                        {
                            (show || verifiable) ? 
                                <div className="poi-btnbox show">
                                    {
                                        show ? <label className="poi-cfgbtn"><input type="checkbox" value={poi.id} defaultChecked={!!+poi.show} onChange={self.setShow}/><span className="btn line">显示</span></label> : ''
                                    }
                                    {
                                        verifiable ? <label className="poi-cfgbtn"><input type="checkbox" value={poi.id} defaultChecked={!!+poi.verifiable} onChange={self.setVerifiable}/><span className="btn line">可验券</span></label> : ''
                                    }
                                </div>
                            :
                            ''
                        }
                    </div>
                </li>
            );
        });
    },
    render : function(){
        return (
            <div className="page-content">
                {this.buildTips()}
                <div>
                    <ul>{this.buildList()}</ul>
                </div>
            </div>
            )
    }
});
module.exports = function(node, list, value, config){
    return React.render(
        <PoiList list={list} value={value} config={config} />
        , node);
}