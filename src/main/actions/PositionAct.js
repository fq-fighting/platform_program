import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { POSITIONREDU } from '../consts/ActTypes';

const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[POSITIONREDU].set('tabLoading', value);
        dispatch({ type: POSITIONREDU, state });
    },
    PositionLoading: (value) => (dispatch, getState) => {
        let state = getState()[POSITIONREDU].set('positionLoading', value);
        dispatch({ type: POSITIONREDU, state })
    },
    SidebarVisiable: (value) => (dispatch, getState) => {
        let state = getState()[POSITIONREDU].set('sidebar_visiable', value);
        dispatch({ type: POSITIONREDU, state });
    },
    AddPositionVisiable: (value) => (dispatch, getState) => {
        let state = getState()[POSITIONREDU].set('add_position_visiable', value);
        dispatch({ type: POSITIONREDU, state });
    },
    EditPositionVisiable: (value, id) => (dispatch, getState) =>  {
        let state = getState()[POSITIONREDU].set('edit_position_visiable', value);
        if (id||id===null) state = state.set('positionId', id);
        dispatch({ type: POSITIONREDU, state });
    },
    // Record: (value) => (dispatch, getState) => {
    //     let state = getState()[POSITIONREDU].set('record', value);
    //     dispatch({ type: POSITIONREDU, state });
    // },
    Position: (value) => (dispatch, getState) => {
        let state = getState()[POSITIONREDU].set('position', value);
        dispatch({ type: POSITIONREDU, state });
    },

    // AddPlaceVisiable: (value) => (dispatch, getState) => {
    //     let state = getState()[POSITIONREDU].set('add_place_visiable', value);
    //     dispatch({ type: POSITIONREDU, state });
    // },
    // EditImageVisiable: (value) => (dispatch, getState) => {
    //     let state = getState()[POSITIONREDU].set('edit_image_visiable', value);
    //     dispatch({ type: POSITIONREDU, state });
    // },

    GetPositionList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;
        let state = getState()[POSITIONREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: POSITIONREDU, state });
    },



    PositionList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: Urls.POSITION_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetPositionList(json.data));
            }    
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    // positionName: 职位名称模糊查询（列表）string
    // positionCode: 根据职位编号查询 strin g
    // page : int
    // pageSize : int
    PositionDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PositionLoading(true));
        return ReqApi.post({
            url: Urls.POSITION_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.Position(json.data));
            }
            dispatch(actions.PositionLoading(false));
            return json;
        });
    },
    // positionNumber : "String,职位号码"
    
    AddPosition: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PositionLoading(true));
        return ReqApi.post({
            url: Urls.POSITION_ADD,
            pm
        }).then(json => {
            dispatch(actions.PositionLoading(false));
            return json;
        })
    },
    // {
    //     "positionName": "String,职位名称",
    //     "positionCode": "String,职位编号",
    //     "positionDesc": "string, 职位描述"
    // }
    EditPosition: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.PositionLoading(true));
        let positionNumber = getState()[POSITIONREDU].get('positionId');
        return ReqApi.post({
            url: Urls.POSITION_UPDATE,
            pm: { ...pm, positionNumber },
            callBack: true
        }).then(json => {
            dispatch(actions.PositionLoading(false));
            return json
        })
    },
    //     "positionNumber": "String,职位号码",
    //     "positionName": "String,职位名称",
    //     "positionCode": "string,职位编号", //后台自动生成？表格里填什么？随便还是取消填入？
    //     "positionDesc": "string, 职位描述"

    PositionDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: Urls.POSITION_DEL,
            pm
        }).then(json => {
            dispatch(actions.TabLoading(false));
            return json;
        })
    },
    // positionNumber : "String,职位号码"
}

export default actions;