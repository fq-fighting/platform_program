import React, { Component,PropTypes } from 'react';
import { Input,Button,Table,Select} from '../../base/components/AntdComp';
import MTable from '../../base/components/TableComp';
import {shouldComponentUpdate} from '../../base/consts/Utils';
import SearchComp from '../../base/components/SearchComp';
import { is } from 'immutable';
let Search = Input.Search;
let columns = [{
    title: '公司编码',
    dataIndex: 'companyCode',
    hidden:true

},{
    title: '公司名称',
    dataIndex: 'companyName',

},{
    title: '公司简称',
    dataIndex: 'companyAbbr',
    hidden:true

},{
    title: '公司简介',
    dataIndex: 'companyDesc',
    hidden:true

}, {
    title: '统一社会认证代码',
    dataIndex: 'companyUscc',
}, {
    title: '法人代表',
    dataIndex: 'corporation',
}, {
    title: '公司电话',
    dataIndex: 'telephoneNumber',
},{
    title: '邮编',
    dataIndex: 'zipCode',
    hidden:true
},{
    title: '公司性质',
    dataIndex: 'companyType',
    hidden:true
},{
    title: '公司规模',
    dataIndex: 'companyScale',
    hidden:true
},/*{
    title: '所属行业',
    dataIndex: 'companyIndustry',
}, */{
    title: '注册地址',
    dataIndex: 'companyAddr.detailAddr',
}, {
    title: '业务联系人',
    dataIndex: 'contacts',
}, {
    title: '业务联系人电话',
    dataIndex: 'contactsPhone',
}, {
    title: '公司账号',
    dataIndex: 'accountNumber',
    hidden:true
}, {
    title: '状态',
    dataIndex: 'status',

}];

class CompanyComp extends Component {
    constructor(props, context) {
        super(props, context);
        columns[1].render = (text,record)=> <a onClick={()=>this.onSideShow(record.companyCode)}>{text}</a>;


    }
    componentDidMount() {
        this.props.tablePaging(1);
    }


    onSideShow = (companyCode) => {
        const { Record, SidebarVisiable,SidebarLoding} = this.props;
        Record(companyCode);
        SidebarVisiable(true);
        SidebarLoding();
    }
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.statusVal !== this.props.statusVal) {
    //         this.setState({ statusVal: nextProps.statusVal });
    //     };
    // }

    shouldComponentUpdate(nextProps, nextState) {
        return shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }
    render() {
        const { AddCompanyVisiable, onSearch,onChange, statusVal,SearchVal,SearchPm, searchPm, tabLoading, tablePaging,...props } = this.props;
        return (
            <div>
                <div className="manage-prompt">
                    <p>说明：曼威后台目前仅用于管理入驻的公司，可在此“新增公司、停用公司”等操作。</p>
                </div>
                <div className="managetitle">
                    <div className="manage-box">
                    <div className="managehead">
                        <Select size="large"  style={{ width: 200,marginRight:20}} value={statusVal} onChange={onChange}>
                            {
                                window.ENUM.getEnum("company").map(company => {
                                    return <Select.Option value={company.catCode.toString()} key={company.catCode}>{company.catName}</Select.Option>
                                })
                            }
                        </Select>
                        <SearchComp
                            SearchVal = { SearchVal }
                            onSearch = { onSearch }
                            placeholder = "输入企业名称搜索"
                            width = { 200 }
                        />
                        <Button type="primary" onClick={AddCompanyVisiable}>新增公司</Button>
                    </div>
                    <div className="manage-body">
                        <MTable
                            {...props}
                            loading={tabLoading}
                            cols={columns}
                            rowKey={"companyCode"}
                            pageOnChange={tablePaging}
                        />
                    </div>
                </div>
                </div>


            </div>
        );
    }
}
CompanyComp.defaultProps = {
    SearchVal: '',
    placeholder: '',
    width: 200,
    onSearch: ()=>{},
}
CompanyComp.propTypes = {
    SearchVal: PropTypes.string,
    placeholder: PropTypes.string,
    width: PropTypes.number,
    onSearch: PropTypes.func,
}
export default CompanyComp;