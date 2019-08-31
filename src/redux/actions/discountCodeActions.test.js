import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as discountCodeActions from './discountCodeActions';

// Test a sync action
describe('discountCodeActions', () => {
    it('loadDiscountCodesSuccess should create a LOAD_DISCOUNT_CODES_SUCCESS action', () => {
        const discountCodes = require('../../resources/fixtures/discountCodes');
        const expectedAction = {
            type: types.LOAD_DISCOUNT_CODES_SUCCESS,
            discountCodes: discountCodes
        };

        const action = discountCodeActions.loadDiscountCodesSuccess(discountCodes);
        expect(action).toEqual(expectedAction);
    });
});

// Test an async action
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('discountCodeActions thunk', () => {
    it('should create BEGIN_AJAX_CALL and LOAD_DISCOUNT_CODES_SUCCESS when loading products', (done) => {

        // This test takes a bit longer because of the delay set in \shopping-cart-react\src\api\delay.js
        // But I will keep the delay because it will make running the app more real.
        const store = mockStore({discountCodes: []});
        store.dispatch(discountCodeActions.loadDiscountCodes()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
            expect(actions[1].type).toEqual(types.LOAD_DISCOUNT_CODES_SUCCESS);
            done();
        });
    });
});
