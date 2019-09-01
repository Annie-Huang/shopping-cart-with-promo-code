import React,  { useEffect } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as productActions from "../redux/actions/productActions";
import * as discountCodeActions from "../redux/actions/discountCodeActions";
import * as shoppingCartActions from "../redux/actions/shoppingCartActions";
import Spinner from "./common/Spinner";
import styles from "./ProductList.module.css";
import toastr from 'toastr/toastr';

export const ProductList = ({
    products,
    loadProducts,
    updateItemInCart,
    discountCodes,
    loadDiscountCodes,
}) => {
    useEffect(() => {
        loadProducts();
        // loadProducts().catch(error => {
        //     alert("Loading products failed" + error);
        // });
    }, [loadProducts]);

    useEffect(() => {
        loadDiscountCodes();
        // loadDiscountCodes().catch(error => {
        //     alert("Loading discount codes failed" + error);
        // });
    }, [loadDiscountCodes]);

    const updateShoppingCart = (data) => {
        updateItemInCart(data);
        const action = data.quantity === 1 ? 'Add' : 'Remove';
        toastr.success(`${action} one ${data.product.name} success`);
    };

    const productList = products.map(product =>
        <div className="card" key={product.id}>
            <div className="card-header text-center text-white bg-primary">
                <h4 className="card-title">{product.name}</h4>
            </div>
            <div className="card-body">
                <div className='row'>
                    <div className='col-md-3'>Price:</div>
                    <div className='col-md-7'>${product.price}</div>
                </div>
            </div>
            <div className="card-footer">
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => updateShoppingCart({product, quantity: 1})}
                >
                    Add 1 item
                </button>
                &nbsp;&nbsp;
                {product.productInCart &&
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => updateShoppingCart({product, quantity: -1})}
                >
                    Remove 1 item
                </button>
                }
            </div>
        </div>
    );

    const discountCodeList = discountCodes.map(discountCode =>
        <div key={discountCode.id}>{discountCode.id} : {discountCode.description}</div>
    );

    return (
        products.length === 0 || discountCodes.length === 0 ?
            <Spinner/> :
            <>
                <div className="card-deck">
                    {productList}
                </div>
                <br/>
                <div className={styles.warning}>Test CSS Modules</div>
                <h5>Available discount codes are as following. Please keep in mind that you can only apply for one.</h5>
                {discountCodeList}
            </>
    )
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    loadProducts: PropTypes.func.isRequired,
    updateItemInCart: PropTypes.func.isRequired,
    discountCodes: PropTypes.array.isRequired,
    loadDiscountCodes: PropTypes.func.isRequired,
};

export const updateProductsWithInCartInfo = (products, cartItems) => {
    const updatedProducts = [];
    products.forEach(product => {
        const matchCartItem = cartItems.find((cartItem) => cartItem.product.id === product.id);
        updatedProducts.push({...product, productInCart: !!matchCartItem});
    });

    return updatedProducts;
};

const mapStateToProps = (state, ownProps) => ({
    products: updateProductsWithInCartInfo(state.products, state.cartItems),
    discountCodes: state.discountCodes,
});

const mapDispatchToProps = {
    loadProducts: productActions.loadProducts,
    updateItemInCart: shoppingCartActions.updateItemInCart,
    loadDiscountCodes: discountCodeActions.loadDiscountCodes,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
