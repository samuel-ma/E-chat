'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '../../types';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);

  // Unwrap params with React.use() to get the id
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id); // Access id after unwrapping
    };

    unwrapParams();
  }, [params]);

  // Fetch product details and recommendations
  useEffect(() => {
    if (id) {
      async function fetchProduct() {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error('Product not found. It may have been removed.');
            } else {
              throw new Error('An unexpected error occurred while fetching product details.');
            }
          }
          const productData = await res.json();
          setProduct(productData);

          // Fetch similar products based on category
          const similarProductsRes = await fetch(`https://fakestoreapi.com/products/category/${productData.category}`);
          const similarProductsData = await similarProductsRes.json();
          setRecommendedProducts(similarProductsData.slice(0, 4)); // Only show 4 items
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          setError(error.message);
        }
      }

      fetchProduct();
    }
  }, [id]);

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
          <p className="text-lg mb-6">{error}</p>
          <button
            onClick={() => history.back()}
            className="py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  // Ensure alt text is passed and is valid
  const altText = product.name || 'Product image';

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={altText} // Ensure alt text is passed here
            width={500}
            height={500}
            className="rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0 md:ml-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price}</p>
          <button
            onClick={() => history.back()}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Back to Products
          </button>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {recommendedProducts.length > 0 ? (
            recommendedProducts.map((recommendedProduct) => (
              <div key={recommendedProduct.id} className="bg-white shadow-md rounded-lg p-6">
                <Image
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name || 'Recommended product image'}
                  width={300}
                  height={300}
                  className="rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{recommendedProduct.name}</h3>
                <p className="text-lg text-gray-600 mb-2">{recommendedProduct.description}</p>
                <p className="text-xl font-semibold text-gray-900">${recommendedProduct.price}</p>
                <button
                  onClick={() => window.location.href = `/products/${recommendedProduct.id}`}
                  className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  View Product
                </button>
              </div>
            ))
          ) : (
            <p>No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
