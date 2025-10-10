"use client";

// Product.jsx
import React from "react";
import ProductState from "../Context/State";
import SeparateProductPage from "./SeparateProductpage";
const IndividualProduct = () => {
    return (
        <>
            <ProductState>
                <SeparateProductPage />
            </ProductState>
        </>
    );
};

export default IndividualProduct;

