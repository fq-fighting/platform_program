import React, {Component} from "react";
import {connect} from "react-redux";
import {Select, Button, Input, Form} from 'antd';
import TabsAct from '../actions/TabsAct';
import { store } from '../data/StoreConfig';
const Option = Select.Option;
const Search = Input.Search;
class LinkInputComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isInput: true,
            inputValue:'',
            SearchVal: props.SearchVal,
            key: '',
            value: '',
            condition: {}
        };
    }

    componentWillMount() {
    }

    onChange = (value) => {
        this.setState({isInput: value !== 'status'});
        this.setState({value: ''})
        this.setState({key: value})

    };
    query = () => {
        let queryKey=this.state.key;
        this.props.BomList({[queryKey]:this.state.value,page: 1,pageSize: 20})

    };
    add = () => {
        console.log('add')
        store.dispatch(TabsAct.TabAdd({title:"新建Bom",key:"add"}));
     /*   this.props.CleanBomDetail({});*/

    };
    handleInputChange= (event) => {
        this.setState({value: event.target.value})
    };
    handleStatusChange= (value) => {
        this.setState({value: value})
    };
    render() {
        return (
            <div className="link-input-cont">
                <div className="input-select">
                            <Select style={{width: 180}} onChange={this.onChange}>
                                <Option value="bomNum">BOM编码</Option>
                                <Option value="version">版本号</Option>
                                <Option value="productNum">产品编号</Option>
                                <Option value="status">状态</Option>
                                <Option value="name">BOM名称</Option>
                            </Select>
                    {this.state.isInput ?
                                <Input   style={{width: 180,marginLeft:20}} value={this.state.value}  onChange={this.handleInputChange}/>:
                                <Select   style={{width: 100,marginLeft:20}} onChange={this.handleStatusChange}>
                                    <Option value="enable">启用</Option>
                                    <Option value="unable">停用</Option>
                                </Select>}
                    <Button className="default-btn query-bom" onClick={this.query}>查询</Button>
                    <Button className="default-btn new-bom" onClick={this.add}>新建</Button>
                    </div>

            </div>
        )
    }
}
export default Form.create()(LinkInputComp);