import React,{Component} from "react";
import { Modal, message,Spin } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import CompanySetAct from '../actions/CompanySetAct';
import EditCompanyComp from '../components/EditCompanyComp';
class EditCompanyCont extends Component{
    constructor(props, context) {
        super(props, context);

    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
               // console.log('编辑公司成功!');
                handleCancel();
            }
        });
    }
    render() {
        let { visible } = this.props;

        return (
            visible ?
                <EditCompanyComp
                    {...this.props}
                    onOk={this.handleSubmit}
                />: null
        );
    }
}

EditCompanyCont.defaultProps = {
    title: "编辑公司",
}

const mapStateToProps = (state) => ({
    visible: state.CompanySetRedu.get('add_position_visiable'),
    loading: state.CompanySetRedu.get('positionLoading'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(CompanySetAct.AddPositionVisiable(false)) },
    handleSubmit: (data) => { return dispatch(CompanySetAct.EditPosition(data)) },
})


export default connect(mapStateToProps,mapDispatchToProps)(EditCompanyCont);
