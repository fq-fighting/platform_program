import { prefix, prefix2 } from './UrlsConfig';

const dept = 'dept';
const employees = 'employees';
const position = 'position';

const DeptUrls = {

    DEPT_LIST: `${prefix}/${dept}/list`,
    DEPARTMENT_LIST: `${prefix}/${dept}/list`,
    DEPARTMENT_DETAIL: `${prefix}/${dept}/detail`,
    DEPARTMENT_MANAGER: `${prefix}/${dept}/manager`,
    DEPARTMENT_ADD: `${prefix}/${dept}/add`,
    DEPARTMENT_SETUP: `${prefix}/${dept}/setup`,


    POSITION_LIST: `${prefix}/${employees}/getJobList`,
    POSITION_DETAIL: `${prefix}/${employees}/getJob`,
    POSITION_ADD: `${prefix}/${employees}/addJob`,
    POSITION_UPDATE: `${prefix}/${employees}/updateJob`,
    POSITION_DEL: `${prefix}/${employees}/delJob`,

    POSITION_JOB_LIST: `${prefix}/${position}/getjoblist`,

};

export default DeptUrls ;