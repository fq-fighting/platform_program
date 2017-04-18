import React, {Component} from "react";
import {connect} from 'react-redux';
import BomEditComp from '../components/BomEditComp';
import BomAddTableCont from '../containers/BomAddTableCont';
import BomAct from '../actions/BomAct';
import {Spin } from 'antd';
import {toJS} from 'immutable';
class BomEditCont extends Component {
    constructor(props) {
        super(props);
        this.detailPM = {bomCode: '420000199011267173', version: '420000199011267173'}
    }

    initData = () => {
       this.props.BomDetail(this.detailPM.bomCode, this.detailPM.version,"edit")

    };

    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                <BomEditComp  {...this.props}
                              initData={this.initData}
                              bomDetailInfo={this.props.bomDetailInfo}/>
                <BomAddTableCont {...this.props}
                                 initData={this.initData}
                                 bomDetailInfo={this.props.bomDetailInfo}/>
                </Spin>
            </div>
        )
    }
}
BomEditCont.defaultProps = {
    title: "编辑BOM信息",
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomDetail: (bomCode, version) => dispatch(BomAct.BomDetail({bomCode, version})),
    MaterialList: (materialKey) => {
        return dispatch(BomAct.MaterialList({materialKey}))
    },
    Save:()=>dispatch(BomAct.EditBom({})),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomEditCont);
