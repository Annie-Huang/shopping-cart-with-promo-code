import * as types from './actionTypes';
import DiscountCodeApi from '../../api/mockDiscountCodeApi';
import {beginApiCall, apiCallError} from './apiStatusActions';

export const loadDiscountCodesSuccess = (discountCodes) => ({
    type: types.LOAD_DISCOUNT_CODES_SUCCESS,
    discountCodes: discountCodes
});

export const loadDiscountCodes = () => {
    return dispatch => {
        dispatch(beginApiCall());
        return DiscountCodeApi.loadDiscountCodes().then(discountCodes => {
            dispatch(loadDiscountCodesSuccess(discountCodes));
        }).catch(error => {
            dispatch(apiCallError());
            throw(error);
        });
    };
};
