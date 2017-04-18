import React, { Component } from "react";
import { Form, Input, Spin,Select, Button, Modal ,Col,Row,message,Icon,Upload} from '../../base/components/AntdComp';
import {shouldComponentUpdate} from '../../base/consts/Utils';
import { Urls } from '../../base/consts/Urls';
import Cropper from 'react-cropper';
import AddAddressCont from '../../main/dialogconts/AddAddressCont';
const FormItem = Form.Item;
const Option = Select.Option;

function handleChange(option,value) {
    //console.log(option,value);
}
class AddCompanyComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            src:'',
            cropResult: null,
        };
        this.myprops = {
            name: 'file',
            action: Urls.UPLOAD_IMAGE.toLocaleLowerCase(),
            headers: {
                authorization: 'authorization-text',
            },
            beforeUpload: this.beforeUpload,
            onChange:(info) =>{
                if (info.file.status !== 'uploading') {
                    // console.log('uploading', info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    let furl = info.file.response.data.fileURL;
                    this.setState({ src: furl });
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

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
                if(data.companyCode==undefined){
                    delete data.companyCode;
                }
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
     beforeUpload = (file) => {
        const isJPG = /^image\/(jpeg|jpg|png|bmp)$/.test(file.type);
        // console.log(isJPG);
        if (!isJPG) {
            message.error('You can only upload jpeg/jpg/png/bmp file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

     onOk=(data)=>{
        this.setState({detailAddr: data.addressDetl});
        console.log(data);
    }

    drawForm = () => {
        let { getFieldDecorator } = this.props.form;
        let formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        let { position,add_company_visiable } = this.props;
        let detailAddr='';
        if(position.companyAddr!=undefined){
            detailAddr=position.companyAddr.detailAddr;
        }
        return (
            <div>
                <Form >
                    <Row className="company-code">
                        <Col span={24}>
                            <FormItem label="公司编码" 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyCode', {
                                    initialValue:position.companyCode,
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
                                    initialValue:position.companyName,
                                    rules: [{ required: true, message: 'Please input the companyname of collection!' }],
                                })(
                                    <Input  />

                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="公司简称" {...formItemLayout}>
                                {getFieldDecorator('companyAbbr', {
                                    initialValue:position.companyAbbr,
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
                                    initialValue:position.companyDesc,
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
                                    initialValue:position.companyUscc,
                                    rules: [{ required: false, message: 'Please input the authcode of collection!' }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="法人代表" {...formItemLayout}>
                                {getFieldDecorator('corporation', {
                                    initialValue:position.corporation,
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
                                    initialValue:position.telephoneO,//telephoneNumber
                                    rules: [{ required: false, message: 'Please input the tel of collection!' }],
                                })(
                                    <Input style={{width:80}} />
                                )}
                            </FormItem>
                            <FormItem className="company-phoneN"  {...formItemLayout}>
                                {getFieldDecorator('telephoneN', {
                                    initialValue:position.telephoneN,
                                    rules: [{ required: false, message: 'Please input the tel of collection!' }],
                                })(
                                    <Input style={{width:110}}/>
                                )}
                            </FormItem>
                            
                        </Col>
                        <Col span={12}>
                            <FormItem label="邮编" {...formItemLayout}>
                                {getFieldDecorator('zipCode', {
                                    initialValue:position.zipCode,
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
                            <div style={{width:532}}>
                                <span>{position==undefined?this.state.detailAddr:detailAddr} </span>
                                <Button type="primary" onClick={()=>this.props.AddAddressVisiable()}>添加</Button>
                            </div>
                               
                            </FormItem>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem label="公司性质" 
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8}}>
                                {getFieldDecorator('companyType', {
                                    initialValue:position.companyType||'H001',
                                    //initialValue:window.ENUM.getEnum("nature",0)[0].catCode.toString(),
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
                                    initialValue:position.companyScale|| 'H001',
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
                                        initialValue:position.companyIndustry==undefined?["H001"]:position.companyIndustry.map(key=>key.industryCode),
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
                                    initialValue:position.contacts,
                                    rules: [{ required: false, message: 'Please input the contact of collection!' }],
                                })(
                                    <Input style={{width:80}}/>
                                )}
                            </FormItem>
                            <FormItem className="contacts-phone" {...formItemLayout}>
                                {getFieldDecorator('contactsPhone', {
                                    initialValue:position.contactsPhone,
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
                                {getFieldDecorator('companyLogo', {
                                    initialValue:position.companyLogo,
                                    rules: [{ required: false, message: 'Please input the companyLogo of collection!' }],
                                })(
                                <div>
                                        <div style={{ padding: '10px' }}>
                                            <Upload {...this.myprops}>
                                                <Button type="primary">上传</Button> 建议尺寸180*48，请上传小于2MB的图片（jpg，jpeg，png，bmp格式）
                                            </Upload>
                                        </div>
                                        <div style={{ display: 'flex', width: '100%' }} >
                                            <Cropper
                                                style={{height:0}}
                                                aspectRatio={1 / 1}
                                                preview=".img-preview"
                                                src={this.state.src}
                                                ref={cropper => { this.cropper = cropper; }}
                                                guides={false}
                                                viewMod={3}
                                                dragMode={"move"}
                                                center={false}
                                                background={false}
                                                autoCropArea={0.6}
                                                toggleDragModeOnDblclick={false}
                                            />
                                        
                                        </div>
                                </div>
                                )}
                            </FormItem>
                        </Col>

                    </Row>

                </Form>
                <AddAddressCont onOk={this.onOk} isFetch={false} />
            </div>
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
AddCompanyComp.defaultProps = {
    position: {
        name: null,
        num: null,
        info: null,
    }
}
export default Form.create()(AddCompanyComp);
