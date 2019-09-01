import * as types from './actionTypes';
import ProductApi from '../../api/mockProductApi';
import {beginApiCall, apiCallError} from './apiStatusActions';

export const loadProductsSuccess = (products) => ({
    type: types.LOAD_PRODUCTS_SUCCESS,
    products: products
});

export const loadProducts = () => {
    return dispatch => {
        dispatch(beginApiCall());
        return ProductApi.loadProducts().then(products => {
            dispatch(loadProductsSuccess(products));
        }).catch(error => {
            dispatch(apiCallError());
            throw(error);
        });
    };
};
