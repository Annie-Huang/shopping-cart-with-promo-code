import * as types from './actionTypes';

export const beginApiCall = () => ({
    type: types.BEGIN_API_CALL
});

export const apiCallError = () => ({
    type: types.API_CALL_ERROR
});
