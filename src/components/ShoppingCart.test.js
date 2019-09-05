import {shallow, mount} from "enzyme/build";
import {ShoppingCart} from "./ShoppingCart";
import React from "react";
import toJson from "enzyme-to-json";


describe('ShoppingCart presentation', () => {
    const clearCart = jest.fn();
    const cartItems = require('../resources/fixtures/cart-items.json');

    const props = {
        cartItems,
        clearCart
    };

    it('should render ShoppingCart component according to the cartItems information', () => {
        expect(toJson(shallow(<ShoppingCart {...props} />))).toMatchSnapshot();
    });

    it('#clearCart should be called when clicking Clear Cart button', () => {
        const wrapper = shallow(<ShoppingCart {...props} />);

        const buttons = wrapper.find('button');
        const clearButton =  buttons.first();
        expect(clearButton.text()).toBe('Clear Cart');

        clearButton.simulate('click');
        expect(clearCart).toBeCalled();
    });

    it('#applyPromoCode should be called when clicking Apply Code button. And if promoCode is valid, then discount amount, total should be recalculated', () => {
        const wrapper = mount(<ShoppingCart {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'RRD4D32' } });

        const buttons = wrapper.find('button');
        const applyCodeButton =  buttons.at(1);
        expect(applyCodeButton.text()).toBe('Apply Code');

        applyCodeButton.simulate('click');
        // 199.99 + 1998 = 2197.99
        expect(wrapper.find('#subTotal').text()).toEqual('SubTotal: $2,197.99');
        expect(wrapper.find('#discount').text()).toEqual('You have save: $219.80');
        expect(wrapper.find('#total').text()).toEqual('Total: $1,978.19');
    });

    it('#applyPromoCode should be called when clicking Apply Code button. And if promoCode is invalid, then discount amount remain 0', () => {
        const wrapper = mount(<ShoppingCart {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'ABC' } });

        const buttons = wrapper.find('button');
        const applyCodeButton =  buttons.at(1);
        expect(applyCodeButton.text()).toBe('Apply Code');

        applyCodeButton.simulate('click');
        // 199.99 + 1998 = 2197.99
        expect(wrapper.find('#subTotal').text()).toEqual('SubTotal: $2,197.99');
        expect(wrapper.find('#discount').text()).toEqual('You have save: $0.00');
        expect(wrapper.find('#total').text()).toEqual('Total: $2,197.99');
    });

    it('#clearPromoCode should be called when clicking Clear Code button. And if promoCode input field will be clear and discount amount remain 0', () => {
        const wrapper = mount(<ShoppingCart {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'RRD4D32' } });

        const buttons = wrapper.find('button');
        const applyCodeButton =  buttons.at(1);
        expect(applyCodeButton.text()).toBe('Apply Code');
        applyCodeButton.simulate('click');
        const clearCodeButton =  buttons.at(2);
        expect(clearCodeButton.text()).toBe('Clear Code');
        clearCodeButton.simulate('click');

        expect(wrapper.find('input').instance().value).toEqual('');
        // 199.99 + 1998 = 2197.99
        expect(wrapper.find('#subTotal').text()).toEqual('SubTotal: $2,197.99');
        expect(wrapper.find('#discount').text()).toEqual('You have save: $0.00');
        expect(wrapper.find('#total').text()).toEqual('Total: $2,197.99');
    });

    it('#update cartItems will trigger discount amount, total should be recalculated', () => {
        const wrapper = mount(<ShoppingCart {...props} />);
        wrapper.find('input').simulate('change', { target: { value: 'RRD4D32' } });

        const buttons = wrapper.find('button');
        const applyCodeButton =  buttons.at(1);
        expect(applyCodeButton.text()).toBe('Apply Code');

        applyCodeButton.simulate('click');
        // 199.99 + 1998 = 2197.99
        expect(wrapper.find('#subTotal').text()).toEqual('SubTotal: $2,197.99');
        expect(wrapper.find('#discount').text()).toEqual('You have save: $219.80');
        expect(wrapper.find('#total').text()).toEqual('Total: $1,978.19');


        // What we really want to test is from this section onwards...
        const newCartItems = cartItems.slice(0);
        newCartItems[0].quantity = 2;
        newCartItems[0].subTotal = 399.98;
        wrapper.setProps({ cartItems: newCartItems });

        // // 399.98 + 1998 = 2397.98
        expect(wrapper.find('#subTotal').text()).toEqual('SubTotal: $2,397.98');
        expect(wrapper.find('#discount').text()).toEqual('You have save: $239.80');
        expect(wrapper.find('#total').text()).toEqual('Total: $2,158.18');
    });
});
