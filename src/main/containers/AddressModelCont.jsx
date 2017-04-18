import React,{Component} from "react";
import { connect } from 'react-redux';
import { Button ,Select } from '../../base/components/AntdComp';
import AddAddressCont from '../dialogconts/AddAddressCont';
import EditAddressCont from '../dialogconts/EditAddressCont';
import SelectorTransferCont from '../dialogconts/SelectorTransferCont';
import AddressAct from '../actions/AddressAct';
import LinkageAct from '../actions/LinkageAct';
import SelectorAct from '../actions/SelectorAct';
class AddressModelCont extends Component{
    constructor(prop){
        super(prop);
    }
    onAdd=()=>{
        this.props.AddAddressVisiable();
    }
    onEdit=(id)=>{
        this.props.EditAddressVisiable(id);
    }
    onOK=(data)=>{
        console.log(data);
    }
    onShow=()=>{
       this.props.SelectVisiable(true);
    }
    componentDidMount() {
        // this.props.CityList();
    }
    componentWillMount(){
        //this.props.CityList();
    }
    handleSubmit=(data)=>{
        console.log(data);
    }
    getSelect=()=>{
        if(this.props.source.citySource.length>0){
            return (<Select defaultValue={this.props.addressId} style={{ width: 120 }} >
                    {
                        this.props.source.citySource.map(item => 
                        <Option key={item.cityCode} value={item.cityCode} >{item.cityName}</Option>)
                    }
                </Select>);
        }else{
            return null;
        }
    }
    render(){
        // let cityOptions = this.props.source.citySource.map(item => 
        // <Option key={item.cityCode} value={item.cityCode} >{item.cityName}</Option>);
        // console.log(this.props.source.citySource);
        // console.log(cityOptions);
        return (
            <div className="manage-content">
                <Button onClick={this.onAdd}>新增临时地址</Button>
                <Button onClick={()=>this.onEdit(1)}>编辑地址</Button>
                <Button onClick={()=>this.onShow()}>弹出选人选部门</Button>
                <AddAddressCont isFetch={false} onOK={this.onOK} />
                <EditAddressCont />
                <SelectorTransferCont handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}
const mapStateToProps = (state) => state.AddressRedu.toJS();

const mapDispatchToProps = (dispatch) => ({
    AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
    EditAddressVisiable: (id) => { dispatch(AddressAct.EditAddressVisiable(true, id)); },
    SelectVisiable: (isOK) => { dispatch(SelectorAct.visibleDialog(true)); },
    CityList: () => { dispatch(AddressAct.CityList()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressModelCont);
