'use client';

import Image from "next/image";
import { useWishlist } from "../components/WishContext";
import { Product } from '../types'; // Import the Product type
import Surprise from "../../public/surprise.svg";
import Link from 'next/link'; // Import Link for navigation

const WishlistPage = () => {
  const { wishlistItems } = useWishlist(); // Get wishlist items from the context

  // Truncate description to 100 characters
  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + '...' : text;
  };

  return (
    <div className="container mx-auto p-4">
      {wishlistItems.length === 0 ? (
        <div>
          <div className="flex items-center justify-center mt-20">
            <Image 
              src={Surprise}
              alt="emptycart"
              width={400}
              height={400}
              className='object-center object-contain'
            />
          </div>
          <p className="text-center">Your wishlist is empty :(</p>
        </div>
      ) : (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {wishlistItems.map((product: Product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg border flex flex-col h-full">
              <div className="relative w-full h-64 overflow-hidden mb-4 cursor-pointer">
                <Link href={`/product/${product.id}`} passHref>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover object-top rounded-md transform transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </Link>
              </div>

              <div className="flex flex-col justify-between flex-grow">
                {/* Truncated Product Title */}
                <Link href={`/product/${product.id}`} passHref>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center cursor-pointer">
                    {truncateText(product.title, 20)}
                  </h3>
                </Link>

                {/* Truncated Product Description */}
                <Link href={`/product/${product.id}`} passHref>
                  <p className="text-gray-600 text-sm text-center cursor-pointer mb-4">
                    {truncateText(product.description, 100)}
                  </p>
                </Link>

                {/* Product Price */}
                <div className="flex justify-center items-center h-16 mb-4">
                  <span className="text-lg font-bold text-gray-800">
                    ${product.price}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="mt-auto">
                <button
                  className="inline-block py-2 w-full rounded-lg text-center transition duration-200 bg-transparent text-black border hover:text-white hover:bg-blue-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
