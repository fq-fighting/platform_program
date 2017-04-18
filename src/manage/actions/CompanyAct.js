import { ReqApi } from '../../base/services/ReqApi'
import { ManageUrls ,Urls} from '../../base/consts/Urls';
import * as AT from '../consts/ActTypes';
import {message} from '../../base/components/AntdComp';
const actions = {
    TabLoading: (value) =>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('tabLoading', value);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },
    CompanyLoading: (value)=>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('companyLoading', value);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },
    SidebarVisiable: (value)=>(dispatch,getState)=> {
        if(getState()[AT.COMPANYREDU].get('sidebar_loding')){
            return
        }
        let state = getState()[AT.COMPANYREDU].set('sidebar_visiable', value);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },
    AddCompanyVisiable: (value) => (dispatch,getState)=>{
        let state = getState()[AT.COMPANYREDU].set('add_company_visiable', value);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },

    EditCompanyVisiable: (value,id)=>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('edit_company_visiable', value);
        if (id) state = state.set('companyId', id);
        dispatch({ type: AT.COMPANYREDU, state }) 


    },

    Record: (pm={})=>(dispatch,getState) => {
        ReqApi.get({
            url: ManageUrls.MANAGE_DETAIL,
            pm
        }).then((json) => {
            dispatch(actions.GetRecord(json.data));
            dispatch(actions.SidebarLoadingHide(false));


        });

    },
    GetRecord:(data)=>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('record', data);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },
    GetEditData:(data)=>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('editdata', data);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },

    SidebarLoding:(value)=>(dispatch,getState)=>{
        let state = getState()[AT.COMPANYREDU].set('sidebar_loding', value);
        dispatch({ type: AT.COMPANYREDU, state }) 
    },
    SidebarLoadingHide:(value)=>(dispatch,getState)=>{
        let state = getState()[AT.COMPANYREDU].set('sidebar_loding', value);
       dispatch({ type: AT.COMPANYREDU, state }) 
    },
    SearchPm: (value) =>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('searchPm', value);
        dispatch({ type: AT.COMPANYREDU, state })
    },
    Company: (value) =>(dispatch,getState)=>  {

        let telephoneO={telephoneO:value.telephoneNumber.substr(0,value.telephoneNumber.indexOf('-'))}
        let telephoneN={telephoneN:value.telephoneNumber.substr(value.telephoneNumber.indexOf('-')+1)}
        Object.assign(value, telephoneO,telephoneN);//合并对象
        let state = getState()[AT.COMPANYREDU].set('position', value);
        dispatch({ type: AT.COMPANYREDU, state })
    },


    GetCompanyList: (data) => (dispatch, getState) => {
        let { list, total, page, pageSize } = data;

        let statusO={status:'启用'}
        let statusN={status:'停用'}
        for(let x in list){
            if(list[x].status=='1'){
                Object.assign(list[x],statusO );
            }else{
                Object.assign(list[x],statusN );
            }

        }

         let state = getState()[AT.COMPANYREDU].set('dataSource', list)
            .set("paging", { total, current: page, pageSize });
         dispatch({ type: AT.COMPANYREDU, state })
    },

    CompanyList: (pm = {}) => (dispatch, getState) => {

        dispatch(actions.TabLoading(true));
        ReqApi.get({
            url: ManageUrls.MANAGE_LIST,
            pm
        }).then((json) => {
            dispatch(actions.GetCompanyList(json.data));
            dispatch(actions.TabLoading(false));
            return json;
        });
    },
    CompanyDetail: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.CompanyLoading(true));
        ReqApi.post({
            url: ManageUrls.MANAGE_DETAIL,
            pm
        }).then(json => {
            if (json.status === 2000) {
               dispatch(actions.Company(json.data));
               
            }
            dispatch(actions.CompanyLoading(false));
            return json;
        })
    },

    AddCompany: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.CompanyLoading(true));
        return ReqApi.post({
            url: ManageUrls.MANAGE_ADD,
            pm
        }).then(json => {
            dispatch(actions.CompanyLoading(false));
            return json
        })
    },
    EditCompany: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.CompanyLoading(true));
        return ReqApi.post({
            url: ManageUrls.MANAGE_UPDATE,
            pm
        }).then(json => {
            let code=pm.companyCode
              dispatch(actions.CompanyLoading(false));
              dispatch(actions.SidebarLoding(true));
              dispatch(actions.Record({code})); 
            return json
        })
    },
    CompanyDel: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.SidebarLoding(true));
        return ReqApi.get({
            url: ManageUrls.MANAGE_STATUS,
            pm
        }).then(json => {
            let code=pm.companyCode
          dispatch(actions.Record({code})); 
           return json;
        })
    },
    ResetPassword:(pm = {}) => (dispatch, getState) => {
    return ReqApi.get({
        url: ManageUrls.MANAGE_RESET,
        pm
    }).then(json => {
        if(json.status && (json.status === 2000)){
            message.success('This is a message of success');
        }else if(json.status && (json.status === 4206)){
            message.error('This is a message of error');
        }

    })
},
    AddAddressVisiable: (value) =>(dispatch,getState)=>{
            let state = getState()[AT.COMPANYREDU].set('add_address_visiable', value);
             dispatch({ type: AT.COMPANYREDU, state })
        },
    EditAddressVisiable: (value,id) =>(dispatch,getState)=>{
        let state = getState()[AT.COMPANYREDU].set('edit_address_visiable', value);
        if (id||id===null) state = state.set('addressId', id);
        dispatch({ type: AT.COMPANYREDU, state });
    },
    AddAddress: (pm = {}) => (dispatch, getState) => {
        //console.log(pm)
        let state=getState()[AT.COMPANYREDU].set('address',pm);
        dispatch({type: AT.COMPANYREDU, state})
        dispatch(actions.AddressLoading(true));
        return ReqApi.post({
            url: Urls.ADDRESS_ADD,
            pm
        }).then(json => {
            dispatch(actions.AddressLoading(false));
            return json
        })
    },
    EditAddress: (pm = {}) => (dispatch, getState) => {
        dispatch(actions.AddressLoading(true));
        let addressCode=getState()[AT.COMPANYREDU].get('addressId');
        return ReqApi.post({
            url: Urls.ADDRESS_EDIT,
            pm:{...pm,addressCode}
        }).then(json => {
            dispatch(actions.AddressLoading(false));
            return json
        })
    },

    AddressLoading: (value) =>(dispatch,getState)=> {
        let state = getState()[AT.COMPANYREDU].set('addressLoading', value);
         dispatch({ type: AT.COMPANYREDU, state })
    },

    Address:(pm={})=>(dispatch, getState)=>{
        return ReqApi.get({
            url: Urls.ADDRESS_ALLLIST,
            pm
        }).then(json=>{
            dispatch(actions.get_Address(json.data.list));
            return json;
        })
    },

    handleNewAddress:(data)=>(dispatch, getState)=>{
        let state=getState()[AT.COMPANYREDU].set('addressCode',data);
        dispatch({type: AT.COMPANYREDU, state})
    },
}

export default actions