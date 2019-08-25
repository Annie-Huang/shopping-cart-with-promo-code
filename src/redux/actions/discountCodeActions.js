import * as types from './actionTypes';
import DiscountCodeApi from '../../api/mockDiscountCodeApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadDiscountCodesSuccess = (discountCodes) => ({
    type: types.LOAD_DISCOUNT_CODES_SUCCESS,
    discountCodes: discountCodes
});

export const loadDiscountCodes = () => {
    return dispatch => {
        dispatch(beginAjaxCall());
        return DiscountCodeApi.loadDiscountCodes().then(discountCodes => {
            dispatch(loadDiscountCodesSuccess(discountCodes));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
};
