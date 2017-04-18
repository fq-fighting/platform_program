import { fromJS, Record  } from 'immutable'
import { COMPANYSETREDU } from '../consts/ActTypes'

let initialData = fromJS({
    enterpriseInfo: {},
    edit_position_visiable: false,
    positionId: null,
    add_position_visiable: false,
    positionLoading: false,
    loading: false,
});

//reducer
const CompanySetRedu = ( state = initialData, action) => {
    switch (action.type) {
        // 获取 部门成员 列表
        case COMPANYSETREDU: 
            return action.state;
        default:
            return state;
    }
}

export default CompanySetRedu