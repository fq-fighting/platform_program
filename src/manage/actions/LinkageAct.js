import {ReqApi} from '../../base/services/ReqApi'
import AddressUrls from '../../base/consts/AddressUrls';
import {LINKAGEREDU} from '../consts/ActTypes';

const actions = {
    ChangeLable: (data) => (dispatch, getState) => {
        let state = getState()[LINKAGEREDU].setIn([data.key], data.value);
        dispatch({type: LINKAGEREDU, state});
    },
    CountryList: () => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.COUNTRY_SELECTED,
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCountryList(json.data));
            }
            return json;
        });
    },
    GetCountryList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[LINKAGEREDU].setIn(['source','countrySource'], list)
        dispatch({type: LINKAGEREDU, state});
    },
    ProvinceList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.PROVINCE_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetProvinceList(json.data));
            }
            return json;
        });
    },
    GetProvinceList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[LINKAGEREDU].setIn(['source','provinceSource'], list).set('provinceCode','');
        dispatch({type: LINKAGEREDU, state});
    },
    CityList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.CITY_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCityList(json.data));
            }
            return json;
        });
    },
    GetCityList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[LINKAGEREDU].setIn(['source','citySource'], list)
        dispatch({type: LINKAGEREDU, state});
    },
    CountyList: (pm = {}) => (dispatch, getState) => {
        return ReqApi.get({
            url: AddressUrls.COUNTY_SELECTED,
            pm
        }).then((json) => {
            if (json.status === 2000) {
                dispatch(actions.GetCountyList(json.data));
            }
            return json;
        });
    },
    GetCountyList: (data) => (dispatch, getState) => {
        let {list} = data;
        let state = getState()[LINKAGEREDU].setIn(['source','countySource'], list)
        dispatch({type: LINKAGEREDU, state});
    },
    CleanOtherRegion: (cleanKeys) => (dispatch, getState) => {
        let state = getState()[LINKAGEREDU];
        cleanKeys.forEach(s=>{
            state=state.setIn(['source',s],[]);
        })
        // let state = getState()[LINKAGEREDU].update('source',s=>s[del[0]])
        dispatch({type: LINKAGEREDU, state});
    },

}
export default actions;