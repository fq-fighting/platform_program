import React, { Component,PropTypes } from "react";
import { Form,Input, Button,Checkbox} from '../../base/components/AntdComp';
import moment from 'moment';
import FormModalComp from '../../base/components/FormModalComp';
import LinkageComp from '../components/LinkageComp';
import AddressMapComp from '../components/AddressMapComp';
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class AddAddressComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.props.loading) {
            this.validateFds((err, data) => {
                let newData = {};
                newData = {...data,...data.map};
                newData.addressName = data.addressName;
                newData.countryCode = data.countryCode.key;
                newData.provinceCode = data.provinceCode.key;
                newData.cityCode = data.cityCode.key;
                newData.countyCode = data.countyCode.key;
                if(data.business){
                    for (var key of data.business) {
                        newData[key] = 1;
                    }
                }
                if (!err) {
                    this.props.onOk && this.props.onOk(newData);
                }
            });
        }
    }
    checkPrice = (rule, value, callback) => {
        // if (value.number > 0) {
        //     callback();
        //     return;
        // }
        callback('请选择地址搜索条件');
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    getComp = () => {
        const { detail } = this.props;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12}, 
        };
        const tailFormItemLayout = {
            wrapperCol: {span: 14,offset: 3}
        };
        const plainOptions = [
            { label: '经营', value: 'isMag' },
            { label: '收货', value: 'isRep' },
            { label: '发货', value: 'isSog' },
            { label: '开票', value: 'isBil' },
        ];
        return (
            <Form className="address-form">
                <FormItem {...formItemLayout} label="名称" hasFeedback >
                    {this.getFD('addressName', {
                        initialValue:detail.addressName,
                        rules: [
                            { type:"required", message: '请输入名称' },
                        ],
                    })(
                        <Input placeholder="请输入名称" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务用途">
                    {this.getFD('business', {
                        initialValue:detail.businessValue
                        // initialValue:address.yewuyongtu,
                    })(
                        <CheckboxGroup options={plainOptions} />
                    )}
                </FormItem>
                <AddressMapComp {...this.props} />
            </Form>
        )
    }
}
AddAddressComp.defaultProps = {
    detail:{
        addressCode:"",
        addressName:"",
        addressDetl:"",
        countryCode:"",
        provinceCode:"",
        cityCode:"",
        countyCode:"",
        isReg:0,
        isMag:0,
        isRep:0,
        isSog:0,
        isBil:0,
        isOfe:0,
        status:0,
        org:[]
    }
}
AddAddressComp.propTypes = {
    detail: PropTypes.object,
}
export default Form.create()(AddAddressComp);
