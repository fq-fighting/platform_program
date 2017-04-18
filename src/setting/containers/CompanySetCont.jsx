import React,{Component} from "react";
import {Link} from 'react-router';
import { Button,Breadcrumb } from 'antd';
import CompanySetComp from '../components/CompanySetComp';
import { connect } from 'react-redux'
import actions from '../actions/CompanySetAct'
import { fromJS, Record} from 'immutable';

class CompanySetCont extends Component{
    constructor(props,context){
        super(props,context);
    }
    render(){
        return (
            <div className="inner-content">
                <div className="ew-breadcrumb">
                    <div className="breadcrum-inner">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item><a href="/main.html">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>企业设置</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <CompanySetComp {...this.props} />
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {
    //console.log(state.CompanySetRedu.toJS())
    return {
        state: state.CompanySetRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    getEnterpriseInfo: () => {
		dispatch( actions.getEnterpriseInfo())
	},
    AddPositionVisiable: (companyCode) => {
        dispatch(actions.AddPositionVisiable(true));
        dispatch(actions.PositionDetail({ companyCode}));


    },
})
export default connect( mapStateToProps, mapDispatchToProps )(CompanySetCont)
