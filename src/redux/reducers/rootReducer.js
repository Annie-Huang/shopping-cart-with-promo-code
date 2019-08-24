import {combineReducers} from 'redux';
import products from "./productReducer";
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    products,
    ajaxCallsInProgress
});

export default rootReducer;
