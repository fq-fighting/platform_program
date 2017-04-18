import React, { Component } from "react";
import MTable from '../../base/components/TableComp';
import { connect } from "react-redux";
import { Row, Col, Button,Select, Dropdown, Menu, Icon,Spin } from 'antd';
import TabsAct from '../actions/TabsAct';
import { store } from '../data/StoreConfig';
const Option = Select.Option;
class BomDetailComp extends Component {
    constructor(props) {
        super(props);
        // this.pageSize = 11;
        this.state = {
            key: 0,
        }

        this.columns = [{
            title: '主物料编码',
            dataIndex: 'materialCode',
            key: 'materialCode',
            width: '15%',
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
            width: '15%',
        }, {
            title: '计量单位',
            dataIndex: 'measureUnit',
            key: 'measureUnit',
            width: '10%',
        }, {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',
            width: '300px',
            render:(text, record, index)=>{
                return <div className='bom-remarks'>{text}</div>;
            }
        }];
    };

    handleMenuClick = (e) => {
      console.log('click', e.key);
    };
      componentDidMount() {
        this.props.initData && this.props.initData();
    };
    editBom = () => {
        store.dispatch(TabsAct.TabAdd({title:"编辑Bom",key:"edit"}));
    };
    handleChange= (value) => {
        console.log(value)
        switch(value)
        {
            case 'copy':
                store.dispatch(TabsAct.TabAdd({title:"复制Bom",key:"copy"}));
                break;
            case 'upgrade':
                store.dispatch(TabsAct.TabAdd({title:"升级Bom",key:"upgrade"}));
                break;
            default:
        }
    };
    render() {
        const {bomDetailInfo}=this.props;
        let columns = this.columns;
        let dataSource = this.dataSource;
        let { key } = this.state;
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                <div className="bom-head">
                    <div className="bom-head-left">
                        <span className="bom-head-h1">信息总览：{bomDetailInfo.bomCode} | {bomDetailInfo.materialCode}</span>
                        <span className="bom-head-h">状态：{bomDetailInfo.status}   类别：{bomDetailInfo.type}    产品编码：{bomDetailInfo.materialCode}</span>
                    </div>
                    <div className="bom-head-right">
                        <span className="bom-head-right-button">
                            <Button className="editable-add-btn bomDetail-efit-btn"  onClick={this.editBom}>编辑</Button>
                            <Select defaultValue="更多选择" style={{ width: 80 }} onChange={this.handleChange}>
                                <Option value="copy">复制</Option>
                                <Option value="upgrade">升级</Option>
                                <Option value="enable">启用</Option>
                                <Option value="unable">禁用</Option>
                            </Select>
                        </span>
                    </div>

                </div>
                <div className="bom-body">
                    <div className="bom-baseinfo">
                        <span className="bom-icon"></span>
                        <span className="bom-baseinfo-title">基本信息</span>
                        <div className="bom-baseinfo-con">
                            <ul>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">BOM编号：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.bomCode}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">类别：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.type}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">BOM名称：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.bomName}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">更新人：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.updateBy}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">产品编号：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.materialCode}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">更新时间：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.updateDate}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bom-stateinfo">
                        <span className="bom-icon"></span>
                        <span className="bom-stateinfo-title">状态信息</span>
                        <div className="bom-stateinfo-con">
                            <ul>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">版本号：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.version}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">生效日期：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.startTime}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">状态：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.status}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">失效日期：</span><span className="bom-baseinfo-con-li">{bomDetailInfo.endTime}</span></li>
                                <li className="bom-stateinfo-con-li"><span className="bom-baseinfo-10">备注：</span><span className="bom-baseinfo-con-li bom-baseinfo-rc">{bomDetailInfo.remarks}</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="bom-detailedinfo">
                        <span className="bom-icon"></span>
                        <span className="bom-detailedinfo-title">明细信息</span>
                        <div className="bom-detailedinfo-con">
                            <MTable
                                cols={columns}
                                dataSource={bomDetailInfo.list}
                                key={"key"}
                            />
                        </div>
                    </div>
                </div>
                </Spin>
            </div>
        )
    }
}
export default BomDetailComp;