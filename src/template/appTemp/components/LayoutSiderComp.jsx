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
    /*getSubNav(nav){
        return (
            <Menu.Item key={nav.key}>{nav.title}</Menu.Item>
        )
    }
    getNav(nav,index) {
        let isSubClass = nav.subnav !== undefined ? "menu-dropdown":"";
        if(nav.subnav === undefined){
            return (<Menu.Item key={nav.key}><Icon type="appstore" />{nav.title}</Menu.Item>);
        }else{
            return (
                <SubMenu key={nav.key} title={<span><Icon type="mail" /><span>{nav.title}</span></span>}>
                    {
                        nav.subnav!==undefined?nav.subnav.map((menu) => this.getSubNav(menu)):null
                    }
                </SubMenu>
            )
        }
    }*/
    render(){
        const {mode} = this.props;
        return (
            <Menu 
                defaultOpenKeys={["organi"]}
                selectedKeys={[this.props.activeKey]}
                onClick={this.handleClick}
                mode={mode}>
                <SubMenu key="organi" title={<span><Icon type="mail" /><span className="nav-text">组织架构</span></span>}>
                    <Menu.Item key="customer" title="客户">客户</Menu.Item>
                    <Menu.Item key="supplier" title="供应商">供应商</Menu.Item>
                    <Menu.Item key="business" title="商业伙伴">商业伙伴</Menu.Item>
                </SubMenu>
                {/*<Menu.Item key="member" title="员工管理"><span><Icon type="appstore" /><span className="nav-text">员工管理</span></span></Menu.Item>
                <Menu.Item key="authority" title="权限管理"><span><Icon type="appstore" /><span className="nav-text">权限管理</span></span></Menu.Item>
                <SubMenu key="system" title={<span><Icon type="setting" /><span className="nav-text">系统管理</span></span>}>
                    <Menu.Item key="address" title="地址管理">地址管理</Menu.Item>
                    <Menu.Item key="site" title="站点管理">站点管理</Menu.Item>
                    <Menu.Item key="basedata" title="基础数据">基础数据</Menu.Item>
                </SubMenu>
                <SubMenu key="other" title={<span><Icon type="setting" /><span className="nav-text">其他</span></span>}>    
                    <Menu.Item key="import" title="导入员工错误页">导入员工错误页</Menu.Item>
                    <Menu.Item key="importemployee" title="导入员工">导入员工</Menu.Item>
                    <Menu.Item key="importview" title="导入">导入弹出框</Menu.Item>
                    <Menu.Item key="movedep" title="批量修改部门">批量修改部门弹出框</Menu.Item>
                    <Menu.Item key="employee" title="员工">员工弹出框</Menu.Item>
                    <Menu.Item key="addressModel" title="地址弹窗">地址弹窗</Menu.Item>
                    <Menu.Item key="office" title="设置办公地址">批量编辑办公地址</Menu.Item>
                </SubMenu>*/}
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