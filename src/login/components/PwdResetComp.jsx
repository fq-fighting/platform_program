import React,{Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from '../../base/components/AntdComp';
import Validate from '../../base/consts/Validate'
const FormItem = Form.Item;
class PwdResetComp extends Component{
    constructor(props,context){
        super(props,context);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            data.phoneNo = this.props.phoneNo;
            if (!err&&data.newPassword===data.surePassword) {
                data={phoneNo:data.phoneNo,newPassword:data.newPassword}
                this.props.submitPwd(data)
            }
        });
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
    render(){
        let {submitLoading,resetPsw} = this.props;
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
                        <Form onSubmit={this.handleSubmit} className="reset-form">
                            <FormItem>
                                {this.getFD('newPassword', {
                                    initialValue: resetPsw.newPassword,
                                    rules: [
                                        { type:"required"},
                                    ],
                                })(
                                    <Input  placeholder="请输入密码" className="acount-phone" type="password"/>
                                    )}
                            </FormItem>
                            <FormItem>
                                {this.getFD('surePassword',{
                                    rules: [
                                        { type:"required"},
                                    ],
                                })(
                                    <Input placeholder="请确认密码" className="acount-phone" type="password"/>
                                    )}
                                
                            </FormItem>
                            <FormItem className="reset-button">
                                <Button type="primary" htmlType="submit" className="reset-form-button" loading={submitLoading}>提交</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

PwdResetComp.defaultProps={

}
export default Form.create()(PwdResetComp);