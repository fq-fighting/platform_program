import React,{Component} from "react";
import { connect } from "react-redux";
import TabsAct from '../actions/TabsAct';
import { Menu, Icon } from '../../base/components/AntdComp';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class LayoutSider extends Component{
    constructor(prop){
        super(prop);
    }
    handleClick =(e)=>{
        this.props.tabAdd(e);
    }
    render(){
        const {mode} = this.props;
        return (
            <Menu 
                defaultOpenKeys={["bom"]}
                selectedKeys={[this.props.activeKey]}
                onClick={this.handleClick}
                mode={mode}>
                <SubMenu key="bom" title={<span><Icon type="mail" /><span className="nav-text">BOM管理</span></span>}>
                    <Menu.Item key="bomList" title="BOM列表">BOM列表</Menu.Item>
                    <Menu.Item key="add" title="新建BOM">新建BOM</Menu.Item>
                    <Menu.Item key="edit" title="编辑BOM">编辑BOM</Menu.Item>
                    <Menu.Item key="detail" title="BOM详情">BOM详情</Menu.Item>
                    <Menu.Item key="copy" title="BOM复制">BOM复制</Menu.Item>
                    <Menu.Item key="upgrade" title="BOM升级">BOM升级</Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
const mapStateToProps = (state) => {
    return state.TabsRedu.toJS();
}
const mapDispatchToProps = (dispatch) => ({
    tabAdd:(e) => {
        dispatch(TabsAct.TabAdd({
            title:e.item.props.title,
            key:e.key
        }));
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(LayoutSider);