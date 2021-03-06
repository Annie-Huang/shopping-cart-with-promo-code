import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import sumby from 'lodash.sumby';
import ShoppingCartService from '../lib/ShoppingCartService';
import * as shoppingCartActions from "../redux/actions/shoppingCartActions";
import toastr from "toastr";
import {formatCurrency} from "../lib/CurrencyUtil"
import styles from "./ShoppingCart.module.css";

export const ShoppingCart  = ({
    cartItems,
    clearCart
}) => {
    const [subTotal, setSubTotal] = useState(0);
    const [promoCode, setPromoCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [isDiscountCodeValid, setDiscountCodeValid] = useState(true);

    const validDiscountCodes = ['', 'RRD4D32', '44F4T11', 'FF9543D1', 'YYGWKJD'];

    useEffect(() => {
        const newSubTotal = Number(sumby(cartItems, 'subTotal').toFixed(2));
        setSubTotal(newSubTotal); // cannot use total straightaway because all setXxx methods async calls.
        setDiscountAmount(
            promoCode === '' ? 0 : ShoppingCartService.calculateDiscountAmount(cartItems, newSubTotal, promoCode)
        );
    }, [cartItems]);


    const children = cartItems.map((cartItem, index) =>
        <div className='row' key={index}>
            <div className='col-md-2'>{cartItem.product.name}</div>
            <div className='col-md-2'>Unit Price: ${cartItem.product.price}</div>
            <div className='col-md-2'>Quantity: {cartItem.quantity}</div>
            <div className='col-md-2'>Subtotal: {formatCurrency(cartItem.subTotal)}</div>
        </div>
    );

    const applyPromoCode = () => {
        console.log('promoCode=', promoCode);
        setDiscountAmount(
            promoCode === '' ? 0 : ShoppingCartService.calculateDiscountAmount(cartItems, subTotal, promoCode)
        );
        setDiscountCodeValid(validDiscountCodes.includes(promoCode));
        toastr.success(`Apply discount code success`);
    };

    const resetPromoteCodeAndDiscountAmount = () => {
        setPromoCode('');
        setDiscountAmount(0);
        setDiscountCodeValid(true);
    };

    const clearPromoCode = () => {
        resetPromoteCodeAndDiscountAmount();
        toastr.success(`Clear discount code success`);
    };

    const clearShoppingCart = () => {
        clearCart();
        resetPromoteCodeAndDiscountAmount();
        toastr.success(`Clear cart success`);
    };

    return (
        <>
            {cartItems.length > 0 &&
            <div className="card">
                <div className="card-header bg-info text-white">
                    <h3 className="card-title">Your Basket:</h3>
                </div>
                <div className="card-body">
                    {children}
                    <br/>
                    <div className='row'>
                        <div className='col-md-2'>
                            <h3 id='subTotal' className="card-title">SubTotal: {formatCurrency(subTotal)}</h3>
                        </div>
                        <div className='col-md-2'>
                            <button type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={clearShoppingCart}
                            >Clear Cart</button>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className='row'>
                        <div className='col-sm-2'>Discount Code:</div>
                        <input className='col-sm-1' type="text"  value={promoCode} onChange={e => setPromoCode(e.target.value)}/>
                        <div className='col-sm-4'>
                            <button type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={applyPromoCode}
                            >Apply Code</button>
                            &nbsp;&nbsp;
                            <button type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={clearPromoCode}
                            >Clear Code</button>
                        </div>
                    </div>
                    <br/>
                    {!isDiscountCodeValid &&  <div className={styles.error}>The Discount code you applied is invalid. Please try again.</div>}
                    <div className='row'>
                        <div id='discount' className='col-sm-12'>You have save: {formatCurrency(discountAmount)}</div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 id='total' className="card-title">Total: {formatCurrency(subTotal-discountAmount)}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-2'>
                        <button type="button" className="btn btn-lg btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};



ShoppingCart.propTypes = {
    cartItems: PropTypes.array.isRequired,
    clearCart: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    cartItems: state.cartItems,
});

const mapDispatchToProps = {
    clearCart: shoppingCartActions.clearCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
