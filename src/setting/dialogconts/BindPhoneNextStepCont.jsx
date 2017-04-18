import React,{Component} from "react";
import { Modal, message } from "antd";
import { connect } from 'react-redux';
import actions from '../actions/PersonalCenterAct';
import BindPhoneNextStepComp from '../components/BindPhoneNextStepComp';
// import TXT from '../languages';
// const T = TXT.POSITION;

class BindPhoneNextStepCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { BindPhoneNextStep, handleCancel,bindPhoneVisiable } = this.props;
        
        BindPhoneNextStep(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
                bindPhoneVisiable();
            }
        });
    }
    
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <BindPhoneNextStepComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}


const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('bind_phone_nextstep_visiable'),
    loading: state.PersonalCenterRedu.get('bind_phone_loading'),
})
const mapDispatchToProps = (dispatch) => ({
     handleCancel: () => { dispatch(actions.bindPhoneNextstepVisiable(false)) },
     bindPhoneVisiable: () => { dispatch(actions.bindPhoneVisiable(true)) },
     BindPhoneNextStep: (data) => dispatch(actions.BindPhoneNextStep(data)),
})

export default connect(mapStateToProps,mapDispatchToProps)(BindPhoneNextStepCont);
