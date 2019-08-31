import ShoppingCartService from "./ShoppingCartService";

describe('PriceCalculator', () => {
    const products = require('../resources/fixtures/products.json');

    it('#calculateDiscountAmount should return 0 if the discount code is invalid', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([], 1000, 'ABC');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is RRD4D32 but total <= 1000', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([], 1000, 'RRD4D32');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return 10% if the discount code is RRD4D32 but total > 1000', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([], 2000, 'RRD4D32');
        expect(discountAmount).toEqual(200);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is 44F4T11 but total <= 1500', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([], 1500, '44F4T11');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return 15% if the discount code is 44F4T11 but total > 1500', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([], 2000, '44F4T11');
        expect(discountAmount).toEqual(300);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is FF9543D1 but docgen is not in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[0], quantity: 1}], 2000, 'FF9543D1');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is FF9543D1 but quantity of docgen < 10 in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[1], quantity: 9}], 2000, 'FF9543D1');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return quanity * 1 if the discount code is FF9543D1 but quantity of docgen >= 10 in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[1], quantity: 10}], 2000, 'FF9543D1');
        expect(discountAmount).toEqual(10);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is YYGWKJD but form is not in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[0], quantity: 1}], 2000, 'YYGWKJD');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return 0 if the discount code is YYGWKJD but wf is not in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[2], quantity: 1}], 2000, 'YYGWKJD');
        expect(discountAmount).toEqual(0);
    });

    it('#calculateDiscountAmount should return form quantity * 10 if the discount code is YYGWKJD and both form and wf are not in the cartItems', () => {
        const discountAmount = ShoppingCartService.calculateDiscountAmount([{product: products[0], quantity: 1}, {product: products[2], quantity: 10}], 2000, 'YYGWKJD');
        expect(discountAmount).toEqual(100);
    });
});
