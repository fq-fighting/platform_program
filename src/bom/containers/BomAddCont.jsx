import React, {Component} from "react";
import BomAct from '../actions/BomAct';
import {Spin} from 'antd';
import BomAddComp from '../components/BomAddComp';
import {connect} from 'react-redux';
import {toJS} from 'immutable';
import BomAddTableCont from '../containers/BomAddTableCont';
class BomAddCont extends Component {
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
        this.props.CleanBomDetail({});
    }
    handleSubmit = (data) => {
        const {handleSubmit} = this.props;
        handleSubmit(data).then(json => {
            console.log(json);
            if (json.status && (json.status === 2000)) {
                console.log('新增bom成功!');
            } else {
                console.log('新增bom失败!');
            }
            ;
        });
    }

    render() {
        return (
            <div>
                <Spin spinning={false}>
                    <BomAddComp {...this.props}
                                onOk={this.handleSubmit}
                                bomDetailInfo={this.props.bomDetailInfo}
                    />
                    <BomAddTableCont {...this.props}/>
                </Spin>
            </div>

        )
    }
}
BomAddCont.defaultProps = {
    title: "新建BOM信息",
    bomDetailInfo:{}
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    handleSubmit: (data) => {
        return dispatch(BomAct.AddBom(data))
    },
    MaterialList: (materialKey) => {
        return dispatch(BomAct.MaterialList({materialKey}))
    },
    CleanBomDetail:(data) => {
    return dispatch(BomAct.CleanBomDetail({data}))
},
})
export default connect(mapStateToProps, mapDispatchToProps)(BomAddCont);
