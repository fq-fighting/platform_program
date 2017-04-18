import React, {Component} from "react";
import {connect} from "react-redux";
import moment from 'moment';
import {DatePicker, Select, Button, Input, Form, Row, Col} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const monthFormat = 'YYYY-MM-DD HH:mm:ss';
class BomComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: null,
            endValue: null,
            endOpen: false,
        };
    }

    componentWillMount() {
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    };

    onStartChange = (value) => {
        this.onChange('startValue', value);
    };

    onEndChange = (value) => {
        this.onChange('endValue', value);
    };

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({endOpen: true});
        }
    };

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open});
    };
    handleSubmit = (e) => {
        console.log("save")
        e.preventDefault();
        this.props.form.validateFields((err, data) => {
            if (!err) {
                this.props.onOk && this.props.onOk(data);
            }
            console.log(data)
            console.log(data.startTime.format('YYYY-MM-DD HH:mm:ss'))
        });
        this.props.Save();
    };
    back = () => {
        console.log('back');
    };
    handleChange = (value) => {
        console.log('handleChange'+value);
        this.props.MaterialList(value);
    };
    onSearch=(value) => {
    console.log('showSearch'+value);
    this.props.MaterialList(value);
};
    render() {
        console.log(this.props)
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 10},
        };
        const {bomDetailInfo,materialSource} = this.props;
        let materialOptions = materialSource.map(item => <Option
            key={item.id}>{item.materialCode}</Option>);
        return (
            <div className="bom-wrap">
                <div className="bom-header">
                    <span className="bom-header-title">{this.props.title}</span>
                    <Button className="default-btn save" onClick={this.handleSubmit}>保存</Button>
                    <Button className="default-btn back" onClick={this.back}>返回</Button>
                </div>
                <div className="bom-form-content">
                    <div className="bom-baseInfo">
                        <span className="bom-baseInfo-icon"></span>
                        <span className="bom-form-baseInfo">基本信息</span>
                    </div>
                    <Form className="bom-form">
                        <Row type="flex" justify="end">
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="BOM编号:">
                                    {getFieldDecorator('bomCode', {
                                        initialValue: bomDetailInfo.bomCode,
                                    })(
                                        <Input disabled placeholder="系统自动生成编码"/>
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="BOM名称:">
                                    {getFieldDecorator('bomName', {
                                        initialValue: bomDetailInfo.bomName,
                                        rules: [{required: true, message: '请输入BOM名称'}],
                                    })(
                                        <Input placeholder="请输入BOM名称"/>
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="生效日期:">
                                    {getFieldDecorator('startTime', {
                                        initialValue: moment(bomDetailInfo.startTime),
                                        rules: [{type: 'object', required: true, message: '请选择生效日期'}],
                                    })(
                                        <DatePicker
                                            disabledDate={this.disabledStartDate}
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="Start"
                                            onChange={this.onStartChange}
                                            onOpenChange={this.handleStartOpenChange}
                                        />
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="类型:">
                                    {getFieldDecorator('type', {
                                        initialValue: bomDetailInfo.type,
                                        rules: [{required: true, message: '请选择类型'}],
                                    })(
                                        <Select style={{width: 100}} onChange={this.onChange}>
                                            <Option value="0">标准BOM</Option>
                                            <Option value="1">配置BOM</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="产品编号:">
                                    {getFieldDecorator('materialCode', {
                                        initialValue: bomDetailInfo.materialCode,
                                        rules: [{required: true, message: '请输入版本号'}],
                                    })(
                                        <Select
                                            showSearch
                                            onSearch={this.onSearch}
                                            placeholder="请输入产品编号"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                           >
                                            {materialOptions}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="版本号:">
                                    {getFieldDecorator('version', {
                                        initialValue: bomDetailInfo.version,
                                        rules: [{required: true, message: '请输入版本号'}],
                                    })(
                                        <Input placeholder="请输入版本号"/>
                                    )}
                                </FormItem>
                                <FormItem FormItem {...formItemLayout} label="失效日期:">
                                    {getFieldDecorator('endTime', {
                                        initialValue: moment(bomDetailInfo.endTime),
                                        rules: [{type: 'object', message: '请选择生效日期'}],
                                    })(
                                        <DatePicker
                                            disabledDate={this.disabledEndDate}
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="End"
                                            onChange={this.onEndChange}
                                            open={this.state.endOpen}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={8}>
                                <FormItem FormItem {...formItemLayout} label="备注:">
                                    {getFieldDecorator('remark', {
                                        initialValue: bomDetailInfo.remarks,
                                        rules: [{required: true, message: '请输入备注'}],
                                    })(
                                        <Input type="textarea" style={{height: 128, width: 286}} placeholder="请输入备注"/>
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Form.create()(BomComp);