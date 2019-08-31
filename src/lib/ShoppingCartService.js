class ShoppingCartService {
    static calculateDiscountAmount = (cartItems, total, promoCode) => {
        let discountAmount = 0;
        if (promoCode === 'RRD4D32' && total > 1000) {
            discountAmount = Number((total * 0.1).toFixed(2));
        } else if (promoCode === '44F4T11' && total > 1500) {
            discountAmount = Number((total * 0.15).toFixed(2));
        } else if (promoCode === 'FF9543D1') {
            const docgen = cartItems.find(item => item.product.id === 'docgen');
            if (docgen && docgen.quantity >= 10) {
                discountAmount = docgen.quantity; // $1 discount for each dogen.
            }
        } else if (promoCode === 'YYGWKJD') {
            const wf = cartItems.find(item => item.product.id === 'wf');
            const form = cartItems.find(item => item.product.id === 'form');
            if (wf && form) {
                discountAmount = form.quantity * 10; // $10 discount for each form.
            }
        }
        return discountAmount;
    };
}

export default ShoppingCartService;
