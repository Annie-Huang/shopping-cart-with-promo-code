import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as types from './actionTypes';
import * as discountCodeActions from './discountCodeActions';

import axios from 'axios';
jest.mock('axios');

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

// // The following is calling products.json file directly in mockProductApi.js
// describe('discountCodeActions thunk', () => {
//     it('should create BEGIN_API_CALL and LOAD_DISCOUNT_CODES_SUCCESS when loading discountCodes', (done) => {
//
//         // This test takes a bit longer because of the delay set in \shopping-cart-with-promo-code\src\mockApi\delay.js
//         // But I will keep the delay because it will make running the app more real.
//         const store = mockStore({discountCodes: []});
//         store.dispatch(discountCodeActions.loadDiscountCodes()).then(() => {
//             const actions = store.getActions();
//             expect(actions[0].type).toEqual(types.BEGIN_API_CALL);
//             expect(actions[1].type).toEqual(types.LOAD_DISCOUNT_CODES_SUCCESS);
//             done();
//         });
//     });
// });

// The following is calling products.json file through axios that serve through express in mockProductApi.js
describe("Async Actions", () => {
    describe("Load discountCodes Thunk", () => {
        // If you have multiple thunks, you can copy/paste this pattern to test them quickly.
        it("should create BEGIN_API_CALL and LOAD_DISCOUNT_CODES_SUCCESS when loading products", () => {
            // This captures all axios calls and responds with some mock data.
            const discountCodes = require('../../resources/fixtures/discountCodes');
            const resp = {data: discountCodes};
            axios.get.mockResolvedValue(resp);

            // Goal: Assert these actions are created.
            const expectedActions = [
                { type: types.BEGIN_API_CALL },
                { type: types.LOAD_DISCOUNT_CODES_SUCCESS, discountCodes }
            ];

            const store = mockStore({ discountCodes: [] });
            return store.dispatch(discountCodeActions.loadDiscountCodes()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });
});
