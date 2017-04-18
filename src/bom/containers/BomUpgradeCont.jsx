import React, {Component} from "react";
import BomAct from '../actions/BomAct';
import {Spin } from 'antd';
import BomUpgradeComp from '../components/BomUpgradeComp';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import BomAddTableCont from '../containers/BomAddTableCont';
class BomUpgradeCont extends Component {
    constructor(props) {
        super(props);
        this.detailPM = {bomCode: '420000199011267173', version: '420000199011267173'}
    }

    initData = () => {
        this.props.BomDetail(this.detailPM.bomCode, this.detailPM.version,"upgrade")

    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                <BomUpgradeComp {...this.props}
                                initData={this.initData}
                                onOk={this.handleSubmit}
                                bomDetailInfo={this.props.bomDetailInfo}
                />
                <BomAddTableCont {...this.props}
                           initData={this.initData}
                                 bomDetailInfo={this.props.bomDetailInfo}
                />
                </Spin>
            </div>

        )
    }
}
BomUpgradeCont.defaultProps = {
    title: "升级BOM信息",
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomDetail: (bomCode, version,flag) => dispatch(BomAct.BomDetail({bomCode, version})),
    MaterialList: (materialKey) => {
        return dispatch(BomAct.MaterialList({materialKey}))
    },
    Save:()=>dispatch(BomAct.UpgradeBom({})),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomUpgradeCont);
