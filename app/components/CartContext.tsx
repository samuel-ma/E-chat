"use client"

// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '../types';

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

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
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
