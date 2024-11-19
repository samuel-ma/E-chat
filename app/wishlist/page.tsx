// pages/wishlist.tsx
'use client';

import { useWishlist } from "../components/WishContext";
import { Product } from '../types'; // Import the Product type

const WishlistPage = () => {
  const { wishlistItems } = useWishlist(); // Get wishlist items from the context

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-xl">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {wishlistItems.map((product: Product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              <span className="text-lg font-bold text-gray-800 mb-4">${product.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
