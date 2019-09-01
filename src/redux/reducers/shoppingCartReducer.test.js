import * as types from "../actions/actionTypes";
import shoppingCartReducer from "./shoppingCartReducer";


describe('shoppingCartReducer', () => {
    it('should insert new cartItem if it is not in the list when passed UPDATE_ITEM_IN_CART', () => {
        // arrange
        const initialState = require('../../resources/fixtures/cart-items.json');
        const data =     {
            "product": {
                "id": "form",
                "name": "Form",
                "price": 99.99
            },
            "quantity": 1
        };
        const action = {
            type: types.UPDATE_ITEM_IN_CART,
            data: data
        };

        // act
        const newState = shoppingCartReducer(initialState, action);

        // assert
        expect(newState.length).toEqual(3);
        expect(newState[0].product.id).toBe('wf');
        expect(newState[1].product.id).toBe('docgen');
        expect(newState[2].product.id).toBe('form');
    });

    it('should update quantity in cartItem if it is in the list when passed UPDATE_ITEM_IN_CART', () => {
        // arrange
        const initialState = require('../../resources/fixtures/cart-items.json');
        const data =     {
            "product": {
                "id": "docgen",
                "name": "Document Generation",
                "price": 9.99
            },
            "quantity": -1
        };
        const action = {
            type: types.UPDATE_ITEM_IN_CART,
            data: data
        };

        // act
        const newState = shoppingCartReducer(initialState, action);

        // assert
        expect(newState.length).toEqual(2);
        expect(newState[0].product.id).toBe('wf');
        expect(newState[0].quantity).toEqual(1);
        expect(newState[1].product.id).toBe('docgen');
        expect(newState[1].quantity).toEqual(1);
    });

    it('should remove cartItem if the updated quantity is zero when passed UPDATE_ITEM_IN_CART', () => {
        // arrange
        const initialState = require('../../resources/fixtures/cart-items.json');
        const data =     {
            "product": {
                "id": "wf",
                "name": "Workflow",
                "price": 199.99
            },
            "quantity": -1
        };
        const action = {
            type: types.UPDATE_ITEM_IN_CART,
            data: data
        };

        // act
        const newState = shoppingCartReducer(initialState, action);

        // assert
        expect(newState.length).toEqual(1);
        expect(newState[0].product.id).toBe('docgen');
        expect(newState[0].quantity).toEqual(2);
    });

    it('should set cartItems when passed EMPTY_ITEM_IN_CART', () => {
        // arrange
        const initialState = require('../../resources/fixtures/cart-items.json');
        const action = {
            type: types.CLEAR_CART,
        };

        // assert
        expect(shoppingCartReducer(initialState, action).length).toEqual(0);
    });

    it('when no matching action type should return existing state', () => {
        // arrange
        const initialState = require('../../resources/fixtures/cart-items.json');
        const data =     {
            "product": {
                "id": "wf",
                "name": "Workflow",
                "price": 199.99
            },
            "quantity": 1
        };
        const action = {
            type: 'non existing action type',
            data: data
        };

        // assert
        expect(shoppingCartReducer(initialState, action)).toBe(initialState);
    });
});
