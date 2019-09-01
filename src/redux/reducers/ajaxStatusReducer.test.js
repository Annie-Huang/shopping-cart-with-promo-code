import * as types from '../actions/actionTypes';
import ajaxStatusReducer from "./ajaxStatusReducer";

describe('ajaxStatusReducer', () => {
    it('should increase state by 1 when passed BEGIN_AJAX_CALL', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: types.BEGIN_AJAX_CALL
        };

        // act
        const newState = ajaxStatusReducer(initialState, action);

        // assert
        expect(newState).toEqual(2);
    });

    it('should decrease state by 1 when passed AJAX_CALL_ERROR', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: types.AJAX_CALL_ERROR
        };

        // act
        const newState = ajaxStatusReducer(initialState, action);

        // assert
        expect(newState).toEqual(0);
    });

    it('should decrease state by 1 when passed any action end with "_SUCCESS"', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: types.LOAD_PRODUCTS_SUCCESS
        };

        // act
        const newState = ajaxStatusReducer(initialState, action);

        // assert
        expect(newState).toEqual(0);
    });

    it('when no matching action type should return existing state', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: 'non existing action type',
        };

        // assert
        expect(ajaxStatusReducer(initialState, action)).toBe(initialState);
    });
});
