import delay from './delay';
import axios from 'axios';

class DiscountCodeApi {
    static loadDiscountCodes() {
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         const discountCodes = require('../resources/fixtures/discountCodes.json');
        //         resolve(Object.assign([], discountCodes));
        //     }, delay);
        // });

        return axios.get('/api/discountCodes')
            .then(response => {
                // handle success
                console.log(response);
                return response.data;
            })
            .catch(error => {
                // handle error
                console.log(error);
                throw(error);
            })
            .finally(() => {
                // always executed
            });
    }
}

export default DiscountCodeApi;
