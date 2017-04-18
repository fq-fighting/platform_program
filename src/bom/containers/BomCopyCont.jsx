import React, {Component} from "react";
import BomAct from '../actions/BomAct';
import {Spin } from 'antd';
import BomCopyComp from '../components/BomCopyComp';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import BomAddTableCont from '../containers/BomAddTableCont';
class BomCopyCont extends Component {
    constructor(props) {
        super(props);
        this.detailPM = {bomCode: '420000199011267173', version: '420000199011267173'}
    }

    initData = () => {
        this.props.BomDetail(this.detailPM.bomCode, this.detailPM.version,"copy")

    };
    render() {
        return (
            <div>
                <Spin spinning={this.props.bomLoading}>
                <BomCopyComp {...this.props}
                         initData={this.initData}
                         onOk={this.handleSubmit}
                         bomDetailInfo={this.props.bomDetailInfo}
                />
                <BomAddTableCont {...this.props}
                                 initData={this.initData}
                                 bomDetailInfo={this.props.bomDetailInfo}/>
                </Spin>
            </div>
        )
    }
}
BomCopyCont.defaultProps = {
    title: "复制BOM信息",
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomDetail: (bomCode, version) => dispatch(BomAct.BomDetail({bomCode, version})),
    MaterialList: (materialKey) => {
        return dispatch(BomAct.MaterialList({materialKey}))
    },
    Save:()=>dispatch(BomAct.CopyBom({})),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomCopyCont);
