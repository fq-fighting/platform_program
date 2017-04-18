import React,{Component} from "react";
import { connect } from "react-redux";
import { Tabs, Button,Breadcrumb } from 'antd';
import TabsAct from '../actions/TabsAct';

import BomListCont from './BomListCont';
import BomAddCont from './BomAddCont';
import BomEditCont from './BomEditCont';
import BomDetailCont from './BomDetailCont';
import BomCopyCont from './BomCopyCont';
import BomUpgradeCont from './BomUpgradeCont';


const TabPane = Tabs.TabPane;
class TabsCont extends Component{
    constructor(prop){
        super(prop);
        this.breadcrums = [{
            key:"bomList",
            breadcrum:["Bom管理","Bom列表"]
        },{
            key:"add",
            breadcrum:["Bom管理","新建Bom"]
        },{
            key:"edit",
            breadcrum:["Bom管理","编辑Bom"]
        },{
            key:"detail",
            breadcrum:["Bom管理","Bom详情"]
        },{
            key:"copy",
            breadcrum:["Bom管理","Bom复制"]
        },{
            key:"upgrade",
            breadcrum:["Bom管理","Bom升级"]
        }]
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    remove = (targetKey) => {
        let { tabs,activeKey,tabRemove } = this.props;
        let lastIndex;
        tabs.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const _tabs = tabs.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = _tabs[lastIndex].key;
        }
        tabRemove(targetKey,activeKey);
    }
    getContent= (tab) =>{
        switch (tab.key) {
            case "bomList":
                return <BomListCont/>
                break;
            case "add":
                return <BomAddCont/>
                break;
            case 'edit':
                return <BomEditCont/>
                break;
            case 'detail':
                return <BomDetailCont/>
                break;
            case 'copy':
                return <BomCopyCont/>
                break;
            case 'upgrade':
                return <BomUpgradeCont/>
                break;
            default:
                return null;
        }
    }
    render(){
        const {tabs,activeKey,tabChange} = this.props;
        let _breadcrums = undefined;
        if(activeKey){
            _breadcrums = this.breadcrums.find(item => item.key == activeKey);
        }
        return (
            <div>
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>你所在的位置</Breadcrumb.Item>
                            {
                                _breadcrums!=undefined?_breadcrums.breadcrum.map((item,index)=>{
                                    return (<Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>)
                                }):null
                            }
                        </Breadcrumb>
                    </div>
                </div>
                <div className="ew-tabs">
                    <Tabs
                        animated={false}
                        hideAdd
                        onChange={tabChange}
                        activeKey={activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                        >
                        {
                            tabs.map(pane => 
                                <TabPane tab={pane.title} key={pane.key}>
                                    {this.getContent(pane)}
                                </TabPane>
                            )
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabChange: (activeKey) => {
        dispatch(TabsAct.TabChange(activeKey));
    },
    tabRemove: (key,activeKey) =>{
        dispatch(TabsAct.TabRemove(key,activeKey));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(TabsCont);