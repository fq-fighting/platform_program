import React, { Component, PropTypes } from "react";
import {Form,Select, Input, Spin, Button, Modal,Tabs,DatePicker,Row, Col } from 'antd';
import moment from 'moment';
import FormModalComp from '../../base/components/FormModalComp';
import { Enum } from '../../base/consts/Enum'
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;

class AddEmployeeComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                    Object.assign(data,{telNo:data.telStart+'-'+data.telEnd})
                }
            });
        }    
    }
    getComp = () => {
        let formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        let { employee } = this.props;


        return (
                <Form>
                    <Tabs>
                        <TabPane tab="基础信息" key="1">
                            <FormItem
                            {...formItemLayout}
                            label="姓名"
                             hasFeedback
                            >
                            {this.getFD('empName', {
                                initialValue:employee.empName,
                                rules:[
                                    {type: "required",message:'姓名不能为空'},
                                ]
                            })(
                                <Input placeholder="请输入姓名" />
                            )}
                           </FormItem>
                            <FormItem
                            {...formItemLayout}
                            label="手机"
                             hasFeedback
                            >
                            {this.getFD('phone', {
                                initialValue:employee.phone,
                                rules:[
                                    {type: "required",message:'手机号不能为空'},
                                ]
                            })(
                                <Input placeholder="请输入手机号" /> 
                            )}
                           </FormItem>
                           <div className="tel-fixed">
                                <Row>
                                <Col span={9}>
                                     <FormItem
                                label="固定电话"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('telStart', {
                                initialValue:employee.telStart,
                            })(
                                  <Input /> 
                                
                            )}
                            </FormItem>
                                </Col>
                                <Col span={6}>
                                     <FormItem
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('telEnd', {
                                initialValue:employee.telEnd,
                            })(
                                  <Input /> 
                                
                            )}
                            </FormItem>
                                </Col>
                           </Row>
                           </div>
                            
                            <FormItem
                            {...formItemLayout}
                            label="组织"
                             hasFeedback
                        >
                            {this.getFD('deptCode', {
                                initialValue:employee.dept.deptCode,
                            })(
                                <Select placeholder="请选择">
                                    <Option value="1" key="1">组织1</Option>
                                    <Option value="2" key="2">组织2</Option>
                                    <Option value="3" key="3">组织3</Option>
                                    <Option value="4" key="4">组织4</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="职位"
                             hasFeedback
                        >
                            {this.getFD('positionCode', {
                                initialValue:employee.position.positionCode+"",
                            })(
                                <Select placeholder="请选择">
                                    <Option value="1" key="1">职位1</Option>
                                    <Option value="2" key="2">职位2</Option>
                                    <Option value="3" key="3">职位3</Option>
                                    <Option value="4" key="4">职位4</Option>
                                </Select>
                            )}
                        </FormItem>
                         <FormItem
                                label="邮箱"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('email', {
                                initialValue: employee.email,
                            })(
                                <Input />
                                )}
                            </FormItem>
                             <FormItem
                            {...formItemLayout}
                            label="办公地址"
                             hasFeedback
                        >
                            {this.getFD('countryCode', {
                                initialValue:employee.office.countryCode+'',
                            })(
                                <Select placeholder=" ">
                                    <Option value="1" key="1">办公地址1</Option>
                                    <Option value="2" key="2">办公地址2</Option>
                                    <Option value="3" key="3">办公地址3</Option>
                                    <Option value="4" key="4">办公地址4</Option>
                                </Select>
                            )}
                        </FormItem>
                          <a href="#">添加新地址</a>
                        </TabPane>
                        <TabPane tab="详细资料" key="2">
                            <row>
                            <Col span={12}> <FormItem
                                label="工号"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('empNo', {
                                initialValue: employee.empNo,
                            })(
                                <Input />
                                )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                            {/*<FormItem
                                label="入职时间"
                                 hasFeedback
                                {...formItemLayout}
                             >{this.getFD('entryDate', {
                                initialValue:employee.entryDate,
                            })(
                                <DatePicker placeholder="" format={dateFormat} />
                            
                            )}
                            </FormItem>*/}
                            </Col>
                            </row>
                             <row>
                            <Col span={12}> <FormItem
                            {...formItemLayout}
                            label="证件类型"
                             hasFeedback

                        >
                            {this.getFD('identityCode', {
                                initialValue:window.ENUM.getEnum('credentials',employee.identityType.identityValue),
                            })(
                                <Select placeholder=" ">
                                    {
                                        window.ENUM.getEnum('credentials').map(item=>
                                            <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                                        )}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem
                                label="证件号码"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('identityNO', {
                                initialValue: employee.identityNO,
                            })(
                                <Input />
                                )}
                            </FormItem>
                        </Col>
                        </row>
                        <row>
                            <Col span={12}>
                            <FormItem
                                label="性别"
                                 hasFeedback
                                {...formItemLayout}
                             >
                               {this.getFD('genderCode', {
                                initialValue:window.ENUM.getEnum('sex',employee.gender.genderCode),
                            })(
                                <Select placeholder=" ">
                                    {
                                        window.ENUM.getEnum('sex').map(item=>
                                            <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                                        )}
                                </Select>
                            )}
                            </FormItem>
                            </Col>
                            <Col span={12}>
                             <FormItem
                            {...formItemLayout}
                            label="婚姻状态"
                             hasFeedback
                        >
                            {this.getFD('maritalStatusCode', {
                                 initialValue:window.ENUM.getEnum('marry',employee.maritalStatus.maritalStatusCode),
                            })(
                                <Select placeholder=" ">
                                   {
                                        window.ENUM.getEnum('marry').map(item=>
                                            <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                                        )}
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        </row>
                        <row>
                            <Col span={12}>
                         <FormItem
                            {...formItemLayout}
                            label="国家"
                             hasFeedback
                        >
                            {this.getFD('nationalityCode', {
                                initialValue:employee.nationality.nationalityCode,
                            })(
                                <Select placeholder=" ">
                                    <Option value="1" key="1">中国</Option>
                                    <Option value="2" key="2">美国</Option>
                                </Select>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem
                                label="民族"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('ethnicityCode', {
                                initialValue:window.ENUM.getEnum('nationality',employee.ethnicity.ethnicityCode),
                            })(
                               <Select placeholder=" ">
                                   {
                                        window.ENUM.getEnum('nationality').map(item=>
                                            <Option value={item.catCode} key={item.catCode}>{item.catName}</Option>
                                     )}
                                </Select>
                                )}
                        </FormItem>
                        </Col>
                        </row>
                        <row>
                        <Col span={12}>
                        <FormItem
                                label="籍贯"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                {this.getFD('nativePlace', {
                                initialValue: employee.nativePlace,
                            })(
                                <Input />
                                )} 
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem
                                label="家庭住址"
                                 hasFeedback
                                {...formItemLayout}
                             >
                                 {this.getFD('homeAddr', {
                                initialValue: employee.homeAddr,
                            })(
                                <Input />
                                )}
                        </FormItem>
                        </Col>
                        </row>
                        <row>
                        <Col span={12}>
                        <FormItem
                                label="紧急联系人"
                                 hasFeedback
                                {...formItemLayout}
                             > 
                             {this.getFD('emergencyContact', {
                                initialValue: employee.emergencyContact,
                            })(
                                <Input />
                                )}
                               
                        </FormItem>
                        </Col>
                        <Col span={12}>
                        <FormItem
                                label="紧急联系电话"
                                 hasFeedback
                                {...formItemLayout}
                             >
                             {this.getFD('emergencyPhone', {
                                initialValue: employee.emergencyPhone,
                            })(
                                <Input />
                                )}
                        </FormItem>
                        </Col>
                          </row>
                        </TabPane>
                    </Tabs>
                </Form>
        )
    }
}
AddEmployeeComp.defaultProps = {
    width: 730,
    employee: {
        empName: null,
        phone: null,
        telNo: null,
        dept: {deptCode:null},
        position: {positionCode:null},
        email: null,
        office: {countryCode:null},
        empNo: null,
        entryDate: null,
        identityType: {identityCode:null},
        identityNO: null,
        gender: {genderCode:null},
        maritalStatus: {maritalStatusCode:null},
        nationality: {nationalityCode:null},
        ethnicity:{ethnicityCode: null},
        nativePlace: null,
        homeAddr: null,
        emergencyContact: null,
        emergencyPhone: null,
    }
    
}
AddEmployeeComp.propTypes = {
    employee:PropTypes.object,
}

export default Form.create()(AddEmployeeComp);
