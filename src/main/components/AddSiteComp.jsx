import React, { Component,PropTypes } from "react";
import { Form,Input, Button,Checkbox} from '../../base/components/AntdComp';
import moment from 'moment';
import FormModalComp from '../../base/components/FormModalComp';
import LinkageComp from '../components/LinkageComp';
import TreeSelectComp from '../../base/components/TreeSelectComp';
import AddressMapComp from '../components/AddressMapComp';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

class AddSiteComp extends FormModalComp {
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
                const sitePlain = ['isSog', 'isPrd', 'isDot'];
                newData = {...data.address, ...data.map};
                newData.siteName = data.siteName;
                newData.siteCode = data.siteCode;
                newData.orgCode = data.orgCode;
                newData.status = this.props.site.status || 0;
                newData.tenantCode = "";
                newData.langCode = "";
                newData.remarks = "";
                for (var i = 0; i < sitePlain.length; i++){
                        if (data.site && data.site.includes(sitePlain[i])) {
                        newData[sitePlain[i]] = 1;
                    } else {
                        newData[sitePlain[i]] = 0;
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
    
    componentWillMount() {
        this.props.getDeptName();
    }
    getComp = () => {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 12}, 
        };
        const tailFormItemLayout = {
            wrapperCol: {span: 14,offset: 3}
        };
        let { site, orgCode } = this.props;
        let loop = (data) => data.map((item) => {
            if (item.isOpt == 1) {
                item.disabled = true;
            }
            if (item.children) loop(item.children);
            return item;
        });
        let dataName = Array.isArray(loop(orgCode))?loop(orgCode):[];
        // console.log('pDeptName',dataName);
        
       
       
        const plainOptions = [
            { label: '仓储管理', value: 'isSog' },
            { label: '生产制造', value: 'isPrd' },
            { label: '服务网点', value: 'isDot' },
        ];
        return (
            <Form className="address-form">
                <FormItem {...formItemLayout} label="编码" hasFeedback >
                    {this.getFD('siteCode', {
                        initialValue:site.siteCode,
                        rules: [
                            { type:"required", message: '请输入编码' },
                        ],
                    })(
                        <Input placeholder="请输入编码" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="名称" hasFeedback >
                    {this.getFD('siteName', {
                        initialValue:site.siteName,
                        rules: [
                            { type:"required", message: '请输入名称' },
                        ],
                    })(
                        <Input placeholder="请输入名称" />
                    )}
                </FormItem>
                <FormItem
                    label="组织经营"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    {this.getFD('orgCode', {
                        // initialValue:site.orgCode,
                        rules: [
                            { type:"required", message: '请选择组织经营' },
                        ],
                    })(
                        <TreeSelectComp 
                            treeData={dataName}
                            name='deptName'
                            onChange={this.handleSelectChange}
                            width={323} 
                            placeholder="请选择组织经营"
                            />
                        )}
                </FormItem>
                <FormItem {...formItemLayout} label="业务用途">
                    {this.getFD('site', {
                        initialValue:site.siteUse
                    })(
                        <CheckboxGroup options={plainOptions} />
                    )}
                </FormItem>
                <AddressMapComp {...this.props} address={this.props.site} />
            </Form>
        )
    }
}
AddSiteComp.defaultProps = {
    site: {
        siteCode: null,
        siteName: null,
        orgCode: null,
        isSog: null,
        isPrd: null,
        isDot: null,
        status: null,
        updateBy: null,
        updateDate: null
    }
}
AddSiteComp.propTypes={
    position:PropTypes.object,
}
export default Form.create()(AddSiteComp);
