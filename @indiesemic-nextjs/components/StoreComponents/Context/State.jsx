"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import ProductContext from "./ProductContext";

const ProductState = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const apibaseUrl = "https://napi.prepseed.com";
  const [loadingProducts, setLoadingProducts] = useState(false);
  const fetchingRef = useRef(false); // Track if we're currently fetching
  const hasInitializedRef = useRef(false); // Use ref instead of state
  // const name = "hfsadfhfas";

  const fetchProducts = useCallback(async () => {
    // Prevent multiple simultaneous API calls with multiple checks
    if (fetchingRef.current) {
      console.log("Skipping fetch - already fetching");
      return;
    }

    // Set fetching flag immediately
    fetchingRef.current = true;

    try {
      setLoadingProducts(true);
      console.log("Fetching products..."); // Debug log

      const response = await fetch(`${apibaseUrl}/indieSemic/getAllProducts`);
      const data = await response.json();

      if (data.products && Array.isArray(data.products)) {
        setProducts(data.products);
        console.log(`Loaded ${data.products.length} products`); // Debug log
      } else {
        console.warn("Invalid products data received:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Set empty array on error
    } finally {
      setLoadingProducts(false);
      fetchingRef.current = false; // Reset fetching flag
    }
  }, [apibaseUrl]);

  useEffect(() => {
    // Load cart items from localStorage on mount
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);

    // Auto-fetch products only once on component mount
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item._id === product._id);
    if (!existingProduct) {
      const updatedCart = [...cartItems, product];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
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
