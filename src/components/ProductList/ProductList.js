import React,  { useEffect } from 'react';
import {connect} from 'react-redux';
import * as productActions from "../../redux/actions/productActions";
import PropTypes from 'prop-types';

export const ProductList = ({
    products,
    loadProducts
}) => {
    useEffect(() => {
        loadProducts().catch(error => {
            alert("Loading courses failed" + error);
        });
    }, []);

    return (
        <div>
            products.size: {products.length}
        </div>
    );
};

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    loadProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    products: state.products,
});

const mapDispatchToProps = {
    loadProducts: productActions.loadProducts
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductList);
