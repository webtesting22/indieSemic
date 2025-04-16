// ProductState.jsx
import React, { useState, useEffect } from "react";
import { ProductProvider } from "./ProductContext";  // Correct import

const ProductState = ({ children }) => {
    const [products, setProducts] = useState([]); // State for products

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:4040/api/indieSemic/getAllProducts");
                const data = await response.json();
                setProducts(data);
                // console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <ProductProvider value={{ products }}>
            {children}
        </ProductProvider>
    );
};

export default ProductState;
