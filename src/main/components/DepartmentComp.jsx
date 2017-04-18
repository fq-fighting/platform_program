import React from 'react'
import {Table, Button, Input, Breadcrumb, Spin} from '../../base/components/AntdComp'
import actions from '../actions/DepartmentAct'
import MTable from '../../base/components/TableComp';
import SearchComp from '../../base/components/SearchComp';
import { is } from 'immutable';
const Search = Input.Search;
const columns = [{
                title: '组织名称',
                dataIndex: 'deptName',
                key: 'deptName',
                width: '15%',
                }, {
                title: '组织编号',
                dataIndex: 'deptNo',
                key: 'deptNo',
                width: '10%',
                }, {
                title: '层级',
                dataIndex: 'deptLevel',
                key: 'deptLevel',
                width: '10%',
                render: (txt)=>window.ENUM.getEnum("level", txt+'')
                }, {
                title: '人数',
                dataIndex: 'deptNum',
                key: 'deptNum',
                width: '10%',
                }, {
                title: '负责人',
                dataIndex: 'deptManager',
                key: 'deptManager',
                width: '10%',
                }, {
                title: '是否为运营组织',
                dataIndex: 'isOpt',
                key: 'isOpt',
                width: '10%',
                render: (txt)=>window.ENUM.getEnum("bool", txt+'')
                }, {
                title: '是否为采购组织',
                dataIndex: 'isPurchase',
                key: 'isPurchase',
                width: '10%',
                render: (txt)=>window.ENUM.getEnum("bool", txt+'')
                }, {
                title: '是否为销售组织',
                dataIndex: 'isSell',
                key: 'isSell',
                width: '10%',
                render: (txt)=>window.ENUM.getEnum("bool", txt+'')
                }, {
                title: '是否为财务组织',
                dataIndex: 'isFinance',
                key: 'isFinance',
                width: '10%',
                render: (txt)=>window.ENUM.getEnum("bool", txt+'')
                }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (txt)=>window.ENUM.getEnum("status", txt+'')
                }];
class Department extends React.Component{
    constructor(props,context){
        super(props,context);
        columns[0].render= (text,record) =>{
            if(record.status!=-1){
                return <a href="#" onClick={() => this.onOpenSidebar(record.id)} >{text}</a>
            }else{
                return <span>{text}</span>
            }
        } 
    }
    
    componentDidMount(){
        this.props.initlist();
    };

    

    

    onOpenSidebar=(id)=>{
        this.props.onOpenSidebar(id);
    }

    render(){
        let {side_visible,visible,onSearch,SearchVal,tabLoading,OpenModal,dataSource,defaultRowKey,...props}=this.props;
        // let loop = (data,status) => data.map((item) => {
        //     if(status!==undefined){
        //         item.pstatus= status;
        //     }
        //     if (item.children) loop(item.children,item.status);
        //     return item;
        // });
        // let defaultRowKey= dataSource[0]?dataSource[0].id:null;
        return(
            <div>
                <div className="manage-head">
                    <SearchComp
                        placeholder="输入部门名称／编号搜索"
                        style={{ width: 200 }}
                        onSearch={onSearch}
                        SearchVal={SearchVal}
                    />
                    <Button type="primary" onClick={OpenModal}>新增部门</Button>
                </div>
                <div className="manage-body">
                    <Spin spinning={tabLoading}>
                        {dataSource && dataSource.length 
                            ? <MTable
                                {...props}
                                dataSource={dataSource}
                                loading={tabLoading}
                                pagination={false}
                                cols={columns}
                                rowKey={"id"}
                                defaultExpandedRowKeys={defaultRowKey}
                            /> 
                            : null }
                    </Spin>
                </div>
            </div>
        )
    }
}

export default Department