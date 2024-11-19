"use client"

import { useCart } from '../components/CartContext'; // Adjusted import path
import CheckoutButton from '../components/CheckoutButton'; // Correct import for the button
import { CartItem } from '../types';  // Import the CartItem type instead of Product

export default function CheckoutPage() {
  const { cartItems } = useCart();

  // If the cart is empty, display a message
  if (cartItems.length === 0) {
    return <div>Your cart is empty. Please add items to proceed to checkout.</div>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        {/* Map over cart items and render them */}
        {cartItems.map((item: CartItem) => (  // Use CartItem type for the items in cart
          <div key={item.id} className="border-b border-gray-300 py-4">
            <h3 className="text-xl">{item.name}</h3>
            <span className="text-lg">${item.price}</span>
          </div>
        ))}
      </div>
      <CheckoutButton /> {/* Checkout button to finalize purchase */}
    </div>
  );
}
