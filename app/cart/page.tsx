"use client";

import Image from 'next/image';
import { useCart } from '../components/CartContext'; // Correct import
import Link from 'next/link'; // Correct import for Next.js Link
import { CartItem } from '../types'; // Import CartItem type
import Cart from "../../public/empty-cart.svg";

export default function CartPage() {
  // Get the cart items and the removeFromCart function from context
  const { cartItems, removeFromCart } = useCart();

  // If there are no items in the cart
  if (cartItems.length === 0) {
    return <div className='flex items-center flex-col justify-center container mx-auto text-center mt-20'>
        <Image 
            src={Cart}
            alt="emptycart"
            width={400}
            height={400}
            className='object-center object-contain'
        />
        <div className="text-lg">Your cart is empty :(</div>
    </div>
  }

  return (
    <div className="container mx-auto p-4 mt-16">
      {/* Cart Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full table-auto text-left text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-4 px-6 text-lg font-semibold">Product</th>
              <th className="py-4 px-6 text-lg font-semibold">Price</th>
              <th className="py-4 px-6 text-lg font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item: CartItem) => (
              <tr key={item.id} className="border-b border-gray-200">
                <td className="py-4 px-6 flex items-center space-x-4">
                  {/* Small Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <span className="text-lg">{item.title}</span>
                </td>
                <td className="py-4 px-6 text-lg">${item.price}</td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Checkout Link */}
      <div className="mt-8 text-center">
        <Link
          href="/checkout"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
