import React,{Component} from 'react';
class ResetHeaderComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
    return (
        <div className="reset-header">
            <div className="header-content">
                <h1 className="header-logo"><img src=""/></h1>
                <ul className="header-list">
                    <li className="header-item"><a href="#" >首页</a></li>
                    <li className="header-item"><a href="#" >产品</a></li>
                    <li className="header-item"><a href="#" >服务</a></li>
                    <li className="header-item"><a href="#" >帮助中心|下载</a></li>
                </ul>
                <a href="#" className="header-login">登&nbsp;&nbsp;录</a>
            </div>
      </div>
    );
    }
}

export default ResetHeaderComp;