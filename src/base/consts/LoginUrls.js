import { prefix, prefix2 } from './UrlsConfig';

const login = 'login';

const LoginUrls = {
    //登录的忘记密码URL
    LOGIN_GET_SMSWITH: `${prefix}/${login}/getSMSWithImg`,
    LOGIN_CHECK_PHONE: `${prefix}/${login}/checkPhone`,
    LOGIN_RESET_PSW: `${prefix}/${login}/resetPassword`,

    //个人中心的忘记密码与修改手机
    LOGIN_CHECK_PSW: `${prefix}/${login}/checkPassword`,
    LOGIN_RESET_PSWWITH: `${prefix}/${login}/resetPasswordWithOld`,
    LOGIN_GET_SMS: `${prefix}/${login}/getSMS`,
    LOGIN_BIND_PHONE: `${prefix}/${login}/bindNewPhone`,
};

export default LoginUrls;
