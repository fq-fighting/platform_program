import { ReqApi } from '../../base/services/ReqApi'
import { Urls } from '../../base/consts/urls';
import { SITEREDU } from '../consts/ActTypes';

const actions = {
    TabLoading: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('tabLoading', value);
        dispatch({ type: SITEREDU, state });
    },
    SiteLoading: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('siteLoading', value);
        dispatch({ type: SITEREDU, state })
    },
    AddSiteVisiable: (value) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('add_site_visiable', value);
        dispatch({ type: SITEREDU, state });
    },
    EditSiteVisiable: (value, id) => (dispatch, getState) =>  {
        let state = getState()[SITEREDU].set('edit_site_visiable', value);
        if (id||id===null) state = state.set('siteId', id);
        dispatch({ type: SITEREDU, state });
    },
    GetSiteList: (json) => (dispatch, getState) => {
        let { total, page, pageSize } = json;
        let state = getState()[SITEREDU].set('dataSource', json.data.list)
            .set("paging", { total, current: page, pageSize });
        dispatch({ type: SITEREDU, state });
    },
    Site: (data) => (dispatch, getState) => {
        data.siteUse = [];
        if (data.isSog == 1) //仓储管理
            data.siteUse.push("isSog");
        if (data.isPrd == 1) //生产制造
            data.siteUse.push("isPrd");
        if (data.isDot == 1) //服务网点
            data.siteUse.push("isDot");
        let state = getState()[SITEREDU].set('site', data);
        dispatch({ type: SITEREDU, state });
    },

    SiteList: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.post({
            url: Urls.SITE_LIST,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetSiteList(json));
            }    
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    SiteDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.TabLoading(true));
        return ReqApi.get({
            url: Urls.SITE_DEL,
            pm
        }).then(json => {
            dispatch(actions.TabLoading(false));
            return json;
        })
    },
    SiteDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        return ReqApi.get({
            url: Urls.SITE_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000) {
                let _data = json.data.list[0];
                dispatch(actions.Site(_data));
            }
            dispatch(actions.SiteLoading(false));
            return json;
        });
    },
     AddSite: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        return ReqApi.post({
            url: Urls.SITE_ADD,
            pm
        }).then(json => {
            dispatch(actions.SiteLoading(false));
            return json
        })
    },
    EditSite: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SiteLoading(true));
        let siteCode=getState()[SITEREDU].get('siteId');
        return ReqApi.post({
            url: Urls.SITE_EDIT,
            pm:{...pm,siteCode}
        }).then(json => {
            dispatch(actions.SiteLoading(false));
            return json
        })
    },

        
   SiteDisable: (pm = {}) => (dispatch,getState)=>{
       dispatch(actions.TabLoading(true));
        return ReqApi.post({
           url:Urls.SITE_ISDISABLE,
           pm
        }).then(json=>{
            dispatch(actions.TabLoading(false));
            return json
        })
    },
    
    pDeptName:()=>(dispatch, getState)=>{
        ReqApi.get({
            url: Urls.DEPARTMENT_LIST
        }).then(json => {
            if (json.status === 2000) {
                dispatch(actions.get_pDeptName(json.data));
            }
            dispatch(actions.SiteLoading(false));
            return json
        })
    },
    get_pDeptName:(data) => (dispatch, getState) => {
        let state = getState()[SITEREDU].set('orgCode', [data]);
        dispatch({type: SITEREDU, state})
    },
    
}

export default actions;