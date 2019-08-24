import * as types from './actionTypes';
import ProductApi from '../../api/mockProductApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadProductsSuccess = (products) => ({
    type: types.LOAD_PRODUCTS_SUCCESS,
    products: products
});

export const loadProducts = () => {
    return dispatch => {
        dispatch(beginAjaxCall());
        return ProductApi.loadProducts().then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
};
