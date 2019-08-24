import delay from './delay';

class ProductApi {
    static loadProducts() {
        return new Promise(resolve => {
            setTimeout(() => {
                const products = require('../resources/fixtures/products.json');
                resolve(Object.assign([], products));
            }, delay);
        });
    }
}

export default ProductApi;
