import delay from './delay';
import axios from 'axios';

class ProductApi {
    static loadProducts() {
        // return new Promise(resolve => {
        //     setTimeout(() => {
        //         const products = require('../resources/fixtures/products.json');
        //         resolve(Object.assign([], products));
        //     }, delay);
        // });

        return axios.get('/api/products')
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

export default ProductApi;
