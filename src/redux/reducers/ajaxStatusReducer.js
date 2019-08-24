import initialState from './initialState';
import * as types from '../actions/actionTypes';

const actionTypeEndsInSuccess = (type) => {
    return type.substring(type.length - 8) === '_SUCCESS';
};

const ajaxStatusReducer = (state=initialState.ajaxCallsInProgress, action) => {
    if(action.type === types.BEGIN_AJAX_CALL) {
        return state + 1;
    } else if(action.type === types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
};

export default ajaxStatusReducer;
