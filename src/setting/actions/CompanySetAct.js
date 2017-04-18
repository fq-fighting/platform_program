import { ReqApi } from '../../base/services/ReqApi'
import { Urls ,ManageUrls} from '../../base/consts/Urls'
import { COMPANYSETREDU } from '../consts/ActTypes'
import { getData } from '../data/StoreConfig';

const actions = {
    // 被选中数量
    GetPersonalInfoDetails: (data) => (dispatch, getState) => {
        let state = getState()[COMPANYSETREDU].set('enterpriseInfo', data);
        dispatch( {type: COMPANYSETREDU, state} )
    },
    Loading: (value) => (dispatch, getState) => {
        let state = getState()[COMPANYSETREDU].set('loading', value);
        dispatch( {type: COMPANYSETREDU, state} )
    },
    getEnterpriseInfo: () => (dispatch, getState) => {
        dispatch(actions.Loading(true) )
        ReqApi.get({
            url: Urls.SET_ENTERPRISE_INFO,
        }).then(json => {
            if(json.status == 2000){
                dispatch(actions.GetPersonalInfoDetails(json.data));
            }
            dispatch(actions.Loading(false) )
        })
    },

    AddPositionVisiable: (value) => {
        let state = getData(COMPANYSETREDU).setIn(['add_position_visiable'], value);
        return { type: COMPANYSETREDU, state }
    },
    EditPosition: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PositionLoading(true));
        return ReqApi.post({
            url: ManageUrls.MANAGE_UPDATEBYUSER,
            pm
        }).then(json => {
            dispatch(actions.PositionLoading(false));
            let code=pm.companyCode
            dispatch(actions.getEnterpriseInfo({code}))
            return json
        })
    },
    PositionLoading: (value) => {
        let state = getData(COMPANYSETREDU).setIn(['positionLoading'], value);
        return { type: COMPANYSETREDU, state }
    },
    PositionDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PositionLoading(true));
        ReqApi.post({
            url: Urls.SET_ENTERPRISE_INFO,
            pm
        }).then(json => {
            dispatch(actions.Position(json.data));
            dispatch(actions.PositionLoading(false));
        })
    },
    Position: (value) => {
        let telephoneO={telephoneO:value.telephoneNumber.substr(0,value.telephoneNumber.indexOf('-'))}
        let telephoneN={telephoneN:value.telephoneNumber.substr(value.telephoneNumber.indexOf('-')+1)}
        Object.assign(value, telephoneO,telephoneN);//合并对象
        let state = getData(COMPANYSETREDU).setIn(['position'], value);
        return { type: COMPANYSETREDU, state }
    },

}

export default actions