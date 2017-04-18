import { combineReducers } from "redux"
import TabsRedu from './TabsRedu'
import BomRedu from './BomRedu'
import PageLoadingRedu from './PageLoadingRedu'
import BomAddTableRedu from './BomAddTableRedu'

const rootReducer = combineReducers({
    PageLoadingRedu,
    BomRedu,
	TabsRedu,
    BomAddTableRedu
})

export default rootReducer;