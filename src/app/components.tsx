'use client'

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import Image from 'next/image';

const buttonClasses = "bg-[#633cff] hover:bg-[#5232d3] text-white";

// Widget 1: Grid Layout
const GridProductWidget = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    const fetchedProducts = [
      {
        "id": 6605868728392,
        "title": "Women's Body Shorts - Stone",
        "handle": "womens-body-shorts-boxer-stone",
        "product_type": "Womens Boxer",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1097.jpg?v=1717557980"]
      },
      {
        "id": 6703687434312,
        "title": "Women's Body Shorts - Hot Sauce",
        "handle": "womens-body-shorts-hot-sauce",
        "product_type": "Womens Boxer",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1130.jpg?v=1717594634"]
      },
      {
        "id": 6765280034888,
        "title": "Women's SmoothFit Bikini Brief - Rosé All Day",
        "handle": "womens-smoothfit-bikini-brief-rose-all-day",
        "product_type": "SmoothFit Bikini Brief",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_0811.jpg?v=1717504741"]
      },
      {
        "id": 6780035235912,
        "title": "Trunk - Megalodong",
        "handle": "trunk-megalodong",
        "product_type": "Trunk",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/ECOMM-08copy_e7010446-533d-4889-a397-65c269932bfb.jpg?v=1717504666"]
      }
    ];
    setProducts(fetchedProducts as never);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: {
          id: number
          title: string
          images: string[]
          product_type: string
        }) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2 truncate">{product.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.product_type}</p>
              <button className={`w-full ${buttonClasses} text-sm py-2 rounded transition duration-200`}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}      </div>
    </div>
  );
};

// Widget 2: Carousel with Quick View
const CarouselQuickViewWidget = () => {
  const [products, setProducts] = useState<Array<{
    id: number;
    title: string;
    handle: string;
    product_type: string;
    images: string[];
  }>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<{
    id: number;
    title: string;
    handle: string;
    product_type: string;
    images: string[];
  } | null>(null);

  useEffect(() => {
    const fetchedProducts = [
      {
        "id": 6703687434312,
        "title": "Women's Body Shorts - Hot Sauce",
        "handle": "womens-body-shorts-hot-sauce",
        "product_type": "Womens Boxer",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1130.jpg?v=1717594634"]
      },
      {
        "id": 6765280034888,
        "title": "Women's SmoothFit Bikini Brief - Rosé All Day",
        "handle": "womens-smoothfit-bikini-brief-rose-all-day",
        "product_type": "SmoothFit Bikini Brief",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_0811.jpg?v=1717504741"]
      },
      {
        "id": 6780035235912,
        "title": "Trunk - Megalodong",
        "handle": "trunk-megalodong",
        "product_type": "Trunk",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/ECOMM-08copy_e7010446-533d-4889-a397-65c269932bfb.jpg?v=1717504666"]
      }
    ];
    setProducts(fetchedProducts);
  }, []);

  const nextProduct = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  const prevProduct = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <div className="relative">
        <div className="flex overflow-hidden">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`w-full flex-shrink-0 transition-transform duration-300 ease-in-out ${
                index === currentIndex ? 'translate-x-0' : 'translate-x-full'
              } product-slide`}
            >
              <Image src={product.images[0]} alt={product.title} className="w-full h-64 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="bg-white text-black text-sm py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}        </div>
        <button
          onClick={prevProduct}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          title="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
          title="Next product"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold mb-4">{quickViewProduct.title}</h3>
            <Image src={quickViewProduct.images[0]} alt={quickViewProduct.title} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{quickViewProduct.product_type}</p>
            <div className="flex justify-between">
              <button className={`${buttonClasses} py-2 px-4 rounded transition duration-200`}>
                Add to Cart
              </button>
              <button
                onClick={() => setQuickViewProduct(null)}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Widget 3: Horizontal Scroll with Wishlist
const HorizontalScrollWidget = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const fetchedProducts = [
      {
        "id": 6605868728392,
        "title": "Women's Body Shorts - Stone",
        "handle": "womens-body-shorts-boxer-stone",
        "product_type": "Womens Boxer",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1097.jpg?v=1717557980"]
      },
      {
        "id": 6703687434312,
        "title": "Women's Body Shorts - Hot Sauce",
        "handle": "womens-body-shorts-hot-sauce",
        "product_type": "Womens Boxer",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1130.jpg?v=1717594634"]
      },
      {
        "id": 6765280034888,
        "title": "Women's SmoothFit Bikini Brief - Rosé All Day",
        "handle": "womens-smoothfit-bikini-brief-rose-all-day",
        "product_type": "SmoothFit Bikini Brief",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_0811.jpg?v=1717504741"]
      },
      {
        "id": 6780035235912,
        "title": "Trunk - Megalodong",
        "handle": "trunk-megalodong",
        "product_type": "Trunk",
        "images": ["https://cdn.shopify.com/s/files/1/1853/5335/files/ECOMM-08copy_e7010446-533d-4889-a397-65c269932bfb.jpg?v=1717504666"]
      }
    ];
    setProducts(fetchedProducts as never);
  }, []);

  const toggleWishlist = (productId: number) => {
    setWishlist((prevWishlist: number[]) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
      <div className="flex overflow-x-auto pb-4 -mx-4">
        {products.map((product: {
          id: number;
          images: string[];
          title: string;
          product_type: string;
        }) => (
          <div key={product.id} className="flex-none w-64 mx-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <Image src={product.images[0]} alt={product.title} className="w-full h-48 object-cover" />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
                  title="Toggle wishlist"
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-semibold mb-2 truncate">{product.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{product.product_type}</p>
                <button 
                  className={`w-full ${buttonClasses} text-sm py-2 rounded transition duration-200 flex items-center justify-center`}
                  title="Add to Cart"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface Product {
  id: number;
  title: string;
  handle: string;
  product_type: string;
  images: string[];
}

const RecommendedProductsWidget = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchedProducts: Product[] = [
      {
        "id": 6605868728392,
        "title": "Women's Body Shorts - Stone",
        "handle": "womens-body-shorts-boxer-stone",
        "product_type": "Womens Boxer",
        "images": [
          "https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1097.jpg?v=1717557980",
          "https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1107.jpg?v=1717557965",
          "https://cdn.shopify.com/s/files/1/1853/5335/files/240515_S1_2_WOMANS_1114.jpg?v=1717557988"
        ]
      },
    ];
    setProducts(fetchedProducts);
  }, []);

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
  };

  const addToCart = (productId: number) => {
    console.log(`Added product ${productId} to cart`);
    // Here you would implement the actual add to cart functionality
  };

  if (products.length === 0) {
    return <div className="text-center p-4">Loading recommendations...</div>;
  }

  const product = products[currentIndex];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <Image 
          src={product.images[0]} 
          alt={product.title} 
          width={400}
          height={256}
          className="w-full h-64 object-cover"
        />
        <button 
          onClick={prevProduct} 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          title="Previous product"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={nextProduct} 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
          title="Next product"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.product_type}</p>
        <button 
          onClick={() => addToCart(product.id)}
          className={`w-full ${buttonClasses} py-2 px-4 rounded transition duration-200 flex items-center justify-center`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export { GridProductWidget, CarouselQuickViewWidget, HorizontalScrollWidget, RecommendedProductsWidget };