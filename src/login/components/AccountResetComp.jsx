import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox ,Row,Col} from '../../base/components/AntdComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
const FormItem = Form.Item;
import Validate from '../../base/consts/Validate'

const url = "https://passport.baidu.com/cgi-bin/genimage?njGde06e277adeadeb602f51416de014813b316a606d9040036";

class AccountResetComp extends Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            url:url,
        }
    }
    getFD=(id, opt = {})=> {
        if (opt.rules) {
            opt.rules = opt.rules.map((item, i) => {
                if (typeof item == 'string')
                    item = { type: item };
                item.label = opt.label || "";
                return Validate(item);
            });
        }
        return this.props.form.getFieldDecorator
            .call(this.props.from, id, opt);
    }
    handleSubmitNext=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            data.module = "LOGIN";
            if (!err && data.SMSCaptcha!=null) {
                this.props.nextStep(data)
                this.props.getPhoneNo(data)
            }
        });
    }
    handlerChangeImg =()=>{
        this.setState({url:url+"&"+new Date().getTime()})
    }
    handlerSendPhoneCode = (callback) => {
        this.props.form.validateFields((err, data) => {
            data.module = "LOGIN";
            if (!err) {
                callback();
                this.props.sendPhoneCodeTo(data)
            }
        });
    }

    render(){
        let {nextStepLoading,nextStepDisabled,showPicCode,getSmsWith,checkPhone} = this.props;
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="reset-wrapper">
                <div className="reset-box">
                    <div className="reset-text">
                        <h1 className="reset-title">忘记密码</h1>
                        <div className="reset-list">
                            <span className="reset-circle"></span>
                            <span className="reset-line"></span>
                            <span className="reset-circle circle-show"></span>
                        </div>
                        <div className="acount-message">
                            <span className="acount-text">账户验证</span>
                            <span className="acount-text2">密码重置</span>
                        </div>
                        <Form onSubmit={this.handleSubmitNext} className="reset-form">
                            <FormItem>
                                {this.getFD('phoneNo', {
                                    initialValue: checkPhone.phoneNo,
                                    rules: [
                                        { type:"required",message:"请输入您的手机号"},
                                        { type:"callnum"}
                                    ],
                                })(
                                    <Input prefix={<Icon type="mobile" className="code-icon"/>} placeholder="请输入您的手机号" className="acount-phone"/>
                                    )}
                                
                            </FormItem>
                            {showPicCode ? 
                            <FormItem className="get-code">
                                {this.getFD('imgCaptcha', {
                                    initialValue: "",
                                    rules: [
                                        { type:"required"},
                                        {type:"imgcode"}
                                    ],
                                })(
                                    <Row gutter={8} style={{marginLeft:"0",marginRight:"0px"}}>
                                        <Col span={12} style={{paddingLeft:"0",paddingRight:"0px"}}>
                                            <Input size="large" placeholder="请输入图中字符" className="inpt-code" prefix={<Icon type="safety" className="code-icon"/>}/>
                                        </Col>
                                        <Col span={12} style={{paddingLeft:"32px",paddingRight:"0px"}}>
                                        <img src={this.state.url} onClick={this.handlerChangeImg}/> </Col>
                                    </Row>
                                    )}
                                
                            </FormItem> : ''}
                            <FormItem className="get-code">
                                {this.getFD('SMSCaptcha', {
                                    initialValue:null,
                                    rules: [
                                        {type:"idcode"}
                                    ],
                                })(
                                    <Row gutter={8} style={{marginLeft:"0",marginRight:"0px"}}>
                                        <Col span={12} style={{paddingLeft:"0",paddingRight:"0px"}}>
                                            <Input size="large" placeholder="请输入验证码" className="inpt-code" prefix={<Icon type="safety" className="code-icon"/>}/>
                                        </Col>
                                        <Col span={12} style={{paddingLeft:"32px",paddingRight:"0px"}}>
                                            <CodeBtnComp {...this.props} sendPhoneCode={this.handlerSendPhoneCode}/>
                                        </Col>
                                    </Row>
                                    )}
                            </FormItem>
                            <FormItem className="reset-button">
                                <Button htmlType="submit" className="reset-form-button" loading={nextStepLoading}>下一步</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}
AccountResetComp.defaultProps={
    checkPhone:{
        phoneNo:null,
        SMSCaptcha: null,
        imgCaptcha:"",
        module:"LOGIN",
    },
}
export default Form.create()(AccountResetComp);