import * as types from "../actions/actionTypes";
import productReducer from "./productReducer";

describe('productReducer', () => {
    it('should set products when passed LOAD_PRODUCTS_SUCCESS', () => {
        // arrange
        const initialState = [];
        const products = require('../../resources/fixtures/products.json');
        const action = {
            type: types.LOAD_PRODUCTS_SUCCESS,
            products: products
        };

        // act
        const newState = productReducer(initialState, action);

        // assert
        expect(newState.length).toEqual(3);
        expect(newState[0].id).toBe('wf');
        expect(newState[1].id).toBe('docgen');
        expect(newState[2].id).toBe('form');
    });

    it('when no matching action type should return existing state', () => {
        // arrange
        const initialState = [];
        const products = require('../../resources/fixtures/products.json');
        const action = {
            type: 'non existing action type',
            products: products
        };

        // assert
        expect(productReducer(initialState, action)).toBe(initialState);
    });
});
