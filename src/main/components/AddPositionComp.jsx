import React, { Component, PropTypes } from "react";
import { Form, Input, Spin, Button, Modal } from 'antd';
import FormModalComp from '../../base/components/FormModalComp';
import TXT from '../languages';
const T = TXT.POSITION;
const FormItem = Form.Item;

class AddPositionComp extends FormModalComp {
    constructor(props, context) {
        super(props, context);

    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.loading) {
            this.validateFds((err, data) => {
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
        const { position } = this.props;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label={T.NAME}
                    hasFeedback
                >
                    {this.getFD('positionName', {
                        initialValue: position.positionName,
                        rules: [
                            { type: "required", message: T.NAMEHELP ,}
                        ],
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={T.CODE}
                    hasFeedback
                >
                    {this.getFD('positionCode', {
                        initialValue: position.positionCode,
                    })(
                        <Input />
                        )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={T.DESC}
                    hasFeedback
                >
                    {this.getFD('positionDesc', {
                        initialValue: position.positionDesc,
                    })(
                        <Input />
                        )}
                </FormItem>
            </Form>
        )
    }
}
AddPositionComp.defaultProps = {
    position: {
        positionNumber: null,
        positionName: null,
        positionCode: null,
        positionDesc: null,
    },
}
AddPositionComp.propTypes = {
    position: PropTypes.object,
}

export default Form.create()(AddPositionComp);


