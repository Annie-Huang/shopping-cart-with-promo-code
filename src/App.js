import React from 'react';
import './App.css';
// !!!! Don't ever use
// import { ProductList } from "./components/ProductList/ProductList";
// It will failed the build, we need the default one that got connect, not the named one use for testing.
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";

function App() {
    return (
        <div className="container-fluid">
            <h1>Please select your products from below...</h1>
            <ProductList />
            <ShoppingCart/>
        </div>
    );
}

export default App;
