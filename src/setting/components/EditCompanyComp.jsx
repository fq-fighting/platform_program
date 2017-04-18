import React, { Component } from "react";
import { Form, Input, Spin,Select, Button, Modal ,Col,Row,message,Icon,Upload} from '../../base/components/AntdComp';
import {shouldComponentUpdate} from '../../base/consts/Utils';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(option,value) {
    //console.log(option,value);
}
class EditCompanyComp extends Component {
    constructor(props, context) {
        super(props, context);

    }
    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.props.onOk && this.props.onOk(data);
                Object.assign(data,{telephoneNumber:data.telephoneO+'-'+data.telephoneN})
                delete data.telephoneN;
                delete data.telephoneO;
            }
        });
    }
    handleCancel = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.props.handleCancel && this.props.handleCancel(e);
        }    
    }



    drawForm = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
         let {state}=this.props;
        if(state.position==undefined){
            return
        }
        let props2 = {
                    action: '//jsonplaceholder.typicode.com/posts/',
                    listType: 'picture',
                };
        return (
            <Form >
                <Row className="company-code">
                    <Col span={24}>
                        <FormItem label="公司编码" 
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>
                            {getFieldDecorator('companyCode', {
                                initialValue:state.position.companyCode,
                                rules: [{ required: false, message: 'Please input the companyname of collection!' }],
                            })(
                                <Input  />

                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem label="公司名称" {...formItemLayout}>
                            {getFieldDecorator('companyName', {
                                initialValue:state.position.companyName,
                                rules: [{ required: true, message: 'Please input the companyname of collection!' }],
                            })(
                                <Input  />

                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="公司简称" {...formItemLayout}>
                            {getFieldDecorator('companyAbbr', {
                                initialValue:state.position.companyAbbr,
                                rules: [{ required: false, message: 'Please input the comname of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="公司简介"
                          className="company-desc"
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>
                            {getFieldDecorator('companyDesc', {
                                initialValue:state.position.companyDesc,
                                rules: [{ required: false, message: 'Please input the companyprofile of collection!' }],
                            })(
                                <Input type="textarea" rows={2} />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <FormItem label="统一社会认证代码" {...formItemLayout}>
                            {getFieldDecorator('companyUscc', {
                                initialValue:state.position.companyUscc,
                                rules: [{ required: false, message: 'Please input the authcode of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="法人代表" {...formItemLayout}>
                            {getFieldDecorator('corporation', {
                                initialValue:state.position.corporation,
                                rules: [{ required: false, message: 'Please input the representative of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}  className="company-phone">
                        <FormItem label="公司电话"  {...formItemLayout}>
                            {getFieldDecorator('telephoneO', {
                                initialValue:state.position.telephoneO,//telephoneNumber
                                rules: [{ required: false, message: 'Please input the tel of collection!' }],
                            })(
                                <Input style={{width:80}} />
                            )}
                        </FormItem>
                        <FormItem className="company-phoneN"  {...formItemLayout}>
                            {getFieldDecorator('telephoneN', {
                                initialValue:state.position.telephoneN,
                                rules: [{ required: false, message: 'Please input the tel of collection!' }],
                            })(
                                <Input style={{width:110}}/>
                            )}
                        </FormItem>
                        
                    </Col>
                    <Col span={12}>
                        <FormItem label="邮编" {...formItemLayout}>
                            {getFieldDecorator('zipCode', {
                                initialValue:state.position.zipCode,
                                rules: [{ required: false, message: 'Please input the zipcode of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <FormItem label="注册地址"
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>

                            <Button type="primary">添加</Button>
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="公司性质" 
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>
                            {getFieldDecorator('companyType', {
                                initialValue:state.position.companyType||'H001',
                                rules: [{ required: false, message: 'Please input the companynature of collection!' }],
                            })(
                                <Select >
                                    {
                                        window.ENUM.getEnum("nature").map(nature => {
                                            return <Select.Option value={nature.catCode.toString()} key={nature.catCode}>{nature.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="公司规模" 
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>
                            {getFieldDecorator('companyScale', {
                                initialValue:state.position.companyScale|| 'H001',
                            rules: [{ required: false, message: 'Please input the companysize of collection!' }],
                            })(
                                <Select >
                                    {
                                        window.ENUM.getEnum("scale").map(scale => {
                                            return <Select.Option value={scale.catCode.toString()} key={scale.catCode}>{scale.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                            )}
                        </FormItem>
                    </Col>

                </Row>
                <Row>
                    <Col span={24}>
                        <div className="industry-box">
                            <FormItem label="所属行业" 
                              labelCol={{ span: 4 }}
                              wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyIndustry', {
                                     initialValue:state.position.companyIndustry==undefined?["H001"]:state.position.companyIndustry.map(key=>key.industryCode),
                                    rules: [{ required: false, message: 'Please input the industry of collection!' }],
                                })(
                                    <Select tags
                                        style={{ width: '100%' }}
                                        >
                                    {
                                        window.ENUM.getEnum("industry").map(industry => {
                                            return <Select.Option value={industry.catCode.toString()} key={industry.catCode}>{industry.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                            </FormItem>
                        </div>
                    </Col>

                </Row>
                <Row>
                    <Col span={12} className="company-contacts">
                        <FormItem label="业务联系人" {...formItemLayout}>
                            {getFieldDecorator('contacts', {
                                initialValue:state.position.contacts,
                                rules: [{ required: false, message: 'Please input the contact of collection!' }],
                            })(
                                <Input style={{width:80}}/>
                            )}
                        </FormItem>
                        <FormItem className="contacts-phone" {...formItemLayout}>
                            {getFieldDecorator('contactsPhone', {
                                initialValue:state.position.contactsPhone,
                                rules: [{ required: false, message: 'Please input the phone of collection!' }],
                            })(
                                <Input style={{width:110}}/>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12} >
                        
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="公司logo" className="company-logo" 
                           labelCol={{ span: 4 }}
                           wrapperCol={{ span: 8}}>
                            
                        <Upload {...props2}>
                            <Button type="primary">上传</Button> 建议尺寸180*48，请上传小于2MB的图片（jpg，jpeg，png，bmp格式）
                        </Upload>

                        </FormItem>
                    </Col>

                </Row>

            </Form>
        )
    }
    render() {
        const { visible, title, loading } = this.props;
        //console.log(this.props.position.companyName)
        return (
            <Modal title={title} visible={visible}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="submit" type="primary" size="large"
                        loading={loading} onClick={this.handleSubmit}>
                        保存
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    {
                        this.drawForm()
                    }
                </Spin>
            </Modal>

        );

    }
}
EditCompanyComp.defaultProps = {
    position: {
        name: null,
        num: null,
        info: null,
    }
}
export default Form.create()(EditCompanyComp);
