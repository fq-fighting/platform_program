import React, {Component} from "react";
import {connect} from "react-redux";
import {Table, Input, Icon, Button, Popconfirm} from 'antd';
import MTable from '../../base/components/TableComp';
import { store } from '../data/StoreConfig';
import TabsAct from '../actions/TabsAct';
const columns = [
   /* {
        title: 'bomId',
        className: "id",
        key: "id",
        hideen:true
    },*/
    {
        title: 'BOM编号',
        dataIndex: 'bomCode',
        key: "bomCode",
        render: (text, record) => (<a href="#">{text}</a>)
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (txt, record, index) => {
            return window.ENUM.getEnum("status", txt + '')
        },
    }, {
        title: '版本号',
        dataIndex: 'version',
        key: 'version',
    }, {
        title: 'BOM名称',
        dataIndex: 'bomName',
        key: 'bomName',
    }, {
        title: '产品编码',
        dataIndex: 'materialCode',
        key: 'materialCode',
    }, {
        title: '名称',
        dataIndex: 'materialName',
        key: 'materialName',
    }, {
        title: '规格',
        dataIndex: 'materialSpec',
        key: 'materialSpec',
    }, {
        title: '生效日期',
        dataIndex: 'startTime',
        key: 'startTime',
    }, {
        title: '失效日期',
        dataIndex: 'endTime',
        key: 'endTime',
    }, {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
    }];
class TableBomComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                <a href="#" onClick={() => this.onEditBom(record.bomCode,record.version) }>编辑 </a>
                <Popconfirm title={
                    <div>
                        <h5>确定要删除该物料吗</h5>
                    </div>
                } onConfirm={() => this.onDelete(record.bomCode,record.version)}>
                    <a href="#">删除 </a>
                </Popconfirm>
            </div>
    }

    onEditBom = (bomCode,version) => {
        console.log('edit')
        console.log(bomCode+version)
        store.dispatch(TabsAct.TabAdd({title:"编辑Bom",key:"edit"}));
    };
    onDelete = (bomCode,version) => {
        this.props.DeleteBom(bomCode,version).then(json => {
            if (json.status === 2000) {
             console.log('delete');
            }}
        );
    }
    componentDidMount() {
        this.props.tablePaging(1);
    }
    render() {
        const { tabLoading, tablePaging, ...props } = this.props;
        return (
            <div className="bom-table-wrap">
                <div className="bom-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"id"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        );
    }
}
export default TableBomComp;