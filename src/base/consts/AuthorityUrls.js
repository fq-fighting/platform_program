import { prefix, prefix2 } from './UrlsConfig';

const resource  = 'resource';

const AuthorityUrls = {

    GET_LIST: `${prefix}/${resource}/getList`,
    GET_ROLE_INFO: `${prefix}/${resource}/getRoleInfo`,
    ADD_ROLE: `${prefix}/${resource}/addRole`,
    EDIT: `${prefix}/${resource}/edit`,
    DELETE: `${prefix}/${resource}/delete`,
    GET_EMP_LIST: `${prefix}/${resource}/getEmpList`,
    ADD_EMP_RESOURCE: `${prefix}/${resource}/addEmpResource`,
    BATCH_MOVE: `${prefix}/${resource}/batchMove`,
    GET_TREE: `${prefix}/${resource}/getTree`,

};
export default AuthorityUrls ;