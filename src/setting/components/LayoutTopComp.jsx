
import React,{Component} from "react";
import {Icon,Menu,Dropdown} from 'antd';
import {Link} from 'react-router';
var {PropTypes} = React;

class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentWillMount(){
        this.props.initData();
    }
    getMenu=()=>{
        return (
            <Menu>
                <Menu.Item key="menu_1"><Link to={`/setting.html`}>个人中心</Link></Menu.Item>
                <Menu.Item key="menu_2"><Link to={`/R/setting/company`}>企业设置</Link></Menu.Item>
                <Menu.Item key="menu_3">退出登录</Menu.Item>
            </Menu>
        )
    }
    render(){
        const loginUser = {name:"张三",companyName:"上海曼威信息技术（上海）有限公司"};
        return (
            <div className='header-toolbar'>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <i className="anticon anticon-global"></i> <span>{loginUser.companyName}</span>
                    </div>
                    <div className="header-nav">
                        <a>工作</a>
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    <div className="help">
                        <i className="anticon anticon-question-circle"></i> <a>帮助</a>
                    </div>
                    <Dropdown overlay={this.getMenu()}>
                        <a className='user'>
                            <span className='img'><img src="/img/John-Smith.jpg" width="30" height="30" /></span>
                            <span>{loginUser.name} <Icon type="down" /></span>
                        </a>
                    </Dropdown>
                </div>
            </div>
        )
    }
}
LayoutTop.defaultProps = {
    initData:()=>{} 
}
LayoutTop.propTypes = {
    initData: React.PropTypes.func,
}

export default LayoutTop