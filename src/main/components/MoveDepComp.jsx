import React, { Component, PropTypes } from "react";
import {Form,Select, Input, Spin, Button, Modal,Tabs,DatePicker,Row, Col } from 'antd';
import moment from 'moment';
import FormModalComp from '../../base/components/FormModalComp';
import TreeSelectComp from '../../base/components/TreeSelectComp';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;

class MoveDepComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state={
            empCodes:[]
        }
    }
    
    componentWillMount(){
        this.props.DeptName();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
                console.log(data)
                if (!err) {
                    this.props.onOk && this.props.onOk(data);
                }
            });
        }    
    }
    
       getComp = () => {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        let {state,pDeptName,...props} = this.props;
        return (
                <Form>
                    <FormItem label="选择人数:" {...formItemLayout}>
                        {this.getFD('empCodes', {
                            initialValue:state.memberCodeArr
                            })(
                                <span>{state.memberCodeArr.length}人</span>
                            )}
                             
                    </FormItem >
                     <FormItem
                            {...formItemLayout}
                            label="选择组织"
                        >
                            {this.getFD('newDeptCode', {
                            })(
                                <TreeSelectComp treeData={[pDeptName]} name='deptName' width={170} />
                            )}
                        </FormItem>
                </Form>
        )
    }
}

MoveDepComp.defaultProps={
    title: '批量修改部门',
    okText: '保存',
    width: 363,
    maskClosable: true,
    movedep: {
        empCodes:[],
        newDeptCode:null,
    },
}
MoveDepComp.propTypes = {
    movedep:PropTypes.object,
}


export default Form.create()(MoveDepComp);
