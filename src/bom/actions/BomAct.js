import {ReqApi} from '../../base/services/ReqApi'
import BomUrls from '../../base/consts/BomUrls';
import {BOMREDU} from '../consts/ActTypes';


const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('tabLoading', value);
        dispatch({type: BOMREDU, state});
    },
    BomLoading: (value) => (dispatch, getState) => {
        let state = getState()[BOMREDU].set('bomLoading', value);
        dispatch({type: BOMREDU, state})
    },
    BomList: (pm = {}) => (dispatch, getState) => {
        console.log("BomList");
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: BomUrls.MAIN_BOM_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetBomList(json.data));
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    GetBomList: (data) => (dispatch, getState) => {
        let {list, total, page, pageSize} = data;
        let state = getState()[BOMREDU].set('dataSource', list)
            .set("paging", {total, current: page, pageSize});
        dispatch({type: BOMREDU, state});
    },
    AddBom: (pm = {}) => (dispatch, getState) => {

        return ReqApi.post({
            url: BomUrls.ADD_BOM,
            pm
        }).then(json => {
            return json
        })
    },
    DeleteBom: (pm = {}) => (dispatch, getState) => {
        console.log("DeleteBom");
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: BomUrls.DELETE_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                actions.BomList();
            }
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    BomDetail: (pm = {}) => (dispatch, getState) => {
        console.log("ajax");
        dispatch(actions.BomLoading(true));
        return ReqApi.get({
            url: BomUrls.DETAIL_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetBomDetail(json.data));
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    GetBomDetail: (data) => (dispatch, getState) => {
            let state = getState()[BOMREDU].set('bomDetailInfo', data)
            dispatch({type: BOMREDU, state});

    },
    EditBom: (pm = {}) => (dispatch, getState) => {
        console.log("EditBom");
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.EDIT_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    CopyBom: (pm = {}) => (dispatch, getState) => {
        console.log("CopyBom");
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.COPY_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    UpgradeBom: (pm = {}) => (dispatch, getState) => {
        console.log("UpgradeBom");
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.UPGRADE_BOM,
            pm
        }).then((json) => {
            if (json.status === 2000) {
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    CheckDate: (pm = {}) => (dispatch, getState) => {
        console.log("CheckDate");
        dispatch(actions.BomLoading(true));
        return ReqApi.post({
            url: BomUrls.CHECK_DATE,
            pm
        }).then((json) => {
            if (json.status === 2000) {
            }
            dispatch(actions.BomLoading(false));
            return json;
        });
    },
    MaterialList: (pm = {}) => (dispatch, getState) => {
        console.log("MaterialList");
        return ReqApi.get({
            url: BomUrls.MATERIAL_LIST,
            pm
        }).then((json) => {
            console.log(json)
            if (json.status === 2000) {
                dispatch(actions.GetMaterialList(json.data));
            }
            return json;
        });
    },
    GetMaterialList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[BOMREDU].set('materialSource', list)
        dispatch({type: BOMREDU, state});
    },
   CleanBomDetail: (data) => (dispatch, getState) => {
        console.log("CleanBomDetail");
        let state = getState()[BOMREDU].set('bomDetailInfo', data)
        dispatch({type: BOMREDU, state});
    },
}
export default actions
