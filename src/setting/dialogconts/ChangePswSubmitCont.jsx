import React,{Component} from "react";
import { Modal, message } from "antd";
import { connect } from 'react-redux';
import actions from '../actions/PersonalCenterAct';
import ChangePswSubmitComp from '../components/ChangePswSubmitComp';
// import TXT from '../languages';
// const T = TXT.POSITION;

class ChangePswSubmitCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    handleSubmit = (data) => {
        let { handleSubmit, handleCancel,getPersonalInfo } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                // message.info('修改密码成功!')
                handleCancel();
                getPersonalInfo();
                
            }
        });
    }
    
    render() {
        let { visible } = this.props;
        return (
            visible ?
                <ChangePswSubmitComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

// BindPhoneCont.defaultProps = {
//     title: T.ADD,
// }


const mapStateToProps = (state) => ({
    visible: state.PersonalCenterRedu.get('change_psw_submit_visiable'),
    loading: state.PersonalCenterRedu.get('change_psw_loading'),
})
const mapDispatchToProps = (dispatch) => ({
    getPersonalInfo: () => {dispatch( actions.getPersonalInfo())},
     handleCancel: () => { dispatch(actions.changePswSubmitVisiable(false)) },
     handleSubmit: (data) => dispatch(actions.changePswSubmit(data)),
})


export default connect(mapStateToProps,mapDispatchToProps)(ChangePswSubmitCont);
