import {combineReducers} from 'redux';
import products from "./productReducer";
import discountCodes from "./discountCodeReducer";
import cartItems from './shoppingCartReducer';
import apiCallsInProgress from './apiStatusReducer';

const rootReducer = combineReducers({
    products,
    discountCodes,
    cartItems,
    apiCallsInProgress
});

export default rootReducer;
