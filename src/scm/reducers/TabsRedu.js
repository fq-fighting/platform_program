import { fromJS, Record,List } from 'immutable';
import { TABSREDU } from '../consts/ActTypes';

let initState = fromJS({
    activeKey:"",
    tabs:[]
});

const TabsRedu = (state = initState, action) => {
    switch (action.type) {
        case TABSREDU:
            return action.state;
        default:
            return state;
    }
}
export default TabsRedu;