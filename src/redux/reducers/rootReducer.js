import {combineReducers} from 'redux';
import products from "./productReducer";
import discountCodes from "./discountCodeReducer";
import cartItems from './shoppingCartReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    products,
    discountCodes,
    cartItems,
    ajaxCallsInProgress
});

export default rootReducer;
