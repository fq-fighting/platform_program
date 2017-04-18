import React,{Component} from "react";
import { Modal, message,Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanyAct from '../actions/CompanyAct';
import AddCompanyComp from '../components/AddCompanyComp';

class AddCompanyCont extends Component{
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (data) => {
        let { loading, handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                tablePaging();
            };
        });
    }
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <AddCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                />: null
        );
    }
}

AddCompanyCont.defaultProps = {
    title: "新增公司",
}

const mapStateToProps = (state) => ({
    visible: state.CompanyRedu.get('add_company_visiable'),
    loading: state.CompanyRedu.get('companyLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CompanyAct.AddCompanyVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanyAct.AddCompany(data)) },
    AddAddressVisiable: () => { dispatch(CompanyAct.AddAddressVisiable(true)); },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddCompanyCont);
