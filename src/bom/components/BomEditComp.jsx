import React, {Component} from 'react';
import {connect} from 'react-redux';
import BomComp from './BomComp'
class BomEditComp extends BomComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }

}
export default BomEditComp;