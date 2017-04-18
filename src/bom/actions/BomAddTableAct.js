import { ReqApi } from '../../base/services/ReqApi';
import { fromJS, Record, Map } from 'immutable';
import { Urls } from '../../base/consts/urls';
import { BOMADDTABLEREDU, BOMREDU } from '../consts/ActTypes';

const actions = {
    handleAdd: (data) => (dispatch, getState) => {
        let dataSource1 = getState()[BOMREDU].get("bomDetailInfo");  
        // console.log(typeof dataSource)
        if (typeof dataSource1.list === 'undefined') {
            dataSource1.list = [];
        }
        let dataSource = dataSource1.list;
        console.log(dataSource1)
        console.log(dataSource)
        dataSource.unshift(data);

        // dataSource = [...dataSource, data];
        let state = getState()[BOMREDU].set('bomDetailInfo', { ...dataSource1, list: dataSource });
        dispatch({ type: BOMREDU, state });
        // console.log(state.toJS())
    },
    onDelete: (data) => (dispatch, getState) => {
        let dataSource1 = getState()[BOMREDU].get("bomDetailInfo");
        let dataSource = dataSource1.list;
        // console.log(dataSource)
        let state = getState()[BOMREDU].set('bomDetailInfo', { ...dataSource1, list: data });
        dispatch({ type: BOMREDU, state });
        //   console.log(state.toJS())
    },
    onCellChange: (data) => (dispatch, getState) => {
        let dataSource1 = getState()[BOMREDU].get("bomDetailInfo");
        let dataSource = dataSource1.list;
        // console.log(dataSource)
        let state = getState()[BOMREDU].set('bomDetailInfo', { ...dataSource1, list: data });
        dispatch({ type: BOMREDU, state });
        // console.log(key)
        // let dataSource = getState()[BOMADDTABLEREDU].get('dataSource');
        // let state = getState()[BOMADDTABLEREDU].set('dataSource', data);
        // dispatch({ type: BOMADDTABLEREDU, state });
        // console.log(state.toJS())
    },
    handleChange: (val, flag) => (dispatch, getState) => {
        let dataSource1 = getState()[BOMREDU].get("bomDetailInfo");
        let dataSource = dataSource1.list;
        // console.log('dataSource', dataSource);
        // console.log(val)
        dataSource.map((item, index) => {
            if (index == flag) {
                item.detailName = val.materialName;
                item.detailSpec = val.materialSpec;
                item.measureUnit = val.measureUnit;
            }
            return item;
        });
        // console.log(dataSource)
        let state = getState()[BOMREDU].setIn("bomDetailInfo", { ...dataSource1, list: dataSource }, [['dataSource'].concat(dataSource)]);
        dispatch({ type: BOMREDU, state });
    },
}

export default actions;