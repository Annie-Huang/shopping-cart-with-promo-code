import * as types from './actionTypes';
import * as ajaxStatusActions from './ajaxStatusActions';

// Test a sync action
describe('ajaxStatusActions', () => {
    it('beginAjaxCall should create a BEGIN_AJAX_CALL action', () => {
        const expectedAction = {
            type: types.BEGIN_AJAX_CALL,
        };

        const action = ajaxStatusActions.beginAjaxCall();
        expect(action).toEqual(expectedAction);
    });

    it('ajaxCallError should create a AJAX_CALL_ERROR action', () => {
        const expectedAction = {
            type: types.AJAX_CALL_ERROR,
        };

        const action = ajaxStatusActions.ajaxCallError();
        expect(action).toEqual(expectedAction);
    });
});
