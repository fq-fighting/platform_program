import { TABSREDU } from '../consts/ActTypes';

let getStateFun = (getState) =>{
    return getState()[TABSREDU];
}
const actions = {
    TabAdd: (tab) => (dispatch, getState) => {
        let state = getStateFun(getState)
        .set("activeKey",tab.key)
        .updateIn(['tabs'],(tabs)=>{
            let index = tabs.map(t=>t.key).indexOf(tab.key);
            if(index<0)
                tabs = tabs.splice(tabs.size,0,tab)
            return tabs;
        })
        dispatch({ type: TABSREDU, state });
    },
    TabRemove: (key,activeKey) => (dispatch, getState) => {
        let state,
            count = 0,
            stateMap = getStateFun(getState),
            akey = activeKey;
        state = stateMap.updateIn(['tabs'],(tabs)=>{
            let index = tabs.map(t=>t.key).indexOf(key);
            if(index>-1)
                tabs = tabs.splice(index,1)
            count = tabs.size;
            return tabs;
        }).updateIn(["activeKey"],(k)=>{
            if(stateMap.get("tabs").size-1 == 0)
                return "";
            else
                return activeKey;
        })
        dispatch({ type: TABSREDU, state });
    },
    TabChange: (activeKey) => (dispatch, getState) => {
        let state = getStateFun(getState).set("activeKey", activeKey);
        dispatch({ type: TABSREDU, state});
    }
}

export default actions;