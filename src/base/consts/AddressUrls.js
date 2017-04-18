import { prefix, prefix2 } from './UrlsConfig';

const basic = 'basic';
const address = 'basic/address';
const site = 'site';
const AddressUrls = {

    //站点
    SITE_LIST: `${prefix}/${basic}/${site}/getList`,
    SITE_DEL: `${prefix}/${basic}/${site}/delete`,
    SITE_DETAIL:`${prefix}/${basic}/${site}/getSiteByCode`,
    SITE_ADD: `${prefix}/${basic}/${site}/add`,
    SITE_EDIT: `${prefix}/${basic}/${site}/update`,
    SITE_ISDISABLE: `${prefix}/${basic}/${site}/isDisable`,

    //国家,区域,省份，城市下拉框数据URL
    COUNTRY_SELECTED: `${prefix}/${basic}/country/getSelected`,
    REGION_SELECTED: `${prefix}/${basic}/region/getSelected`,
    PROVINCE_SELECTED: `${prefix}/${basic}/province/getSelected`,
    CITY_SELECTED: `${prefix}/${basic}/city/getSelected`,
    COUNTY_SELECTED: `${prefix}/${basic}/county/getSelected`,
    //地址
    ADDRESS_ADD: `${prefix}/${address}/add`,
    ADDRESS_EDIT: `${prefix}/${address}/update`,
    ADDRESS_DETAIL: `${prefix}/${address}/getAddressByCode`,
    ADDRESS_LIST: `${prefix}/${address}/getList`,
    ADDRESS_DEL: `${prefix}/${address}/delete`,
    ADDRESS_ISDISABLE: `${prefix}/${address}/isDisable`,
    ADDRESS_ALLLIST:`${prefix}/${address}/getAll`,
    ADDRESS_GET_ALL: `${prefix}/${address}/getall`,
};

export default AddressUrls ;