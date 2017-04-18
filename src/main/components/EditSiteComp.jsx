import React, { Component } from "react";
import AddSiteComp from './AddSiteComp';

class EditSiteComp extends AddSiteComp {
    constructor(props, context) {
        super(props, context);
    }
    componentDidMount() {
        this.props.initData && this.props.initData();
    }
    
}

export default EditSiteComp;
