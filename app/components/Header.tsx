"use client"

import { useCart } from '../components/CartContext';
import { useWishlist } from './WishContext'; 
import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
  const { cartItems } = useCart(); 
  const { wishlistItems } = useWishlist(); // Get wishlist items from WishlistContext

  return (
    <header className="bg-blue-600 text-white py-4 fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-semibold">
          <Link href="/">
            <h1>MyShop</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/products" className="text-white hover:underline">Products</Link>
            </li>
            <li>
              <Link href="/checkout" className="text-white hover:underline">Checkout</Link>
            </li>
            <li>
              <Link href="/cart" className="text-white hover:underline font-bold">
                Cart ({cartItems.length})
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-white hover:underline font-bold">
                Wishlist ({wishlistItems.length}) {/* Display the number of items in the wishlist */}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
