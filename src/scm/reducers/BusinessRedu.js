import { fromJS } from 'immutable';
import { BUSINESSREDU }from '../consts/ActTypes';

let initState = fromJS({

});

const BusinessRedu = (state = initState, action) => {
    switch (action.type) {
        case BUSINESSREDU:
            return action.state;
        default:
            return state;
    }
}

export default BusinessRedu;