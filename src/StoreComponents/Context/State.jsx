// ProductState.js
import React, { useState, useEffect } from "react";
import ProductContext from "./ProductContext"; // Make sure this is the correct import path

const ProductState = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    let name = "sfhsdafdf"
    useEffect(() => {
        // Fetch products
        const fetchProducts = async () => {
            const response = await fetch("https://testapi.prepseed.com/indieSemic/getAllProducts");
            const data = await response.json();
            setProducts(data.products);
        };

        fetchProducts();

        // Load cart items from localStorage if they exist
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []);

    const addToCart = (product) => {
        // Check if the product is already in the cart
        const existingProduct = cartItems.find(item => item._id === product._id);

        if (!existingProduct) {
            // If the product doesn't exist, add it to the cart
            setCartItems((prevCart) => {
                const updatedCart = [...prevCart, product];
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));  // Save to localStorage
                return updatedCart;
            });
        }
    };
    const removeFromCart = (productId) => {
        const updatedCart = cartItems.filter((item) => item._id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));  // Save to localStorage
    };

    return (
        <ProductContext.Provider value={{ products, cartItems, addToCart, removeFromCart, name }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductState;
