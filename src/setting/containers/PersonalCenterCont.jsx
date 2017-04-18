import React,{Component} from "react";
import {Button,Breadcrumb, Icon} from 'antd';
import PersonalCenterComp from '../components/PersonalCenterComp';
import { connect } from 'react-redux'
import actions from '../actions/PersonalCenterAct'
import { fromJS, Record } from 'immutable';
import EditImageCont from '../dialogconts/EditImageCont';
import BindPhoneCont from '../dialogconts/BindPhoneCont'
import BindPhoneNextStepCont from '../dialogconts/BindPhoneNextStepCont'
import ChangePswSubmitCont from '../dialogconts/ChangePswSubmitCont'

class PersonalCenterCont extends Component{
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
                            <Breadcrumb.Item>个人中心</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="inner-content-page">
                    <PersonalCenterComp {...this.props}/>
                </div>
                <EditImageCont/>
                <BindPhoneCont {...this.props}/>
                <BindPhoneNextStepCont {...this.props}/>
                <ChangePswSubmitCont {...this.props}/>
            </div>
        );
    }
}
const mapStateToProps = (state) =>  {   
    return {
        state: state.PersonalCenterRedu.toJS(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    onClick: () => {
        dispatch(actions.EditImageVisiable(true))
    },
    bindPhoneVisiable:() => {dispatch( actions.bindPhoneVisiable(true))},
    bindPhoneNextstepVisiable:() => {dispatch( actions.bindPhoneNextstepVisiable(true))},
    changePswSubmitVisiable:() => {dispatch( actions.changePswSubmitVisiable(true))},
    getPersonalInfo: () => {dispatch( actions.getPersonalInfo())},
   
})
export default connect( mapStateToProps, mapDispatchToProps )(PersonalCenterCont)
