"use client"

import { useCart } from '../components/CartContext'; // Adjusted import path
import CheckoutButton from '../components/CheckoutButton'; // Correct import for the button
import { CartItem } from '../types';  // Import the CartItem type instead of Product
import Image from 'next/image';
import Checkout from "../../public/opps.svg";

export default function CheckoutPage() {
  const { cartItems } = useCart();

  // If the cart is empty, display a message
  if (cartItems.length === 0) {
    return <div className='flex items-center justify-center flex-col mt-20'>
                <Image 
                    src={Checkout}
                    alt="emptycart"
                    width={400}
                    height={400}
                    className='object-center object-contain'
                />
            <div>Your cart is empty. Please add items to proceed to checkout.</div>
        </div>
  }

  return (
    <div className='mt-20'>
      <h1>Checkout</h1>
      <div>
        {/* Map over cart items and render them */}
        {cartItems.map((item: CartItem) => (  // Use CartItem type for the items in cart
          <div key={item.id} className="border-b border-gray-300 py-4">
            <h3 className="text-xl">{item.title}</h3>
            <span className="text-lg">${item.price}</span>
          </div>
        ))}
      </div>
      <CheckoutButton /> {/* Checkout button to finalize purchase */}
    </div>
  );
}
