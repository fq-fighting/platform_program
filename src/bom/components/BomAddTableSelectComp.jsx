import React, { Component } from 'react';
import { Select, Form } from 'antd';
import MTable from '../../base/components/TableComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';

const Option = Select.Option;
const FormItem = Form.Item;

class BomAddTableSelectComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.array = [];
    }
    handleChange = (value) => {
        let val = this.props.materialSource[value];
        let flag = this.props.flag;
        this.props.handleChange(val, flag);
    }
    onSearch = (value) => {
        this.props.MaterialList(value);
    };
    render() {
        let { materialSource ,bomDetailInfo} = this.props;
        const {getFieldDecorator} = this.props.form;
        // let dataSource = this.props.bomDetailInfo.list;
        let materialOptions = materialSource.map((val, index) => {
            return <Option title={val.materialCode} key={index}>{val.materialCode} {val.materialName} {val.materialSpec} {val.measureUnit}
            </Option>
        })
        // let initialValue = bomDetailInfo.list.map((val,index) => {
        //     // console.log(val.materialCode)
        //     // console.log(index)
        //      return initialValue=val.materialCode
        // })
        // console.log(initialValue)
        return (
            <div>
                <FormItem >
                    {getFieldDecorator('materialCode', {
                        initialValue: this.props.record
                    })(
                        <Select
                            optionLabelProp={"title"}
                            style={{ width: 200 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onSearch={this.onSearch}
                            onChange={this.handleChange}
                        >
                            {materialOptions}
                        </Select>
                        )}
                </FormItem>
            </div>
        )
    }
}

export default Form.create()(BomAddTableSelectComp);