import initialState from './initialState';
import * as types from '../actions/actionTypes';

const shoppingCartReducer = (state=initialState.cartItems, action) => {
    if (action.type === types.UPDATE_ITEM_IN_CART) {
        const selectedItem = state.find((cartItem) => cartItem.product.id === action.data.product.id);

        // Item is not in the cartItems, add it.
        if (selectedItem === undefined) {
            const newItem = {
                product: action.data.product,
                quantity: 1,
            };
            return [
                ...state,
                Object.assign({}, newItem)
            ];

        } else {

            const updateItem = Object.assign({}, selectedItem);
            updateItem.quantity += action.data.quantity;

            if (updateItem.quantity > 0) {
                // Update the cartItem with new quantity info for add.
                return state.map(
                    item => item.product.id === action.data.product.id ? updateItem : item
                );

            } else {
                // Remove the cartItem from the cartItems list when quantity subtract to 0.
                return [
                    ...state.filter(item => item.product.id !== action.data.product.id),
                ];
            }
        }

    }

    return state;
};


export default shoppingCartReducer
