import React, { Component, PropTypes } from "react";
import { Table, Pagination, Spin } from 'antd';
import { shouldComponentUpdate } from '../consts/Utils';
import TXT from '../languages';

class TableComp extends Component {
    constructor(prop) {
        super(prop);
        this.splitCols(prop.cols);
        this.state = {};
    }
    splitCols(cols) {
        if (this.props.chooseCols === true)
            this.renderCols = [...cols];
        else this.renderCols = cols;
        for (var i = this.renderCols.length - 1; i >= 0; i--) {
            if (this.renderCols[i].hidden) {
                this.renderCols.splice(i, 1);
            }
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.colsChanged !== this.props.colsChanged) {
            this.splitCols(nextProps.cols);
        }
    }
    componentDidMount() {
        if (this.props.autoLoad === true)
            this.props.pageOnChange(1);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    render() {
        const p = this.props;
        let __rowSelection = null;
        if (Array.isArray(p.selRows)) {
            __rowSelection = {
                ...p.rowSelection,
                selectedRowKeys: p.selRows
            }
        };
        return (
            <Table {...p}     
                rowSelection={__rowSelection}
                pagination={p.pagination === false ? false : {
                    ...p.paging,
                    pageSizeOptions: p.pageSizeOptions,
                    showSizeChanger: true,
                    showTotal: (total) => TXT.TOTAL.format([total]),
                    onShowSizeChange: (curr, pageSize) => p.pageOnChange({ page: curr, pageSize, }),
                    onChange: p.pageOnChange
                }}
                columns={this.renderCols}
            />
        )
    }
}

TableComp.defaultProps = {
    rowKey: '',
    pageSizeOptions: ['10', '15', '20', '50'],
    loading:false,
    dataSource: [],
    cols: [],
    paging: {
        // total,
        // current,
        // pageSize
    },
    pageOnChange: () => { },
}

TableComp.propTypes = {
    rowKey: PropTypes.string.isRequired,
    pageSizeOptions: PropTypes.array,
    loading: PropTypes.bool,
    dataSource: PropTypes.array,
    cols: PropTypes.array,
    paging: PropTypes.object,
    pageOnChange: PropTypes.func,
}
export default TableComp;


// Example

{/*<MTable
    dataSource={dataSource}
    paging={paging} //{total,current,pageSize}
    loading={tabLoading}
    cols={columns}
    rowKey={"id"}
    pageOnChange={tablePaging}
    pagination={false} //禁用分页时加上
/>*/}