import { ReqApi } from '../../base/services/ReqApi'
import { Urls,LoginUrls } from '../../base/consts/Urls'
import { PERSONALCENTERREDU } from '../consts/ActTypes'


const actions = {
    // 被选中数量
    GetPersonalInfoDetails: (data) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('personalInfo', data);
        dispatch( {type: PERSONALCENTERREDU, state})
    },
    bindPhoneVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    bindPhoneNextstepVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_nextstep_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    changePswSubmitVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('change_psw_submit_visiable', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    bindPhoneLoading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('bind_phone_loading', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    ChangePswLoading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('change_psw_loading', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    side_Loading: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('side_Loading', value);
        dispatch( {type: PERSONALCENTERREDU, state} )
    },
    getPersonalInfo: () => (dispatch, getState) => {
        // 获取登录 个人信息
        dispatch(actions.side_Loading(true))
        ReqApi.get({
            url: Urls.GET_PERSONAL_INFO,
        }).then(json => {
            if(json.status == 2000){
                dispatch(actions.GetPersonalInfoDetails(json.data));
            }
            dispatch(actions.side_Loading(false))
        })
    },
    sendPhoneCode: (pm={}) => (dispatch, getState) => {
        ReqApi.get({
            url: LoginUrls.LOGIN_GET_SMS,
            pm,
        }).then(json => {
            if(json.status==4104){
                console.log("验证码错误")
            }
            
        })
    },
    bindPhoneSubmit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.bindPhoneLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_BIND_PHONE,
            pm
        }).then(json => {
            dispatch(actions.bindPhoneLoading(false));
            return json;
        })
    },
    BindPhoneNextStep: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.bindPhoneLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_CHECK_PSW,
            pm
        }).then(json => {
            dispatch(actions.bindPhoneLoading(false));
            return json;
        })
    },
    changePswSubmit: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.ChangePswLoading(true));
        return ReqApi.post({
            url: LoginUrls.LOGIN_RESET_PSWWITH,
            pm
        }).then(json => {
            dispatch(actions.ChangePswLoading(false));
            return json;
        })
    },
    EditImageVisiable: (value) => (dispatch, getState) => {
        let state = getState()[PERSONALCENTERREDU].set('editImageVisiable', value);
        dispatch({ type: PERSONALCENTERREDU, state })
    },
    EditImage: (pm = {}) => (dispatch, getState) => {
        return ReqApi.post({
            url: Urls.EDIT_PROFILE_PHOTO,
            pm
        }).then(json => {
            return json;
        })
    },
}

export default actions