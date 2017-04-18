import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const url = "https://passport.baidu.com/cgi-bin/genimage?njG5c06e2f6ab84de9602201462de014e13361da606d60400c2";
class CodeBtnComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            isDisabled:false,
            time: 60,
            url:url,
        }
        
    }
     tick=()=>{
        if(this.state.time >0){
            this.setState({time: this.state.time - 1});
            
        }else{
            this.setState({
                isDisabled:false,
                time: 60
            });
            clearInterval(this.interval);
        }
    }
    componentWillMount=()=>{
        this.setState({
            isDisabled:false,
            time: 60
        });
        clearInterval(this.interval);
    }
    componentWillUnmount=()=>{
        clearInterval(this.interval);
    }
    onClickCode=()=>{
        this.props.sendPhoneCode(()=>{
            this.setState({isDisabled:true});
            this.interval = setInterval(this.tick, 1000);
        })
    }
    
    render(){
        return (
            <Button type="primary"  className="form-btn-v"
                onClick={this.onClickCode}
                disabled={ this.state.isDisabled ? 'disabled' : '' }
                >{this.state.isDisabled?`${this.state.time}`+"s后重发":"获取验证码"}
            </Button> 
        )
    }
}
export default CodeBtnComp