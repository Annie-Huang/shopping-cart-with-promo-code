import * as types from '../actions/actionTypes';
import apiStatusReducer from "./apiStatusReducer";

describe('apiStatusReducer', () => {
    it('should increase state by 1 when passed BEGIN_API_CALL', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: types.BEGIN_API_CALL
        };

        // act
        const newState = apiStatusReducer(initialState, action);

        // assert
        expect(newState).toEqual(2);
    });

    it('should decrease state by 1 when passed API_CALL_ERROR', () => {
        // arrange
        const initialState = 1;
        const action = {
            type: types.API_CALL_ERROR
        };

        // act
        const newState = apiStatusReducer(initialState, action);

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
        const newState = apiStatusReducer(initialState, action);

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
        expect(apiStatusReducer(initialState, action)).toBe(initialState);
    });
});
