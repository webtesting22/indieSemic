import React, { useState, useEffect } from "react";
import ProductContext from "./ProductContext";

const ProductState = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const apibaseUrl = import.meta.env.VITE_BASE_URL;
    const [loadingProducts, setLoadingProducts] = useState(false);
    // const name = "hfsadfhfas";

    useEffect(() => {
        // Only load cart items from localStorage
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    const fetchProducts = async () => {
        if (products.length > 0) return; // Don't fetch again if already fetched

        try {
            setLoadingProducts(true);
            const response = await fetch(`${apibaseUrl}/indieSemic/getAllProducts`);
            const data = await response.json();
            setProducts(data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoadingProducts(false);
        }
    };

    const addToCart = (product) => {
        const existingProduct = cartItems.find(item => item._id === product._id);
        if (!existingProduct) {
            const updatedCart = [...cartItems, product];
            setCartItems(updatedCart);
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }
    };

    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                cartItems,
                addToCart,
                removeFromCart,
                fetchProducts,
                loadingProducts,
                // name,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export default ProductState;
