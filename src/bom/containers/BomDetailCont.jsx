import React, {Component} from "react";
import BomAct from '../actions/BomAct';
import {connect} from 'react-redux';
import BomDetailComp from '../components/BomDetailComp';
import {toJS} from 'immutable';
class BomDetailCont extends Component {
    constructor(props, context) {
        super(props, context);
        this.detailPM = {bomCode: '420000199011267173', version: '420000199011267173'}
    }

    initData = () => {
        this.props.BomDetail(this.detailPM.bomCode, this.detailPM.version, "detail")
    };

    render() {
        const {tabLoading, ...props} = this.props;
        return (
            <div>
                <div className="bomDetail-content">
                    <BomDetailComp
                        {...this.props}
                        initData={this.initData}
                        loading={tabLoading}
                        bomDetailInfo={this.props.bomDetailInfo}
                    />
                </div>
            </div>

        )
    }
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomDetail: (bomCode, version) => dispatch(BomAct.BomDetail({bomCode, version})),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomDetailCont);
