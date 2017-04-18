import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from 'antd';
import AddressAct from '../actions/AddressAct';
import AddressComp from '../components/AddressComp';
import AddAddressCont from '../dialogconts/AddAddressCont';
import EditAddressCont from '../dialogconts/EditAddressCont';


class AddressCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.state={
             searchPm:{
                status:1, addressName: '', addressDetl: '',page: 1,pageSize: 20
            }
        };
    }
    tablePaging = (page) => {
        const { tabLoading, AddressList } = this.props;
        if (!tabLoading){
            if (typeof page === "number") {
                this.state.searchPm.page = page;
            } else {
                this.state.searchPm = { ...this.state.searchPm, ...page };
            };
            AddressList(this.state.searchPm);
        }
    }
    onSearch = (val) => {
        if (!this.props.tabLoading){
            this.setState({
                searchPm: { ...this.state.searchPm, addressName: val, addressDetl: val, page: 1 }
            },()=>this.tablePaging());
        }
    }
    onSelect=(val)=>{
        if(!this.props.tabLoading){
            val=parseInt(val);
            this.setState({
              searchPm:{ ...this.state.searchPm, status:val, page:1, }
            },()=>this.tablePaging());
        }
    }
    onClear = () => {
        this.setState({
            searchPm:{ ...this.state.searchPm, status:1, addressName: '', addressDetl: '', page: 1 }
        },()=>this.tablePaging());
    }
    render() {
        const {status,addressName, addressDetl} = this.state.searchPm;
        return (
            <div className="address-content">
                <AddressComp {...this.props}
                             SearchVal={addressName || addressDetl}
                             status={status}
                             tablePaging={this.tablePaging}
                             onSearch={this.onSearch}
                             onSelect={this.onSelect}
                             onClear={this.onClear}
                />
                <AddAddressCont tablePaging={this.onClear} />
                <EditAddressCont tablePaging={this.onClear} />
            </div>
        );
    }
}

const mapStateToProps = (state) => state.AddressRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    AddAddressVisiable: () => { dispatch(AddressAct.AddAddressVisiable(true)); },
    EditAddressVisiable: (id) => { dispatch(AddressAct.EditAddressVisiable(true, id)); },
    AddressList: (pm) => dispatch(AddressAct.AddressList(pm)),
    AddressDel: (addressCode) => dispatch(AddressAct.AddressDel({ addressCode })),
    AddressDisable:(addressCode,status)=>dispatch(AddressAct.AddressDisable({addressCode:[addressCode],status})),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressCont);