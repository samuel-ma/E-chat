"use client";

// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types'; // Ensure CartItem type is correctly imported

// Define the context type
interface CartContextType {
  cartItems: CartItem[];
  removeFromCart: (id: number) => void;
  addToCart: (item: CartItem) => void;
}

// Create the context with a default value of `undefined`
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Function to remove an item from the cart by its ID
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      // Check if the item is already in the cart
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems; // If already in cart, return without adding again
      }
      return [...prevItems, item]; // Add new item to the cart
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, removeFromCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
