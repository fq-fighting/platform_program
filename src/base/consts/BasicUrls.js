import { prefix, prefix2 } from './UrlsConfig';

const basic = 'basic';

const BasicUrls = {
    SUBJECT_ALL: `${prefix}/${basic}/subject/getAllSubject`,
};
BasicUrls.GET_SUBJECT_ALL = (subCode) => ({
    url: BasicUrls.SUBJECT_ALL,
    pm: { subCode }
});

export default BasicUrls ;