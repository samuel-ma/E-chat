"use client";

import axios from 'axios';
import { Product } from './types';
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);  // All fetched products
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);  // Tracks currently visible products
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);  // For "show more" loading state

  const [showScrollTop, setShowScrollTop] = useState<boolean>(false); // Tracks if "scroll to top" button should be visible
  const itemsPerPage = 12;
  const totalItemsRequired = 100;  // The total number of items you want to fetch

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let allProducts: Product[] = [];
        // Fetch in batches until we get at least 200 products
        while (allProducts.length < totalItemsRequired) {
          const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
          allProducts = [...allProducts, ...response.data];
        }
        setProducts(allProducts);
        setVisibleProducts(allProducts.slice(0, itemsPerPage));  // Show first 12 items initially
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Failed to fetch products. Please try again later.');
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Add scroll event listener to toggle the visibility of the "scroll to top" button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleShowMore = () => {
    setShowMoreLoading(true);

    // Load next set of products (next 12 items)
    setTimeout(() => {
      setVisibleProducts((prevProducts) => [
        ...prevProducts,
        ...products.slice(prevProducts.length, prevProducts.length + itemsPerPage),
      ]);
      setShowMoreLoading(false);
    }, 500); // Adding a delay to simulate loading time
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4 mt-20 text-center">Welcome to My Store</h1>

      {/* Show loading spinner while products are being fetched */}
      {loading && (
        <div className="flex justify-center items-center py-4">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin-fast"></div>
        </div>
      )}

      {/* Show error message if there is an error */}
      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      {/* Render product list if products are loaded and no error */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {visibleProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>

          {/* Show 'Show More' button if there are more products to load */}
          {visibleProducts.length < products.length && (
            <div className="flex justify-center mt-6">
              <button
                className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-700"
                onClick={handleShowMore}
                disabled={showMoreLoading}
              >
                {showMoreLoading ? 'Loading...' : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          <TbArrowBigUpLinesFilled size={30} />
        </button>
      )}
    </div>
  );
}
