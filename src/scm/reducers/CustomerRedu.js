import { fromJS } from 'immutable';
import { CUSTOMERREDU }from '../consts/ActTypes';

let initState = fromJS({
    
});

const CustomerRedu = (state = initState, action) => {
    switch (action.type) {
        case CUSTOMERREDU:
            return action.state;
        default:
            return state;
    }
}

export default CustomerRedu;