import React,{Component} from "react";
import { connect } from "react-redux";
import { Tabs, Button,Breadcrumb } from 'antd';
import TabsAct from '../actions/TabsAct';

import BusinessCont from './BusinessCont';
import SupplierCont from './SupplierCont';
import CustomerCont from './CustomerCont';




const TabPane = Tabs.TabPane;
class TabsCont extends Component{
    constructor(prop){
        super(prop);
        this.breadcrums = [{
            key:"position",
            breadcrum:["组织架构","职位"]
        },{
            key:"department",
            breadcrum:["组织架构","部门"]
        },{
            key:"member",
            breadcrum:["员工管理"]
        },{
            key:"authority",
            breadcrum:["权限管理"]
        },{
            key:"address",
            breadcrum:["系统管理","地址管理"]
        },{
            key:"site",
            breadcrum:["系统管理","站点管理"]
        },{
            key:"basedata",
            breadcrum:["系统管理","基础数据"]
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
            case "customer":
                return <CustomerCont />
                break;
            case "supplier":
                return <SupplierCont />
                break;
            case 'business':
                return <BusinessCont />
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