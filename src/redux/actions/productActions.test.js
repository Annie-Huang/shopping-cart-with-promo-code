import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as productActions from './productActions';

import axios from 'axios';
jest.mock('axios');

// Test a sync action
describe('productActions', () => {
    it('loadProductsSuccess should create a LOAD_PRODUCTS_SUCCESS action', () => {
        const products = require('../../resources/fixtures/products.json');
        const expectedAction = {
            type: types.LOAD_PRODUCTS_SUCCESS,
            products: products
        };

        const action = productActions.loadProductsSuccess(products);
        expect(action).toEqual(expectedAction);
    });
});

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

// // The following is calling products.json file directly in mockProductApi.js
// describe('productActions Thunk', () => {
//     it('should create BEGIN_API_CALL and LOAD_PRODUCTS_SUCCESS when loading products', (done) => {
//
//         // This test takes a bit longer because of the delay set in \shopping-cart-with-promo-code\src\mockApi\delay.js
//         // But I will keep the delay because it will make running the app more real.
//         const store = mockStore({products: []});
//         store.dispatch(productActions.loadProducts()).then(() => {
//             const actions = store.getActions();
//             expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
//             expect(actions[1].type).toEqual(types.LOAD_PRODUCTS_SUCCESS);
//             done();
//         });
//     });
// });

// The following is calling products.json file through axios that serve through express in mockProductApi.js
describe("Async Actions", () => {
    describe("Load products Thunk", () => {
        // If you have multiple thunks, you can copy/paste this pattern to test them quickly.
        it("should create BEGIN_API_CALL and LOAD_PRODUCTS_SUCCESS when loading products", () => {
            // This captures all axios calls and responds with some mock data.
            const products = require('../../resources/fixtures/products.json');
            const resp = {data: products};
            axios.get.mockResolvedValue(resp);

            // Goal: Assert these actions are created.
            const expectedActions = [
                { type: types.BEGIN_API_CALL },
                { type: types.LOAD_PRODUCTS_SUCCESS, products }
            ];

            const store = mockStore({ products: [] });
            return store.dispatch(productActions.loadProducts()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
