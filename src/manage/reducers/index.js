import { combineReducers } from "redux"
import CompanyRedu from './CompanyRedu'
// import LinkageRedu from './LinkageRedu';
import LinkageRedu from '../../main/reducers/LinkageRedu';
import AddressRedu from '../../main/reducers/AddressRedu';


const rootReducer = combineReducers({
    CompanyRedu,
    AddressRedu,
    LinkageRedu
})

export default rootReducer;