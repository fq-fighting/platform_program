import React, { Component } from "react";
import { connect } from 'react-redux';
import { message } from 'antd';
import BomAddTableAct from '../actions/BomAddTableAct';
import BomAddTableComp from '../components/BomAddTableComp';
import BomAddTableSelectComp from '../components/BomAddTableSelectComp';

class BomAddTableCont extends Component {
    constructor(props) {
        super(props);
    }
    // initData = () => {
    //     this.props.handleChange();
    // };
    render() {
        return (
            <div>
                <BomAddTableComp {...this.props} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    // console.log(state.BomAddTableRedu.toJS());
    return state.BomAddTableRedu.toJS();
};

const mapDispatchToProps = (dispatch) => ({
    handleAdd: (data) => dispatch(BomAddTableAct.handleAdd(data)),
    onDelete: (data) => dispatch(BomAddTableAct.onDelete(data)),
    handleChange: (val, flag) => dispatch(BomAddTableAct.handleChange(val, flag)),
    onCellChange: (index, key) => dispatch(BomAddTableAct.onCellChange(index, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(BomAddTableCont);