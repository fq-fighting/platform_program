import { ReqApi } from '../../base/services/ReqApi'
import { MEMBERCHANGEREDU,PERSONMANAGE } from '../consts/ActTypes'
import { MemberManage ,Urls} from '../../base/consts/Urls';

const actions = {
    //批量移动部门
    MoveDepLoading:(value)=>(dispatch,getState)=>{
        let state = getState()[MEMBERCHANGEREDU].set('MoveDepLoading', value);
        dispatch({type:MEMBERCHANGEREDU, state});
    },
   MoveDepVisiable:(value)=>(dispatch,getState)=>{
       let state=getState()[MEMBERCHANGEREDU].set('MoveDepVisiable',value);
       dispatch({type:MEMBERCHANGEREDU,state});
   },
    MoveDep:(pm={})=>(dispatch,getState)=>{
        dispatch(actions.MoveDepLoading(true));
        return ReqApi.post({
            url:MemberManage.BATCH_MOVE_DEP,
            pm
        }).then((json)=>{
            dispatch(actions.MoveDepLoading(false));
            return json
        })
    },
    DeptName:(pm={conditions: [{
            "field": "status",
            "value": 1,
            "operation": 0
            }],
        relations: "status"})=>(dispatch, getState)=>{
        ReqApi.get({
            url: Urls.DEPARTMENT_LIST,
            pm
        }).then(json=>{
            dispatch(actions.get_pDeptName(json.data));
        })
    },
    get_pDeptName:(data)=>(dispatch, getState)=>{
        let state=getState()[MEMBERCHANGEREDU].set('pDeptName',data);
        dispatch({type: MEMBERCHANGEREDU, state})
    },
    //loading
    tableLoading: (value) => (dispatch, getState) => {
        let state = getState()[MEMBERCHANGEREDU].set('tableLoading', value);
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    side_Loading: (value) => (dispatch, getState) => {
        let state = getState()[MEMBERCHANGEREDU].set('side_Loading', value);
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    checkedList: (val) => (dispatch, getState) => {
        let state = getState()[MEMBERCHANGEREDU].set('memberCodeArr', val);
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    GetInfoList: (val) => (dispatch, getState) => {
        const { list, page, pageSize, total } = val;
        let state = getState()[MEMBERCHANGEREDU].set('dataSource',list).set('paging', {page, pageSize, total}).set('headerBar_visible', ["none","block"]);
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    GetInfoDetails: (val) => (dispatch, getState) => {
        let state = getState()[MEMBERCHANGEREDU].set('infoDetials', val);
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    DepartInfo: (val) => (dispatch, getState) => {
        dispatch( actions.tableLoading(true) ) 
        let state = getState()[MEMBERCHANGEREDU].set('departinfo', val);
        let data = {
            deptCode: val.key,
            employeeName: '',
            phone: '',
            page: 1,
            pageSize: 10,
        }             
        dispatch(actions.getMemberInfoList(data));
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    getMemberInfoList: ( pm = {} ) => (dispatch, getState) =>{  
        dispatch( actions.tableLoading(true) ) 
        let state = getState()[MEMBERCHANGEREDU].set('searchPm', pm);
        dispatch( {type: MEMBERCHANGEREDU, state} )
        ReqApi.get({
            url: MemberManage.POSITION_INFO_LIST,
            pm
        }).then(json => {
            if(json.status == 2000){
                dispatch(actions.GetInfoList(json.data));              
            }    
            dispatch(actions.tableLoading(false))                       
        })
    },
    getDetailsInfo: (pm = {}) => (dispatch, getState) => {
        dispatch( actions.side_Loading(true) );
        ReqApi.get({
            url: MemberManage.GET_DETAILS_INFO,
            pm
        }).then(json => {
            if(json.status == 2000){
                dispatch(actions.GetInfoDetails(json.data));
            } 
            dispatch( actions.side_Loading(false) );  
        })
    },
    headerChange: (len) => (dispatch, getState) => {
        let state;
        if(len>0){
            state = getState()[MEMBERCHANGEREDU].set('headerBar_visible', ["block","none"]);
        }else {
            state = getState()[MEMBERCHANGEREDU].set('headerBar_visible', ["none","block"]);
        }      
        dispatch( {type: MEMBERCHANGEREDU, state} )
    },
    onOpenSidebar:(value)=> (dispatch, getState) => {
        let state = getState()[PERSONMANAGE].set('side_visible', value);
        dispatch( {type: PERSONMANAGE, state} )
    },
    //停用
    stopAccount:(pm = {}) => (dispatch,getState) => {
        ReqApi.post({
            url: MemberManage.STOP_ACCOUNT,
            pm
        }).then(json => {
            if(json.status == 2000){
                dispatch(actions.getMemberInfoList({ deptCode:'', employeeName: '', phone: '',page: 1}));
                //关闭右侧侧滑窗
                dispatch(actions.onOpenSidebar(false));
            }
        })
    }
}

export default actions