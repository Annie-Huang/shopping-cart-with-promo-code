import React from 'react';
import './App.scss';
// !!!! Don't ever use
// import { ProductList } from "./components/ProductList/ProductList";
// It will failed the build, we need the default one that got connect, not the named one use for testing.
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {
    return (
        <div className="container-fluid">
            <h1>Please select your products from below...</h1>
            <div className="scss-warning">Test SASS Configure</div>
            <ProductList />
            <ShoppingCart/>
        </div>
    );
};

export default App;
