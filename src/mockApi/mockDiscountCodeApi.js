import delay from './delay';

class DiscountCodeApi {
    static loadDiscountCodes() {
        return new Promise(resolve => {
            setTimeout(() => {
                const discountCodes = require('../resources/fixtures/discountCodes.json');
                resolve(Object.assign([], discountCodes));
            }, delay);
        });
    }
}

export default DiscountCodeApi;
