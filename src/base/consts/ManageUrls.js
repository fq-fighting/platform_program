import { prefix, prefix2 } from './UrlsConfig';

const Manage = 'company';

const ManageUrls = {
    MANAGE_LIST: `${prefix}/${Manage}/list`,
    MANAGE_ADD: `${prefix}/${Manage}/add`,
    MANAGE_UPDATE: `${prefix}/${Manage}/update`,
    MANAGE_DETAIL: `${prefix}/${Manage}/detail`,
    MANAGE_RESET: `${prefix}/${Manage}/resetpassword`,
    MANAGE_STATUS: `${prefix}/${Manage}/status`,
    MANAGE_UPDATEBYUSER:`${prefix}/${Manage}/updateCompanyByUser`,
};

export default ManageUrls;
