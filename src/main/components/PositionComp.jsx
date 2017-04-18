import React, { Component } from "react";
import {  Button, Popconfirm,message } from 'antd';
import MTable from '../../base/components/TableComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
import SearchComp from '../../base/components/SearchComp';
import TXT from '../languages';
const T = TXT.POSITION;

const columns = [{
    title: '',
    dataIndex: '',
    key: '',
    className:"empty-column",
    width:1,
}, {
    title: T.NAME,
    dataIndex: 'positionName',
    key: 'positionName',
    width:"15%",
}, {
    title: T.CODE,
    dataIndex: 'positionCode',
    key: 'positionCode',
     width:"15%",
}, {
    title: T.DESC,
    dataIndex: 'positionDesc',
    key: 'positionDesc',
}, {    
    dataIndex: 'handle',
    title: TXT.HANDLE,
     width:170,
}];

class PositionComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[columns.length - 1].render = (txt, record, index) =>
            <div>
                <a href="#" onClick={() => this.onEditPosition(record.positionNumber) }>{TXT.EDIT}  </a>
                <Popconfirm title={
                    <div>
                        <h5>{T.DEL1}</h5>
                        <p>{T.DEL2}</p>
                    </div>
                } onConfirm={() => this.onDelete(record.positionNumber)}>
                    <a href="#">{TXT.DEL}</a>
                </Popconfirm>
            </div>
    }

    componentDidMount() {
        this.props.tablePaging(1);
    }
    onEditPosition = (id) => {
        const { positionId, EditPositionVisiable} = this.props;
        if (id != positionId) {
            EditPositionVisiable(id);
        }
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    };
    
    onDelete = (id) => {
        const { onClear, PositionDel } = this.props;
        PositionDel(id).then(json => {
            if (json.status === 2000) {
                onClear();
            }
        });
    }
    render() {
        const { AddPositionVisiable, onSearch, SearchVal, tabLoading, tablePaging, ...props } = this.props;
        return (
            <div>
                <div className="position-head">
                    <SearchComp SearchVal={SearchVal} onSearch={onSearch}
                        placeholder={T.SEARCH} />
                    <Button type="primary" onClick={AddPositionVisiable}>{T.ADD}</Button>
                </div>
                <div className="position-body">
                    <MTable
                        {...props}
                        loading={tabLoading}
                        cols={columns}
                        rowKey={"positionNumber"}
                        pageOnChange={tablePaging}
                    />
                </div>
            </div>
        );
    }
}
export default PositionComp;




