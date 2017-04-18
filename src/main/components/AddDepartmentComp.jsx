import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal, Row, Col, Select, Icon } from '../../base/components/AntdComp';
import ModalComp from '../../base/components/ModalComp';
import FormModalComp from '../../base/components/FormModalComp';
import AutoSelectComp from '../../base/components/AutoSelectComp';
import TreeSelectComp from '../../base/components/TreeSelectComp';
import AddAddressCont from '../dialogconts/AddAddressCont';
const FormItem = Form.Item;
const Option = Select.Option;
// let treeData1 = [
//     {
//         "id": 1,
//         "name": "安徽省",
//         "managerName": "徐杰",
//         "children": [
//             {
//                 "id": 38459,
//                 "name": "浙江省",
//                 "managerName": "",
//                 "children": [
//                     {
//                         "id": 77364,
//                         "name": "安徽省",
//                         "managerName": "毛涛",
//                         "children": []
//                     },
//                     {
//                         "id": 77365,
//                         "name": "宁夏回族自治区",
//                         "managerName": "龙杰",
//                         "children": []
//                     },
//                     {
//                         "id": 77366,
//                         "name": "内蒙古自治区",
//                         "managerName": "陈娜",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": 38460,
//                 "name": "澳门特别行政区",
//                 "managerName": "",
//                 "children": [
//                     {
//                         "id": 77367,
//                         "name": "江苏省",
//                         "managerName": "田磊",
//                         "children": []
//                     },
//                     {
//                         "id": 77368,
//                         "name": "天津",
//                         "managerName": "夏伟",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": 38461,
//                 "name": "广西壮族自治区",
//                 "managerName": "孔刚",
//                 "children": [
//                     {
//                         "id": 77369,
//                         "name": "宁夏回族自治区",
//                         "managerName": "唐明",
//                         "children": []
//                     },
//                     {
//                         "id": 77370,
//                         "name": "天津",
//                         "managerName": "江涛",
//                         "children": []
//                     },
//                     {
//                         "id": 77371,
//                         "name": "澳门特别行政区",
//                         "managerName": "钱洋",
//                         "children": []
//                     }
//                 ]
//             },
//             {
//                 "id": 38462,
//                 "name": "内蒙古自治区",
//                 "managerName": "孟强",
//                 "children": [
//                     {
//                         "id": 77372,
//                         "name": "甘肃省",
//                         "managerName": "唐强",
//                         "children": []
//                     },
//                     {
//                         "id": 77373,
//                         "name": "辽宁省",
//                         "managerName": "锺静",
//                         "children": []
//                     },
//                     {
//                         "id": 77374,
//                         "name": "江西省",
//                         "managerName": "武涛",
//                         "children": []
//                     },
//                     {
//                         "id": 77375,
//                         "name": "甘肃省",
//                         "managerName": "宋秀英",
//                         "children": []
//                     }
//                 ]
//             }
//         ]
//     }
// ];
class AddDepartmentComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);
        this.param={mgrPm:{"empName":"","pageSize":"10"},deptNamePm:{"conditions":[]},addPm:{"isReg": "0","isMag": "1","isRep": "1","isSog": "1","isBil": "1","isOfe": "0","isVisible": "1"}}
        this.state={
            newAddress:null
        };
    }
    
    componentWillMount(){
        // this.props.getdeptMgr();
        this.props.getSelectData(this.param);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.props.onOk && this.props.onOk(data);
            }
        });
    }
    
    handleNewAddress=(addressCode)=>{
        this.props.getAddress().then(()=>{
            this.setState({newAddress: addressCode});
        });
    }
    
    getComp = () => {
        let formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 14 },
            },
            mgrSign=true,
            mgrName='';
        let { Record, pDeptName, deptMgr, deptMgrName, address } = this.props;
        
        if(address.size==0){address=null}
        let findAddress={
            isReg:"注册地址",
            isMag:"经营地址",
            isRep:"收货地址",
            isSog:"发货地址",
            isBil:"开票地址",
            isOfe:"办公地址",
        };

        if(Array.isArray(deptMgrName)){
            let loop=(obj)=>obj.map(item=>{
                if(item.flag==="1"&&mgrSign){
                    mgrSign=false;
                    mgrName=item.empName;
                }
                return item;
            });
            loop(deptMgrName);
        }

        if(address){
            address.map((item,index)=>{
                if(item.isReg==1){
                    item.addType=findAddress.isReg;
                }else if(item.isMag==1){
                    item.addType=findAddress.isMag;
                }else if(item.isRep==1){
                    item.addType=findAddress.isRep;
                }else if(item.isSog==1){
                    item.addType=findAddress.isSog;
                }else if(item.isBil==1){
                    item.addType=findAddress.isBil;
                }else if(item.isOfe==1){
                    item.addType=findAddress.isOfe;
                };
                return item;
            })
        };
        return (
            <div>
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="组织名称"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptName', {
                                initialValue: Record.deptName||null,
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder="请输入名称" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="组织编号"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptNo', {
                                initialValue: Record.deptNo||null,
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder="请输入编号" />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="组织简称"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptAlias', {
                                initialValue: Record.deptAlias||null,
                                //rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder="请输入名称" />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="组织全称"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptAll', {
                                initialValue: Record.deptAll||null,
                                //rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input placeholder="请输入编号" />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="英文名称"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptEng', {
                                initialValue: Record.deptEng||null,
                                //rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="负责人"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptManager', {
                                initialValue: mgrName||null,
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                onChange: this.handleSelectChange,
                            })(
                                <AutoSelectComp
                                    key="select"
                                    width={225}
                                    selectedList={deptMgr}
                                    onSelect={this.props.handleChange}
                                    onSearch={(val) => {
                                    }}
                                    displayName={"empName"}
                                    keyName={"id"}
                                />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="层级"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptLevel', {
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                initialValue: (Record.deptLevel||0).toString(),
                                onChange: this.handleSelectChange,
                            })(
                                <Select>
                                    {
                                        window.ENUM.getEnum("level").map((level,index)=>{
                                            return<Select.Option key={level.catCode.toString()} >{level.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="上级组织"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('pDeptName', {
                                //initialValue: Record.pDeptId||undefined,
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                            })(
                                <TreeSelectComp 
                                    treeData={[pDeptName]}
                                    name='deptName' 
                                    onChange={this.handleSelectChange}
                                    width={225} 
                                    />
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="是否为运营组织"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('isOpt', {
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                initialValue: (Record.isOpt||0).toString(),
                                onChange: this.handleSelectChange,
                            })(
                                <Select  placeholder="Select a option and change input text above">
                                    {
                                        window.ENUM.getEnum("bool").map((bool,index)=>{
                                            return<Select.Option key={bool.catCode}>{bool.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="是否为采购组织"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('isPurchase', {
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                initialValue: (Record.isPurchase||0).toString(),
                                onChange: this.handleSelectChange,
                            })(
                                <Select  placeholder="Select a option and change input text above">
                                    {
                                        window.ENUM.getEnum("bool").map((bool,index)=>{
                                            return<Select.Option key={bool.catCode}>{bool.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="是否为销售组织"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('isSell', {
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                initialValue: (Record.isSell||0).toString(),
                                onChange: this.handleSelectChange,
                            })(
                                <Select  placeholder="Select a option and change input text above">
                                    {
                                        window.ENUM.getEnum("bool").map((bool,index)=>{
                                            return<Select.Option key={bool.catCode}>{bool.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem
                            label="是否为财务组织"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('isFinance', {
                                //rules: [{ required: true, message: 'Please select your gender!' }],
                                initialValue: (Record.isFinance||0).toString(),
                                onChange: this.handleSelectChange,
                            })(
                                <Select  placeholder="Select a option and change input text above">
                                    {
                                        window.ENUM.getEnum("bool").map((bool,index)=>{
                                            return<Select.Option key={bool.catCode} >{bool.catName}</Select.Option>
                                        })
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem
                            label="联系电话"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {this.getFD('deptPhone', {
                                initialValue: Record.deptPhone||null,
                                //rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Input />
                                )}
                        </FormItem>
                    </Col>
                    <Col span={12}></Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col span={24}>
                        <FormItem
                            label="地址"
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                        >
                            {this.getFD('addrCode', {
                                initialValue: this.state.newAddress||Record.addrCode||null,
                                //rules: [{ required: true, message: 'Please input your note!' }],
                            })(
                                <Select>
                                    {address?address.map(item=>{
                                        return<Select.Option key={item.addressCode} >
                                            {`【${item.addType}】 【${item.addressName}】 ${item.addressDetl}`}
                                        </Select.Option >}
                                    ):null}
                                </Select>
                                )}
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" justify="start">
                    <Col span={4}></Col>
                    <Col span={16}>
                        <Icon type="plus" />
                        <a href="#" onClick={this.props.AddAddressVisiable} >添加新地址</a>
                    </Col>
                </Row>
            </Form>

                    <AddAddressCont isFetch handleNewAddress={this.handleNewAddress} />
                    </div>
        )
    }
}
AddDepartmentComp.defaultProps = {
    Record: {
        id: null,
        deptName: null,
        deptNo: null,
        deptLevel: 0,
        deptAlias: null,
        deptMgr: null,
        isOpt: 0,
        isPurchase: 0,
        isSell: 0,
        isFinance: 0,
        deptAll: null,
        pDeptName: null,
        deptPhone: null,
        addrCode: null,
    },
    selectedList:[
    {
        id: 1,
        name: "AAAA",
    },
    {
        id: 2,
        name: "BBBB",
    },
    {
        id: 3,
        name: "CCCC",
    },
    {
        id: 4,
        name: "DDDD",
    },
    ]
}
AddDepartmentComp.propTypes = {
    Record:PropTypes.object,
    selectedList: PropTypes.array,
}

export default Form.create()(AddDepartmentComp);