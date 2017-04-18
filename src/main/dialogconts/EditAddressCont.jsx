import React,{Component} from "react";
import { connect } from 'react-redux';
import { Modal, message } from '../../base/components/AntdComp';
import AddressAct from '../actions/AddressAct';
import LinkageAct from '../actions/LinkageAct';
import EditAddressComp from '../components/EditAddressComp';

class AddAddressCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    initData = () =>{
        const {loading, AddressDetail,AddressLinkage, addressId,handleCancel } = this.props;
        if (!loading && addressId) {
            AddressDetail(addressId).then(json => {
                if (json.status === 2000) {
                    let data = json.data.list[0];
                    let {countryCode,provinceCode,cityCode,countyCode} = data;
                    AddressLinkage({countryCode,provinceCode,cityCode,countyCode});
                } else if (json.status === 4352) {
                    message.warn('获取地址详情失败!');
                    handleCancel(null);
                };
            });
        }
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
            };
        });
    }
    render() {
        const { edit_address_visiable,addressLoading } = this.props;
        return (
            edit_address_visiable ?
                <EditAddressComp
                    {...this.props}
                    visible={edit_address_visiable}
                    loading={addressLoading}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                /> : null
        );
    }
}

AddAddressCont.defaultProps = {
    title: "编辑地址",
    width:766,
}

const mapStateToProps = (state) => { return state.AddressRedu.toJS() }
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(AddressAct.EditAddressVisiable(false,id)) },
    handleSubmit: (data) =>  dispatch(AddressAct.EditAddress(data)) ,
    AddressDetail: (addressCode) =>  dispatch(AddressAct.AddressDetail({ addressCode })) ,
    //四级联动复原方法
    AddressLinkage: (pm) => dispatch(AddressAct.LinkageLoad(pm))
})


export default connect(mapStateToProps,mapDispatchToProps)(AddAddressCont);
