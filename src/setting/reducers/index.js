import { combineReducers } from "redux"
import CompanySetRedu from './CompanySetRedu'
import PersonalCenterRedu from './PersonalCenterRedu'

const rootReducer = combineReducers({
    CompanySetRedu,
    PersonalCenterRedu
})

export default rootReducer;