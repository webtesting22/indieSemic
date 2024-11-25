// Product.jsx
import React from "react";
import IndieSemicProduct from "./indieSemicProduct";
import ProductState from "../Context/State";
const Product = () => {
    return (
        <>
            <ProductState>
                <IndieSemicProduct />
            </ProductState>
        </>
    );
};

export default Product;

