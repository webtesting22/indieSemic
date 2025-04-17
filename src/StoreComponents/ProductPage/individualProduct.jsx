// Product.jsx
import React from "react";
import IndieSemicProduct from "./indieSemicProduct";
import ProductState from "../Context/State";
import ProductContext from "../Context/ProductContext";
import SeparateProductPage from "./SeparateProductpage";
import Cart from "../Cart/Cart";
// import SeparateProductPage from "./SeparateProductpage";
const IndividualProduct = () => {
    return (
        <>
            <ProductState>
            {/* <IndieSemicProduct /> */}
                <SeparateProductPage />
               
                {/* <Cart/> */}
            </ProductState>
        </>
    );
};

export default IndividualProduct;

