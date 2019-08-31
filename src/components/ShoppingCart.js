import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import sumby from 'lodash.sumby';
import * as discountCodeActions from "../redux/actions/discountCodeActions";
import ShoppingCartService from '../lib/ShoppingCartService';
import * as shoppingCartActions from "../redux/actions/shoppingCartActions";
import styles from './ShoppingCart.module.css';

export const ShoppingCart  = ({
    discountCodes,
    loadDiscountCodes,
    cartItems,
    clearCart
}) => {
    const [total, setTotal] = useState(0);
    const [promoCode, setPromoCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);


    useEffect(() => {
        loadDiscountCodes().catch(error => {
            alert("Loading discount codes failed" + error);
        });
    }, [loadDiscountCodes]);

    useEffect(() => {
        const newTotal = Number(sumby(cartItems, 'subTotal').toFixed(2));
        setTotal(newTotal); // cannot use total straightaway because all setXxx methods async calls.
        setDiscountAmount(
            promoCode === '' ? 0 : ShoppingCartService.calculateDiscountAmount(cartItems, newTotal, promoCode)
        );
    }, [cartItems]);

    const discountCodeList = discountCodes.map(discountCode =>
        <div key={discountCode.id}>{discountCode.id} : {discountCode.description}</div>
    );

    const cartItemList = cartItems.map((cartItem, index) =>
        <div className='row' key={index}>
            <div className='col-md-2'>{cartItem.product.name}</div>
            <div className='col-md-2'>Unit Price: ${cartItem.product.price}</div>
            <div className='col-md-2'>Quantity: {cartItem.quantity}</div>
            <div className='col-md-2'>Subtotal: ${cartItem.subTotal}</div>
        </div>
    );

    const applyPromoCode = () => {
        console.log('promoCode=', promoCode);
        setDiscountAmount(
            promoCode === '' ? 0 : ShoppingCartService.calculateDiscountAmount(cartItems, total, promoCode)
        );
    };

    const clearPromoCode = () => {
        setPromoCode('');
        setDiscountAmount(0);
    };

    return (
        <div>
            <div className={styles.warning}>Test CSS Modules</div>
            <h5>Available discount codes are as following. Please keep in mind that you can only apply for one.</h5>
            {discountCodeList}
            {cartItems.length > 0 &&
            <div className="card">
                <div className="card-header bg-info text-white">
                    <h3 className="card-title">Your Basket:</h3>
                </div>
                <div className="card-body">
                    {cartItemList}
                    <br/>
                    <div className='row'>
                        <div className='col-md-2'>
                            <h3 className="card-title">SubTotal: ${total}</h3>
                        </div>
                        <div className='col-md-2'>
                            <button type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => clearCart()}
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
                                    onClick={() => applyPromoCode()}
                            >Apply Code</button>
                            &nbsp;&nbsp;
                            <button type="button"
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => clearPromoCode()}
                            >Clear Code</button>
                        </div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className='col-sm-12'>You have save: ${discountAmount}</div>
                    </div>
                    <br/>
                    <div className='row'>
                        <div className='col-md-12'>
                            <h3 className="card-title">Total: ${total-discountAmount}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-lg-2'>
                        <button type="button" className="btn btn-lg btn-primary">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

ShoppingCart.propTypes = {
    discountCodes: PropTypes.array.isRequired,
    cartItems: PropTypes.array.isRequired,
    loadDiscountCodes: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired
};


const mapStateToProps = (state, ownProps) => ({
    discountCodes: state.discountCodes,
    cartItems: state.cartItems,
});

const mapDispatchToProps = {
    loadDiscountCodes: discountCodeActions.loadDiscountCodes,
    clearCart: shoppingCartActions.clearCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
