
import React, { Component } from "react";
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import CompanyComp from '../components/CompanyComp';
import Sidebar from '../../base/components/SidebarWrapComp';
import AddCompanyCont from '../dialogconts/AddCompanyCont';
import EditCompanyCont from '../dialogconts/EditCompanyCont';
import ExampleComp from '../components/ExampleComp';
import { fromJS, Record } from 'immutable';
import {Spin} from '../../base/components/AntdComp';
import AddAddressCont from '../dialogconts/AddAddressCont';
import EditAddressCont from '../dialogconts/EditAddressCont';

class CompanyModelCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.searchPm = { status:'0',companyName: '', companyCode: '',page: 1,pageSize: 20};
    }

    tablePaging = (page) => {
        let { tabLoading, CompanyList } = this.props;
        if (!tabLoading){
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = { ...this.searchPm, ...page };
            };
            CompanyList(this.searchPm)
        }
    }

    onSearch = (val) => {
        if (!this.props.tabLoading){
            this.searchPm = { ...this.searchPm, companyName: val, companyCode: val, page: 1 };
            this.tablePaging();
        }
    }
    
    onChange = (val) => {
        if (!this.props.tabLoading){
            this.searchPm = { ...this.searchPm, status:val, page: 1 };
            this.tablePaging();
        }
    }
    onClear = () => {
        this.searchPm = { ...this.searchPm, companyName: '', companyCode: '',status:'0', page: 1 };
        this.tablePaging();
    }
    render() {
        let { sidebar_visiable, SidebarVisiable,sidebar_loding} = this.props;
        return (
            <div className="manage-content">
                <CompanyComp {...this.props}
                    tablePaging={this.tablePaging}
                    onSearch={this.onSearch}
                    onClear={this.onClear}
                    onChange={this.onChange}
                    SearchVal={this.searchPm.companyName}
                    statusVal={this.searchPm.status}
                />
                <Sidebar maskClosable={true}
                         side_visible={sidebar_visiable}
                         onClose={() => SidebarVisiable(false)}

                >
                    <Spin spinning={sidebar_loding}><ExampleComp {...this.props}  onClear={this.onClear}/></Spin>
                </Sidebar>
                <AddCompanyCont tablePaging={this.onClear} />
                <EditCompanyCont tablePaging={this.onClear} />
                <AddAddressCont tablePaging={this.onClear}/>
                <EditAddressCont tablePaging={this.onClear}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log(state.CompanyRedu.toJS())
    return state.CompanyRedu.toJS()

};

const mapDispatchToProps = (dispatch) => ({
    Record: (companyCode) => { dispatch(CompanyAct.Record({companyCode})) },
    SearchPm: (value) => { dispatch(CompanyAct.SearchPm(value)) },
    SidebarVisiable: (value) => { dispatch(CompanyAct.SidebarVisiable(value)) },
    SidebarLoding:()=>{ dispatch(CompanyAct.SidebarLoding(true)) },
    AddCompanyVisiable: () => { dispatch(CompanyAct.AddCompanyVisiable(true)); },
    EditCompanyVisiable: (companyCode) => {dispatch(CompanyAct.EditCompanyVisiable(true,companyCode)); },
    ResetPassword:(companyCode) => { dispatch(CompanyAct.ResetPassword({companyCode})); },//重置密码
    CompanyList: (pm) => { dispatch(CompanyAct.CompanyList(pm)); },
    CompanyDel: (companyCode,status) => {  
        return dispatch(CompanyAct.CompanyDel({ companyCode,status }))
      
          
     },
    getAddress:()=>dispatch(CompanyAct.Address()),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyModelCont);
