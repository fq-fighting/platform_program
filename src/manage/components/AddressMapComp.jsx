/*地址百度API组件 */
import React,{Component} from "react";
import { connect } from 'react-redux';
import { Form, Button,Input } from '../../base/components/AntdComp';
import FormComp from '../../base/components/FormComp';
import LinkageComp from '../components/LinkageComp';
import MapComp from '../../base/components/MapComp';

const FormItem = Form.Item;
class AddressMapComp extends FormComp{
    constructor(prop){
        super(prop);
        this.state = {
            address: null,
            addressDetl: null,
        }
    }
    onPress=(e)=>{
        let address = this.getFdv("address");
        let addressDetl = this.getFdv("addressDetl");
        this.setState({ address, addressDetl });
    }
    render(){
        const { address } = this.props;
        const tailFormItemLayout = {
            wrapperCol: {span: 14,offset: 3}
        };
        return (
            <div>
                <FormItem className="select-ganged" labelCol={{span: 3}} wrapperCol={{ span: 16}} label="地址搜索" >
                    {this.getFD('address')(
                        <LinkageComp  />)
                    }
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {this.getFD('addressDetl', {
                        initialValue:address.addressDetl,
                        rules: [
                            { type:"required", message: '请输入详细地址' },
                        ],
                    })(
                        <Input placeholder="详细地址" onPressEnter={(e)=>this.onPress(e)}  />
                    )}
                </FormItem>
                
                <FormItem className="map" wrapperCol={{ span: 24 }} >
                    {this.getFD('map')(
                        <MapComp search={this.state}/>)
                    }
                </FormItem>
            </div>
        );
    }
}

export default AddressMapComp;
