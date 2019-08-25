import initialState from "./initialState";
import * as types from '../actions/actionTypes';

const discountCodeReducer = (state=initialState.discountCodes, action) => {
    switch (action.type) {
        case types.LOAD_DISCOUNT_CODES_SUCCESS:
            return action.discountCodes;

        default:
            return state;
    }
};

export default discountCodeReducer;
