import {createStore} from 'redux';
import rootReducer from './reducers/rootReducer';
import initialState from './reducers/initialState';
import * as productActions from './actions/productActions';
import * as discountCodeActions from './actions/discountCodeActions';
import * as shoppingCartActions from './actions/shoppingCartActions';

// This is to test Action, Store, and Reducers together...
describe('Store', () => {
    it('Should handle load user', () => {
        // arrange
        const store = createStore(rootReducer, initialState);
        const products = require('../resources/fixtures/products.json');
        const discountCodes = require('../resources/fixtures/discountCodes.json');
        const data1 = {
            "product": {
                "id": "wf",
                "name": "Workflow",
                "price": 199.99
            },
            "quantity": 1
        };
        const data2 = {
            "product": {
                "id": "wf",
                "name": "Workflow",
                "price": 199.99
            },
            "quantity": -10
        };

        // Now we could even go further with this and create an array of actions up here
        // and then assert that the final result was what we expected.

        // Test 1: Start of the program, load products
        // act
        // Could dispatch multiple actions here and assert on result
        let action = productActions.loadProductsSuccess(products);
        store.dispatch(action);

        // assert
        let actual = store.getState().products;
        let expected = products;
        expect(actual).toEqual(expected);


        // Test 2: Load discount code
        // act
        // Could dispatch multiple actions here and assert on result
        action = discountCodeActions.loadDiscountCodesSuccess(discountCodes);
        store.dispatch(action);

        // assert
        actual = store.getState().discountCodes;
        expected = discountCodes;
        expect(actual).toEqual(expected);


        // Test 3: Add 1 Workflow.
        // act
        // Could dispatch multiple actions here and assert on result
        action = shoppingCartActions.updateItemInCart(data1);
        store.dispatch(action);

        // assert
        actual = store.getState().cartItems;
        expected = {...data1, subTotal: 199.99};
        expect(actual.length).toEqual(1);
        expect(actual[0]).toEqual(expected);


        // Test 4: Delete 1 Workflow
        // act
        // Could dispatch multiple actions here and assert on result
        action = shoppingCartActions.updateItemInCart(data2);
        store.dispatch(action);

        // assert
        actual = store.getState().cartItems;
        expect(actual.length).toEqual(0);


        // Test 5: Add 1 Workflow and clear the cart
        // act
        // Could dispatch multiple actions here and assert on result
        action = shoppingCartActions.updateItemInCart(data1);
        store.dispatch(action);
        action = shoppingCartActions.clearCart();
        store.dispatch(action);

        // assert
        actual = store.getState().cartItems;
        expect(actual.length).toEqual(0);
    });
});
