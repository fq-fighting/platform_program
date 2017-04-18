import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import AddressAct from '../actions/AddressAct';
import AddAddressComp from '../components/AddAddressComp';

class AddAddressCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    initData = () =>{
        const { AddressCountry,handleCancel } = this.props;
        AddressCountry();
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging,isFetch,onOK,handleNewAddress } = this.props;
        if(isFetch != false){
            handleSubmit(data).then(json => {
                if (json.status === 2000) {
                    handleCancel();
                    handleNewAddress(json.data.addressCode);
                }
            });
        }else{
            onOK(data);
            handleCancel();
        }
    }
    render() {
        const { add_address_visiable,addressLoading } = this.props;
        return (
            add_address_visiable ?
                <AddAddressComp
                    {...this.props}
                    visible={add_address_visiable}
                    loading={addressLoading}
                    initData={this.initData}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddAddressCont.defaultProps = {
    title: "新增地址",
    width:766,
}

const mapStateToProps = (state) => { return state.AddressRedu.toJS() }

const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(AddressAct.AddAddressVisiable(false)) },
    handleSubmit: (data) => { return dispatch(AddressAct.AddAddress(data)) },
    AddressCountry: () => { dispatch(AddressAct.CountryList())}
})


export default connect(mapStateToProps,mapDispatchToProps)(AddAddressCont);
