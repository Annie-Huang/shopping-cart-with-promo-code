import * as types from "../actions/actionTypes";
import discountCodeReducer from "./discountCodeReducer";

describe('discountCodeReducer', () => {
    it('should set products when passed LOAD_PRODUCTS_SUCCESS', () => {
        // arrange
        const initialState = [];
        const discountCodes = require('../../resources/fixtures/discountCodes');
        const action = {
            type: types.LOAD_DISCOUNT_CODES_SUCCESS,
            discountCodes: discountCodes
        };

        // act
        const newState = discountCodeReducer(initialState, action);

        // assert
        expect(newState.length).toEqual(4);
        expect(newState[0].id).toBe('RRD4D32');
        expect(newState[1].id).toBe('44F4T11');
        expect(newState[2].id).toBe('FF9543D1');
        expect(newState[3].id).toBe('YYGWKJD');
    });

    it('when no matching action type should return existing state', () => {
        // arrange
        const initialState = [];
        const discountCodes = require('../../resources/fixtures/discountCodes');
        const action = {
            type: 'non existing action type',
            discountCodes: discountCodes
        };

        // assert
        expect(discountCodeReducer(initialState, action)).toBe(initialState);
    });
});
