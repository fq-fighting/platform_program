import React,{Component} from "react";
import {Icon,Menu,Button} from '../../base/components/AntdComp';
import {Link} from "react-router";
var {PropTypes} = React;

class LayoutTop extends Component{
    constructor(prop){
        super(prop);
    }
    componentWillMount(){
    }
    render(){
        return (
            <div className='header-toolbar'>
                <div className='header-toolbar-logo'>
                    <div className="header-toolbar-logo-text">
                        <Menu mode="horizontal">
                            <Menu.Item key="logo">
                                曼威后台
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className='header-toolbar-right'>
                    <Link to={`/login.html`} >退出</Link>
                </div>
            </div>
        )
    }
}
export default LayoutTop