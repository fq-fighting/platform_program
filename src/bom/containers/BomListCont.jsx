import React, {Component} from "react";
import {Button} from 'antd';
import BomAct from '../actions/BomAct';
import LinkInputComp from '../components/LinkInputComp';
import TableBomComp from '../components/TableBomComp';
import {connect} from 'react-redux';

class BomListCont extends Component {
    constructor(props) {
        super(props);
        this.searchPm = {page: 1, pageSize: 20};
    }

    tablePaging = (page) => {
        const {tabLoading, BomList} = this.props;
        if (!tabLoading) {
            if (typeof page === "number") {
                this.searchPm.page = page;
            } else {
                this.searchPm = {...this.searchPm, ...page};
            }
            ;
            BomList(this.searchPm);
        }
    };
    onSearch = (val) => {
        if (!this.props.tabLoading) {
            this.searchPm = {...this.searchPm, condition: ``, page: 1};
            console.log("search")
            this.tablePaging();
        }
    };
    onClear = () => {
        this.searchPm = {...this.searchPm, condition: {}, page: 1};
        this.tablePaging();
    };
    /* handleClick = (e) => {
     //给标签页新增一个Add容器
     store.dispatch(TabsAct.TabAdd({title:"新建Bom",key:"add"}));
     }
     handleClickEdit = (id) =>{
     //给标签页新增一个Edit容器
     store.dispatch(TabsAct.TabAdd({title:"编辑Bom",key:"edit"}));
     }*/
    render() {
        return (
            <div>
                <LinkInputComp
                    {...this.props}
                    onSearch={this.onSearch}
                    onClear={this.onClear}/>
                <TableBomComp
                    {...this.props}
                    tablePaging={this.tablePaging}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => state.BomRedu.toJS();
const mapDispatchToProps = (dispatch) => ({
    BomList: (searchPm) => dispatch(BomAct.BomList(searchPm)),
    DeleteBom:(bomCode,version) => dispatch(BomAct.DeleteBom({bomCode,version})),
})
export default connect(mapStateToProps, mapDispatchToProps)(BomListCont);
