import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star } from 'lucide-react';
import Image from 'next/image';

const buttonClasses = "bg-[#633cff] hover:bg-[#5232d3] text-white";

// Define the Product type
interface Product {
  id: number;
  title: string;
  handle: string;
  product_type: string;
  images: string[];
  price: number;
  discount?: number;
  rating: number;
}

// Widget 1: Grid Layout
const GridProductWidget = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://australia-southeast1-stepone-backend.cloudfunctions.net/getProductRecommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        // Assign example ratings above 3 stars and random prices if missing
        const updatedData = data.map(product => ({
          ...product,
          price: product.price ?? (Math.random() * 100).toFixed(2),
          rating: Math.max(3, Math.floor(Math.random() * 5) + 1)
        }));
        setProducts(updatedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={product.images[0]} alt={product.title} width={400} height={256} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-sm font-semibold mb-2 truncate">{product.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{product.product_type}</p>
              <div className="flex items-center mb-2">
                <span className="text-lg font-bold">${product.price}</span>
                {product.discount && (
                  <span className="text-sm text-red-500 ml-2">-{product.discount}%</span>
                )}
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <button className={`w-full ${buttonClasses} text-sm py-2 rounded transition duration-200`}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Widget 2: Carousel with Quick View
const CarouselQuickViewWidget = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://australia-southeast1-stepone-backend.cloudfunctions.net/getProductRecommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        const updatedData = data.map(product => ({
          ...product,
          price: product.price ?? (Math.random() * 100).toFixed(2),
          rating: Math.max(3, Math.floor(Math.random() * 5) + 1)
        }));
        setProducts(updatedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextProduct = () => setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  const prevProduct = () => setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);

  if (loading) {
    return <div className="text-center p-4">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <div className="relative overflow-hidden" style={{ height: '400px' }}>
        <div 
          className="flex transition-transform duration-300 ease-in-out absolute top-0 left-0 w-full h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full flex-shrink-0 relative"
            >
              <Image src={product.images[0]} alt={product.title} layout="fill" objectFit="cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{product.title}</h3>
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="bg-white text-black text-sm py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevProduct}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          title="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={nextProduct}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10"
          title="Next product"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <h3 className="text-xl font-semibold mb-4">{quickViewProduct.title}</h3>
            <Image src={quickViewProduct.images[0]} alt={quickViewProduct.title} width={400} height={256} className="w-full h-64 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{quickViewProduct.product_type}</p>
            <div className="flex items-center mb-2">
              <span className="text-lg font-bold">${quickViewProduct.price}</span>
              {quickViewProduct.discount && (
                <span className="text-sm text-red-500 ml-2">-{quickViewProduct.discount}%</span>
              )}
            </div>
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < quickViewProduct.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
              ))}
            </div>
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
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://australia-southeast1-stepone-backend.cloudfunctions.net/getProductRecommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        // Assign example ratings above 3 stars and random prices if missing
        const updatedData = data.map(product => ({
          ...product,
          price: product.price ?? (Math.random() * 100).toFixed(2),
          rating: Math.max(3, Math.floor(Math.random() * 5) + 1)
        }));
        setProducts(updatedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleWishlist = (productId: number) => {
    setWishlist((prevWishlist: number[]) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    );
  };

  if (loading) {
    return <div className="text-center p-4">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
      <div className="flex overflow-x-auto pb-4 -mx-4">
        {products.map((product) => (
          <div key={product.id} className="flex-none w-64 mx-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative">
                <Image src={product.images[0]} alt={product.title} width={400} height={256} className="w-full h-48 object-cover" />
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
                <div className="flex items-center mb-2">
                  <span className="text-lg font-bold">${product.price}</span>
                  {product.discount && (
                    <span className="text-sm text-red-500 ml-2">-{product.discount}%</span>
                  )}
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
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

// Widget 4: Recommended Products Widget
const RecommendedProductsWidget = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://australia-southeast1-stepone-backend.cloudfunctions.net/getProductRecommendations');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        // Assign example ratings above 3 stars and random prices if missing
        const updatedData = data.map(product => ({
          ...product,
          price: product.price ?? (Math.random() * 100).toFixed(2),
          rating: Math.max(3, Math.floor(Math.random() * 5) + 1)
        }));
        setProducts(updatedData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  if (loading) {
    return <div className="text-center p-4">Loading recommendations...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
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
        <div className="flex items-center mb-2">
          <span className="text-lg font-bold">${product.price}</span>
          {product.discount && (
            <span className="text-sm text-red-500 ml-2">-{product.discount}%</span>
          )}
        </div>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
          ))}
        </div>
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