import React,  { useEffect } from 'react';
import {connect} from 'react-redux';
import * as productActions from "../redux/actions/productActions";
import * as shoppingCartActions from "../redux/actions/shoppingCartActions";
import PropTypes from 'prop-types';

export const ProductList = ({
    products,
    loadProducts,
    updateItemInCart
}) => {
    useEffect(() => {
        loadProducts().catch(error => {
            alert("Loading products failed" + error);
        });
    }, [loadProducts]);

    const children = products.map(product =>
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
                        onClick={() => updateItemInCart({product, quantity: 1})}
                >
                    Add 1 item
                </button>
                &nbsp;&nbsp;
                {product.productInCart &&
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => updateItemInCart({product, quantity: -1})}
                >
                    Remove 1 item
                </button>
                }
            </div>
        </div>
    );

    return (
        <>
            <div className="card-deck">
                {children}
            </div>
            <br/>
        </>
    )
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    loadProducts: PropTypes.func.isRequired,
    updateItemInCart: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    products: state.products,
});

const mapDispatchToProps = {
    loadProducts: productActions.loadProducts,
    updateItemInCart: shoppingCartActions.updateItemInCart
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
