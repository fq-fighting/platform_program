import React,{Component} from "react";
import { Modal, message,Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import EditCompanyComp from '../components/EditCompanyComp';

class AddCompanyCont extends Component{
    constructor(props, context) {
        super(props, context);

    }
    initData = () =>{
        let { getCompanyDetail, companyId} = this.props;
        console.log(this.props)
        if (companyId) {
            getCompanyDetail(companyId)
        }
    }

    handleSubmit = (data) => {
        let { loading, handleSubmit, handleCancel, tablePaging,onClear  } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            } ;
        });
    }

    render() {
        let { visible } = this.props;
        return (
            visible ?
                <EditCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                />: null
        );
    }
}

AddCompanyCont.defaultProps = {
    title: "编辑公司",
}

const mapStateToProps = (state) => ({
    visible: state.CompanyRedu.get('edit_company_visiable'),
    loading: state.CompanyRedu.get('companyLoading'),
    position: state.CompanyRedu.get('position'),
    companyId: state.CompanyRedu.get('companyId'),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: () => { dispatch(CompanyAct.EditCompanyVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanyAct.EditCompany(data)) },
    getCompanyDetail: (companyCode) => {  dispatch(CompanyAct.CompanyDetail({ companyCode })) },
    AddAddressVisiable: () => { dispatch(CompanyAct.AddAddressVisiable(true)); },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddCompanyCont);
