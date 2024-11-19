"use client";
import { useState, useEffect } from 'react';
import { Product } from '../types';
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useWishlist } from './WishContext';
import { useCart } from './CartContext';  // Import CartContext to use addToCart
import Link from 'next/link'; // Import Link from Next.js

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist(); // Get the function to add/remove items from the wishlist
  const { addToCart } = useCart(); // Get the function to add items to the cart
  const [isInWishlist, setIsInWishlist] = useState(false); // Track whether the product is in the wishlist
  const [isAddedToCart, setIsAddedToCart] = useState(false); // Track whether the product has been added to the cart

  // Check if the product is already in the wishlist
  useEffect(() => {
    const isProductInWishlist = wishlistItems.some(item => item.id === product.id);
    setIsInWishlist(isProductInWishlist);
  }, [wishlistItems, product.id]);

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id); // Remove the product from the wishlist
      setIsInWishlist(false); // Update the state to reflect that it's not in the wishlist anymore
    } else {
      addToWishlist(product); // Add the product to the wishlist
      setIsInWishlist(true); // Update the state to reflect that it's now in the wishlist
    }
  };

  // Truncate description to 100 characters
  const truncatedDescription = product.description.length > 100
    ? product.description.slice(0, 100) + '...'
    : product.description;

  // Truncate title to 20 characters
  const truncatedTitle = product.title.length > 20
    ? product.title.slice(0, 20) + '...'
    : product.title;

  // Handle adding to cart
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image, // This should now work since image is in the CartItem type
    });
    setIsAddedToCart(true); // Set the state to indicate the product was added to the cart
  };

  return (
    <div className="bg-transparent rounded-lg p-4 flex flex-col h-full border text-center">
      <div className="flex items-center justify-between pb-2">
        <div className="px-4 p-1 rounded-md text-sm text-white bg-green-500">New</div>
        <div
          className="text-[20px] cursor-pointer"
          onClick={handleToggleWishlist}
        >
          {/* Use filled heart if the product is in the wishlist */}
          {isInWishlist ? <GoHeartFill color="red" /> : <GoHeart color="black" />}
        </div>
      </div>
      {/* Image with zoom effect on hover */}
      <Link href={`/product/${product.id}`} passHref>
        <div className="relative w-full h-64 overflow-hidden mb-4 cursor-pointer">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-top rounded-md transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </Link>
      {/* Truncated Product Name - Clicking also navigates */}
      <Link href={`/product/${product.id}`} passHref>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 w-full text-center cursor-pointer">
          {truncatedTitle}
        </h3>
      </Link>
      {/* Truncated Description - Clicking also navigates */}
      <Link href={`/product/${product.id}`} passHref>
        <div className="flex justify-center items-center h-24">
          <p className="text-gray-600 text-sm flex-1 cursor-pointer text-center">
            {truncatedDescription}
          </p>
        </div>
      </Link>
      {/* Product Price - Clicking also navigates */}
      <Link href={`/product/${product.id}`} passHref>
        <div className="flex justify-center items-center h-16">
          <span className="text-lg font-bold text-gray-800 cursor-pointer">
            ${product.price}
          </span>
        </div>
      </Link>

      <div className="mt-auto">
        <button
          onClick={handleAddToCart}
          className={`inline-block py-2 w-full rounded-lg text-center transition duration-200 ${isAddedToCart ? 'bg-green-500' : 'bg-blue-600'} text-white hover:${isAddedToCart ? 'bg-green-600' : 'bg-blue-700'}`}
        >
          {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
