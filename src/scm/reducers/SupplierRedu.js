import { fromJS } from 'immutable';
import { SUPPLIERREDU }from '../consts/ActTypes';

let initState = fromJS({
    
});

const SupplierRedu = (state = initState, action) => {
    switch (action.type) {
        case SUPPLIERREDU:
            return action.state;
        default:
            return state;
    }
}

export default SupplierRedu;