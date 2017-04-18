import React from 'react';
import { Form , Input , Select } from '../../base/components/AntdComp';
import { base_config } from '../consts/BaseData';
import FormModalComp from '../../base/components/FormModalComp';
import { Enum } from '../../base/consts/Enum.js'
let Option = Select.Option;
class AddBaseDataComp extends FormModalComp {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.getCountrys();
    }
    createInputs(type,formItemLayout){
        let { selectData , handleChange} = this.props;
        return (
            <div>
                {
                    base_config[type].inputs.map((input,index)=>{
                        //国家下拉默认选中第一个
                        {/*let initValue = this.props.record[input.optionCode] ? this.props.record[input.optionCode] : (selectData[input.selectType][0] ? selectData[input.selectType][0][input.optionCode] : '');*/}
                        let initValue = this.props.record[input.optionCode] ? this.props.record[input.optionCode] : '';
                        return (<Form.Item
                            {...formItemLayout}
                            key={index}
                            label={input.label}
                        >
                            {
                                this.props.form.getFieldDecorator(input.optionName,{
                                    initialValue: initValue,
                                })(
                                    <Select className="linkage-select" placeholder={input.label} onChange={(code)=>handleChange[input.handleChange](code)}>
                                        {
                                            selectData[input.selectType].map((item , index)=>{
                                                return (<Option key={index} value={item[input.optionCode]} >{item[input.optionName]}</Option>);
                                            })
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>)
                    })
                }
            </div>
        );
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFds((err, data) => {
            if (!err) {
                this.props.handleSubmit && this.props.handleSubmit(data);
            }
        });
    }
    getComp = ()=>{
        let { getFieldDecorator } = this.props.form;
        let { record ,title } = this.props;
        let code = base_config[this.props.baseType].fields.code;
        let name = base_config[this.props.baseType].fields.name;
        let desc = base_config[this.props.baseType].fields.desc;
        let formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        // let initStatus = title.substring(-2,2) === "编辑" ? <p>状态:{record.status}<p> : "";
        return this.props.visible ? (
            <div className="base-data-dialog">
                <Form>
                    {
                        title.substring(-2,2) === "编辑" ? <Form.Item>
                            <p>
                                状态:{record.status ? window.ENUM.getEnum("dataStatus",record.status) : ""}
                            </p>
                        </Form.Item> : <Form.Item></Form.Item>
                    }
                    <Form.Item
                        {...formItemLayout}
                        label="编码"
                    >
                        {
                            getFieldDecorator(code,{
                                initialValue: record[code] ? record[code] : '',
                                rules: [{ required: true, message: 'Please input your code!' }]
                            })(
                                <Input placeholder="请输入编码"/>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="名称"
                    >
                        {
                            getFieldDecorator(name,{
                                initialValue:record[name] ? record[name] : '',
                                rules: [{ required: true, message: 'Please input your name!' }]
                            })(
                                <Input placeholder="名称" />
                            )
                        }
                    </Form.Item>
                    {
                        this.createInputs(this.props.baseType,formItemLayout)
                    }
                    <Form.Item
                        {...formItemLayout}
                        label="状态"
                    >
                        {
                            getFieldDecorator("status",{
                                initialValue: record["status"] ? record["status"] : '0',
                            })(
                                <Select className="status-select">
                                    {
                                        Enum.dataStatus.map((option,index)=>{
                                            return (<Option key={index}>{option.catName}</Option>);
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="描述"
                    >
                        {
                            getFieldDecorator(desc,{
                                initialValue:record[desc] ? record[desc] : '',
                                rules: [{ required: true, message: 'Please input your name!' }]
                            })(
                                <Input type="textarea" />
                            )
                        }
                    </Form.Item>
                </Form>
            </div>
            ) : null;
    }
}
export default Form.create()(AddBaseDataComp);