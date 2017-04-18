import React, { Component } from 'react';
import FormModalComp from '../../base/components/FormModalComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
import { Layout ,Form, Input, Spin, Button, Modal,Col,Row} from '../../base/components/AntdComp';
const {Content } = Layout;
const FormItem = Form.Item;

class BindPhoneComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.validateFds((err, data) => {
                data.module = "EMPRESET";
                if (!err&&data.SMSCaptcha!=null) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    handlerSendPhoneCode = (callback) => {
        this.props.form.validateFields((err, data) => {
            data.module = "EMPRESET";
            if (!err) {
                callback()
                this.props.sendPhoneCodeTo(data)
            }
        });
    }
    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        let { bindPhone } = this.props;
        return (
            <Form className="bind-phone">
                <FormItem label="新手机号:" {...formItemLayout}>
                    {this.getFD('phoneNo', {
                        initialValue: bindPhone.phoneNo,
                        rules: [
                            { type:"required",message:"请输入您的手机号"},
                            { type:"callnum"}
                        ],
                    })(
                        <Row gutter={8} style={{margin:0}}>
                            <Col span={18}>
                                <Input size="large"  placeholder="请输入新手机号" className="phone"/>
                            </Col>
                            <Col span={6}>
                            <CodeBtnComp {...this.props} sendPhoneCode={this.handlerSendPhoneCode}/>
                            </Col>
                        </Row>
                        )}
                    
                </FormItem >
                <FormItem label="验证码:" {...formItemLayout}>
                    {this.getFD('SMSCaptcha', {
                        initialValue: bindPhone.SMSCaptcha,
                        rules: [
                            {type:"idcode"}
                        ],
                    })(
                        <Row gutter={8} style={{margin:0}}>
                            <Col span={18}>
                                <Input  placeholder="请输入验证码"/>
                            </Col>
                        </Row>
                         
                        )}
                </FormItem>
            </Form>
        )
    }
}
BindPhoneComp.defaultProps={
    title: '绑定手机',
    okText: '提交',
    width: 508,
    maskClosable: true,
    bindPhone:{
        phoneNo:null,
        SMSCaptcha:null,
    }
}
export default Form.create()(BindPhoneComp);

