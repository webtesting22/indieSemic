// ProductContext.jsx
import React, { createContext, useContext } from "react";

// Create the context
const ProductContext = createContext();

// Export the provider so it can be used in other components
export const ProductProvider = ProductContext.Provider;

// Custom hook to use the ProductContext
export const useProductContext = () => useContext(ProductContext);
