import {combineReducers} from 'redux';
import products from "./productReducer";
import discountCodes from "./discountCodeReducer";
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    products,
    discountCodes,
    ajaxCallsInProgress
});

export default rootReducer;
