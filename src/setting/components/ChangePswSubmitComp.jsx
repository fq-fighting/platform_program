import React, { Component } from 'react';
import FormModalComp from '../../base/components/FormModalComp';
import CodeBtnComp from '../../base/components/CodeBtnComp';
import { Layout ,Form, Input, Spin, Button, Modal,Col,Row} from '../../base/components/AntdComp';
const {Content } = Layout;
const FormItem = Form.Item;

class ChangePswSubmitComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading){
            this.validateFds((err, data) => {
                if (!err&&data.newPassword===data.surePassword) {
                    data={password:data.password,newPassword:data.newPassword}
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }
    }
    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        let { pswNew } = this.props;
        return (
            <Form className="bind-phone">
                <FormItem label="原密码:" {...formItemLayout}>
                    {this.getFD('password', {
                        initialValue: pswNew.password,
                        rules: [
                            { type: "required",}
                        ],
                    })(
                         <Input  placeholder="请输入登录密码" type="password"/>
                        )}
                </FormItem>
                <FormItem label="新密码:" {...formItemLayout}>
                    {this.getFD('newPassword', {
                        initialValue: pswNew.newPassword,
                        rules: [
                            { type: "required",}
                        ],
                    })(
                         <Input  placeholder="请输入新密码" type="password"/>
                        )}
                  
                </FormItem>
                <FormItem label="确认密码:" {...formItemLayout}>
                    {this.getFD('surePassword', {
                        rules: [
                            { type: "required",}
                        ],
                    })(
                         <Input  placeholder="请确认密码" type="password"/>
                        )}
                </FormItem>
            </Form>
        )
    }
}
ChangePswSubmitComp.defaultProps={
    title: '验证登录密码',
    okText: '下一步',
    width: 389,
    maskClosable: true,
    pswNew:{
        password:null,
        newPassword:null,
    }
}
export default Form.create()(ChangePswSubmitComp);

