import { ReqApi } from '../../base/services/ReqApi'
import { LoginUrls } from '../../base/consts/Urls';
import { RESETPWDREDU } from '../consts/ActTypes';
import { message } from '../../base/components/AntdComp';

let actions = {
    nextPhoneStep: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepLoading', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    nextPhoneVisible: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepVisible', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    nextStepDisabled: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('nextStepDisabled', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    showPicCode: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('showPicCode', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    enterOnSubmit: (value) => (dispatch, getState) => {
        let state = getState()[RESETPWDREDU].set('submitLoading', value);
        dispatch({ type: RESETPWDREDU, state });
    },
    //发送手机验证码
    sendPhoneCodeTo: (pm={})=>(dispatch,getState)=>{
        console.log(pm)
      ReqApi.get({
            url: LoginUrls.LOGIN_GET_SMSWITH,
            pm,
        }).then((json) => {
             if(json.status && json.status===4100){
                dispatch(actions.showPicCode(true));
            }
        })
    },
    //验证手机验证码
     nextStep: (pm={}) => (dispatch, getState) => {
        dispatch(actions.nextPhoneStep(true));
        ReqApi.post({
            url: LoginUrls.LOGIN_CHECK_PHONE,
            pm,
        }).then((json) => {
            if(json.status && json.status===2000){
                dispatch(actions.nextPhoneStep(false));
                dispatch(actions.nextPhoneVisible(false));
            }
        });
    },
    //提交密码
    submitPwd: (pm={})=>(dispatch,getState)=>{      
        dispatch(actions.enterOnSubmit(true));
        ReqApi.post({
            url: LoginUrls.LOGIN_RESET_PSW,
            pm,
        }).then((json)=>{
           if(json.status && json.status===2000){
               dispatch(actions.enterOnSubmit(false));
               message.success('修改成功');
            }
        });
    },
    
}
export default actions;