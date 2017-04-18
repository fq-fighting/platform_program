import { prefix} from './UrlsConfig';
const bom = 'maindata/bom';
const material = 'maindata/material';
const BasicUrls={
    MAIN_BOM_LIST: `${prefix}/${bom}/getList`,
    ADD_BOM: `${prefix}/${bom}/add`,
    EDIT_BOM: `${prefix}/${bom}/update`,
    DELETE_BOM: `${prefix}/${bom}/delete`,
    DETAIL_BOM: `${prefix}/${bom}/getDetail`,
    COPY_BOM: `${prefix}/${bom}/copy`,
    UPGRADE_BOM: `${prefix}/${bom}/upgrade`,
    QUERY_BOM:`${prefix}/${bom}/query`,
    CHECK_DATE:`${prefix}/${bom}/checkDate`,
    MATERIAL_LIST:`${prefix}/${material}/getSelected`,
}
export default BasicUrls ;