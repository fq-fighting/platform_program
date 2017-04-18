import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import AddAddressComp from '../components/AddAddressComp';

class AddAddressCont extends Component{
    constructor(props, context) {
        super(props, context);
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
        const { visible } = this.props;
        return (
            visible ?
                <AddAddressComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddAddressCont.defaultProps = {
    title: "新增地址",
    width:766,
}

const mapStateToProps = (state) => ({
    visible: state.CompanyRedu.get('add_address_visiable'),
    loading: state.CompanyRedu.get('addressLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CompanyAct.AddAddressVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanyAct.AddAddress(data)) },
    handleNewAddress: (data) => { return dispatch(CompanyAct.handleNewAddress(data)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddAddressCont);


