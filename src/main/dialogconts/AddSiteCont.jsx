import React,{Component} from "react";
import { Modal, message } from '../../base/components/AntdComp';
import { connect } from 'react-redux';
import SiteAct from '../actions/SiteAct';
import AddSiteComp from '../components/AddSiteComp';

class AddSiteCont extends Component{
    constructor(props, context) {
        super(props, context);
    }
    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status === 2000) {
                handleCancel();
            }
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <AddSiteComp
                    {...this.props}
                    onOk={this.handleSubmit}
                /> : null
        );
    }
}

AddSiteCont.defaultProps = {
    title: "新增站点",
    width:766,
}

const mapStateToProps = (state) => ({
    visible: state.SiteRedu.get('add_site_visiable'),
    loading: state.SiteRedu.get('siteLoading'),
    orgCode: state.SiteRedu.get('orgCode'),
})
const mapDispatchToProps = (dispatch) => ({
    handleCancel: () => { dispatch(SiteAct.AddSiteVisiable(false)) },
    handleSubmit: (data) => { return dispatch(SiteAct.AddSite(data)) },
    getDeptName: () => { dispatch(SiteAct.pDeptName()) },
})


export default connect(mapStateToProps,mapDispatchToProps)(AddSiteCont);