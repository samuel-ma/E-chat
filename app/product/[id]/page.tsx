"use client";

import { useState, useEffect } from 'react';
import { TbHeart, TbShoppingCart } from 'react-icons/tb';
import Image from 'next/image';
import { Product } from '../../types';
import { useCart } from '../../components/CartContext'; // Import Cart context
import { useWishlist } from '../../components/WishContext'; // Import Wishlist context
import ProductCard from '../../components/ProductCard';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);

  const { addToCart, cartItems } = useCart(); // Access cart context
  const { addToWishlist, wishlistItems } = useWishlist(); // Access wishlist context

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!res.ok) {
            throw new Error('Product not found.');
          }
          const productData = await res.json();
          setProduct(productData);

          const similarProductsRes = await fetch(
            `https://fakestoreapi.com/products/category/${productData.category}`
          );
          const similarProductsData = await similarProductsRes.json();
          setRecommendedProducts(
            similarProductsData.filter((item: Product) => item.id !== Number(id)).slice(0, 4)
          );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchProduct();
    }
  }, [id]);

  const isProductInCart = cartItems.some(item => item.id === product?.id);
  const isProductInWishlist = wishlistItems.some(item => item.id === product?.id);

  const handleAddToWishlist = (product: Product) => {
    if (!isProductInWishlist) {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!isProductInCart) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => history.back()}
            className="py-3 px-6 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-6 text-gray-600">No product found.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto py-8">
        <div className="mt-16 grid grid-cols-1 border md:grid-cols-2 gap-6 bg-white rounded-lg p-4">
          <div>
            <Image
              src={product.image}
              alt={product.title || 'Product image'}
              width={360}
              height={360}
              className="rounded-lg border"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold my-4 pb-4 border-b">{product.title}</h1>
            <p className="text-gray-600 text-sm leading-8 mb-6">{product.description}</p>
            <p className="text-2xl text-center font-semibold text-green-600 mb-6">${product.price}</p>

            {/* Wishlist and Cart buttons */}
            <div className="flex gap-4 justify-center mb-6">
              <button
                onClick={() => handleAddToWishlist(product)}
                className={`flex items-center gap-2 px-6 py-2 text-sm rounded-lg border ${
                  isProductInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <TbHeart
                  className={`text-xl ${isProductInWishlist ? 'text-white' : 'text-gray-700'}`}
                />
                {isProductInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className={`flex items-center gap-2 px-6 py-2 text-sm rounded-lg border ${
                  isProductInCart ? 'bg-black text-white' : 'bg-white text-gray-700 border-gray-300'
                }`}
              >
                <TbShoppingCart
                  className={`text-xl ${isProductInCart ? 'text-white' : 'text-gray-700'}`}
                />
                {isProductInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
            </div>

            <button
              onClick={() => history.back()}
              className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
