import React,{Component} from "react";
import { connect } from 'react-redux';
import { Modal, message } from '../../base/components/AntdComp';
import SiteAct from '../actions/SiteAct';
import EditSiteComp from '../components/EditSiteComp';

class EditSiteCont extends Component{
    constructor(props, context) {
        super(props, context);
        
    }
    initData = () =>{
        const {loading, SiteDetail, siteId,handleCancel } = this.props;
        if (!loading && siteId) {
            SiteDetail(siteId).then(json => {
                if (json.status && (json.status === 2000)) {
                    // message.info('获取地址详情成功!');
                } else if (json.status && (json.status === 4352)) {
                    message.warn('获取站点详情失败!');
                    handleCancel(null);
                };
            });
        }
    }

    handleSubmit = (data) => {
        const { handleSubmit, handleCancel, tablePaging } = this.props;
        handleSubmit(data).then(json => {
            if (json.status && (json.status === 2000)) {
                // message.info('修改地址成功!');
                handleCancel();
                tablePaging();
            } else if (json.status && (json.status === 4354)){
                message.warn('修改站点失败!');
            };
        });
    }
    render() {
        const { visible } = this.props;
        return (
            visible ?
                <EditSiteComp
                    {...this.props}
                    onOk={this.handleSubmit}
                    initData={this.initData}
                /> : null
        );
    }
}

EditSiteCont.defaultProps = {
    title: "编辑站点",
    width:766,
}

const mapStateToProps = (state) => ({
    visible: state.SiteRedu.get('edit_site_visiable'),
    loading: state.SiteRedu.get('siteLoading'),
    site: state.SiteRedu.get('site'),
    siteId: state.SiteRedu.get('siteId'),
    orgCode: state.SiteRedu.get('orgCode'),
})
const mapDispatchToProps = (dispatch, ownProps) => ({
    handleCancel: (id) => { dispatch(SiteAct.EditSiteVisiable(false,id)) },
    handleSubmit: (data) =>  dispatch(SiteAct.EditSite(data)) ,
    SiteDetail: (siteCode) => dispatch(SiteAct.SiteDetail({ siteCode })),
    getDeptName: () => { dispatch(SiteAct.pDeptName()) },
})


export default connect(mapStateToProps,mapDispatchToProps)(EditSiteCont);
