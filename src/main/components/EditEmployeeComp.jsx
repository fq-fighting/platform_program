import React, { Component } from "react";
import AddEmployeeComp from './AddEmployeeComp';

class EditEmployeeComp extends AddEmployeeComp {
    constructor(props, context) {
        super(props, context);
        this.isAdd = false;
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
}

export default EditEmployeeComp;
