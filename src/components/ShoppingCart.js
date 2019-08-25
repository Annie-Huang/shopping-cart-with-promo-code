import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as discountCodeActions from "../redux/actions/discountCodeActions";

export const ShoppingCart  = ({
    discountCodes,
    loadDiscountCodes
}) => {
    useEffect(() => {
        loadDiscountCodes().catch(error => {
            alert("Loading discount codes failed" + error);
        });
    }, [loadDiscountCodes]);

    const children = discountCodes.map(discountCode =>
        <div key={discountCode.id}>{discountCode.id} : {discountCode.description}</div>
    );

    return (
        <div>
            {children}
        </div>
    );
};

ShoppingCart.propTypes = {
    discountCodes: PropTypes.array.isRequired,
    loadDiscountCodes: PropTypes.func.isRequired
};


const mapStateToProps = (state, ownProps) => ({
    discountCodes: state.discountCodes,
});

const mapDispatchToProps = {
    loadDiscountCodes: discountCodeActions.loadDiscountCodes
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingCart);
