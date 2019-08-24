import * as types from './actionTypes';

export const beginAjaxCall = () => ({
    type: types.BEGIN_AJAX_CALL
});

export const ajaxCallError = () => ({
    type: types.AJAX_CALL_ERROR
});
