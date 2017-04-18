import React, { Component } from "react";
import AddAddressComp from './AddAddressComp';

class EditAddressComp extends AddAddressComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    
}

export default EditAddressComp;
