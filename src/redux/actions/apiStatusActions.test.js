import * as types from './actionTypes';
import * as apiStatusActions from './apiStatusActions';

// Test a sync action
describe('apiStatusActions', () => {
    it('beginApiCall should create a BEGIN_API_CALL action', () => {
        const expectedAction = {
            type: types.BEGIN_API_CALL,
        };

        const action = apiStatusActions.beginApiCall();
        expect(action).toEqual(expectedAction);
    });

    it('apiCallError should create a API_CALL_ERROR action', () => {
        const expectedAction = {
            type: types.API_CALL_ERROR,
        };

        const action = apiStatusActions.apiCallError();
        expect(action).toEqual(expectedAction);
    });
});
