import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as productActions from './productActions';

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

describe('productActions Thunk', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_PRODUCTS_SUCCESS when loading products', (done) => {

        // This test takes a bit longer because of the delay set in \shopping-cart-react\src\api\delay.js
        // But I will keep the delay because it will make running the app more real.
        const store = mockStore({products: []});
        store.dispatch(productActions.loadProducts()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_PRODUCTS_SUCCESS);
            done();
        });
    });
});
