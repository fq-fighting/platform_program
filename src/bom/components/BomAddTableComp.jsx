import React, { Component } from 'react';
import { Button, Popconfirm, message, Input, Icon, Table, } from 'antd';
import MTable from '../../base/components/TableComp';
import { shouldComponentUpdate } from '../../base/consts/Utils';
import EditBomAddTbableComp from '../components/EditBomAddTbableComp';
import BomAddTableSelectComp from '../components/BomAddTableSelectComp';

let text = '确定要删除选择的编码吗?';
class BomAddTableComp extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 0,
            keys: [],
            value:''
        }
        this.columns = [
            {
                title: '',
                dataIndex: '',
                key: '',
                className: "empty-column",
                width: '5%',
            }, {
                title: '主物料编码',
                dataIndex: 'materialCode',
                key: 'materialCode',
                width: '15%',
                render: (text, record, index) => {
                    // console.log("record");
                    // console.log(record.materialCode);
                    return (<BomAddTableSelectComp 
                        {...this.props} 
                        value={text}
                        record = {record.materialCode}
                        handleChange={this.props.handleChange} 
                        flag={index} />);
                },
                
            }, {
                title: '物料名称',
                dataIndex: 'detailName',
                key: 'detailName',
                width: '15%',
            }, {
                title: '物料规格',
                dataIndex: 'detailSpec',
                key: 'detailSpec',
                width: '15%',
            }, {
                title: '单位用量',
                dataIndex: 'quantityPer',
                key: 'quantityPer',
                width: '10%',
                render: (text, record, index) => (
                    <EditBomAddTbableComp
                        value={text}
                        onChange={this.onCellChange(index, 'materielN')
                        }
                    />
                ),
            }, {
                title: '计量单位',
                dataIndex: 'measureUnit',
                key: 'measureUnit',
                width: '20%',
            }, {
                title: '备注',
                dataIndex: 'remarks',
                key: 'remarks',
                width: '300px',
                render: (text, record, index) => (
                    <EditBomAddTbableComp
                        value={text}
                        onChange={this.onCellChange(index, 'remarks')
                        }
                    />
                ),
            }];
    }
    onCellChange = (index, key) => {
        return (value) => {
            let dataSource = this.props.bomDetailInfo.list;
            dataSource[index][key] = value;
            this.props.onCellChange(dataSource);
        };
    }

    handleAdd = () => {
        this.setState({ key: this.state.key + 1 });
        let newData = {
            key: this.state.key,
            materialCode:"",
            detailName: ``,
            detailSpec: ``,
            quantityPer: `0.00`,
            measureUnit: ``,
            remarks: ``,
        };
        this.props.handleAdd(newData);
    }
    onDelete = () => {
        let dataSource = this.props.bomDetailInfo.list;
        // console.log(dataSource)
        let arr = new Set(this.state.keys);
        dataSource = dataSource.filter((item,index) => {
            let sign = 0;
            for (let i of arr) {
                if (index == i) {
                    sign = 1;
                }
            }
            if (sign == 0) {
                return item;
            }
        });        
        this.props.onDelete(dataSource);
    }
    render() {
        let { bomDetailInfo } = this.props;
        let { keys } = this.state;
        let columns = this.columns;
        let rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => { 
                this.setState({ keys: selectedRowKeys });
            },
            onSelect: (record, selected, selectedRows) => {
                //console.log(record, selected, selectedRows);
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                //console.log(selected, selectedRows, changeRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User',
            }),
        };
        // console.log(bomDetailInfo.list);
        return (
            <div className="manage-content">
                <div className="manage-body">
                    <div className="bom-addTable-con">
                        <span className="bom-icon"></span>
                        <span className="bom-baseinfo-title">明细信息</span>
                    </div>
                    <Button className="editable-add-btn" onClick={this.handleAdd}>新增行</Button>
                    <Popconfirm placement="bottom" title={text} onConfirm={this.onDelete} okText="确定" cancelText="取消">
                        <Button className="editable-add-btn editable-delete-btn" disabled={keys.length > 0 ? false : true} >删除行</Button>
                    </Popconfirm>

                    <MTable
                        rowSelection={rowSelection}
                        selRows={this.state.keys ? this.state.keys : []}
                        dataSource={bomDetailInfo.list}
                        cols={columns}
                        rowKey={"key"}
                    />
                </div>
            </div>
        );
    }
}
export default BomAddTableComp;