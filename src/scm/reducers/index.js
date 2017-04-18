import { combineReducers } from "redux"
import TabsRedu from './TabsRedu'
import PageLoadingRedu from './PageLoadingRedu'

import BusinessRedu from './BusinessRedu';
import CustomerRedu from './CustomerRedu';
import SupplierRedu from './SupplierRedu';

const rootReducer = combineReducers({
    PageLoadingRedu,
	TabsRedu,
    BusinessRedu,
    CustomerRedu,
    SupplierRedu,
})

export default rootReducer;