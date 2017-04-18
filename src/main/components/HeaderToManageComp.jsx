import React, { Component } from 'react'
import MemberManageAct from '../actions/MemberManageAct'
import SearchComp from '../../base/components/SearchComp';
import {Button, Spin, Pagination, Input, Layout, Table, Popconfirm} from '../../base/components/AntdComp';
import SetOfficesCont from '../dialogconts/SetOfficesCont';

import * as MemberDialogActions from "../actions/MemberAddDialogActions";
import {store} from "../data/StoreConfig";

import MemberAddDialogCont from "../dialogconts/MemberAddDialogCont";

class HeaderToManageComp extends Component {
    constructor(props, context) {
        super(props, context);       
    }
   handlerClick=(e)=>{
        store.dispatch(MemberDialogActions.show());
    }
    handlerSubmitCallBack = (e)=>{
        store.dispatch(MemberManageAct.getMemberInfoList({ deptCode:'', employeeName: '', phone: '',page: 1}));
    }
    render(){
        let { state, checkedList, onSearch, SearchVal,MoveDepVisiable,importViewVisiable,SetOfficesVisiable, ...props } = this.props;
        return (
            <div className='tableHeader'>
                <MemberAddDialogCont submitCallBack={this.handlerSubmitCallBack}/>
                <div className = 'head-line-one' style= {{ display: state.headerBar_visible[0] }}  >
                   <div className='slideToRight'>
						<Button type="default" onClick={MoveDepVisiable}>修改部门</Button>
	                    <Popconfirm placement="bottomRight" title={
	                        <div>
	                            <h5>当前共选中{state.memberCodeArr.length}名员工，确认要停用吗？</h5>
	                            <p>停用后，员工将不能再登入该企业</p>
	                        </div>
	                    } onConfirm={() => this.props.stopAccount({empCodes:state.memberCodeArr})}>
	                        <Button type="default">停用</Button>
	                    </Popconfirm>
	                    <Button type="default"  onClick={SetOfficesVisiable}>设置办公地址</Button>
					</div>
                </div>
                <div className = 'head-line-two' style={{display: state.headerBar_visible[1] }}>
                    <div className='head-line-btn'>
                        <Button type="default" onClick={this.handlerClick}>新增员工</Button>
                        <Button type="default" onClick={importViewVisiable}>导入</Button>
                        <Button type="default">导出</Button>
                    </div>
                    <div className="head-line-search"> 
                        <SearchComp
                            placeholder = '输入姓名/手机搜索'
                            onSearch = { onSearch }
                            SearchVal = { SearchVal }
                                width = { 185 }
                        />
                    </div>
                    <div className="depart-info">
                        <span>{state.departinfo.departName + '部 ('}</span>
                        <span>
                            {
                              state.departinfo.departNum ? state.departinfo.departNum+'个部门, ' :null
                            }
                        </span>
                        <span>
                            {
                                '共'+state.dataSource.length +'人 )'
                            }
                        </span>
                        <span>
                            {
                                state.departinfo.departLeader?  ' |  负责人：' + state.departinfo.departLeader : null
                            }
                        </span>
                    </div>
                    <SetOfficesCont />
                </div>  
            </div>
        );

    }
}

export default HeaderToManageComp