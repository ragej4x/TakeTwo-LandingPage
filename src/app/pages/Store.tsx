import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { ShoppingCart, SlidersHorizontal, ChevronDown, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

// Extended product data for store
const storeProducts = [
  {
    id: '1',
    name: 'Premium Sneaker Cleaning Kit',
    price: 1999.00,
    image: 'https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc2hvZSUyMGNsZWFuaW5nJTIwa2l0JTIwYnJ1c2h8ZW58MXx8fHwxNzc1MjIzODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cleaning Kits',
  },
  {
    id: '2',
    name: 'Advanced Cleaning Spray',
    price: 759.00,
    image: 'https://images.unsplash.com/photo-1599015588313-ffccd197fe89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwY2xlYW5pbmclMjBzcHJheSUyMGJvdHRsZXxlbnwxfHx8fDE3NzUyMjM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sprays',
  },
  {
    id: '3',
    name: 'Professional Brush Set',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1577467013301-3cfafe7079a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwYnJ1c2glMjBwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwxfHx8fDE3NzUyMjM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Brushes',
  },
  {
    id: '4',
    name: 'Water & Stain Protector',
    price: 919.00,
    image: 'https://images.unsplash.com/photo-1626558655328-a10ae4ae1dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwcHJvdGVjdG9yJTIwc3ByYXl8ZW58MXx8fHwxNzc1NjMxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Protectors',
  },
  {
    id: '5',
    name: 'Microfiber Cloth Pack',
    price: 519.00,
    image: 'https://images.unsplash.com/photo-1761934658331-2e00b20dc6c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2ZpYmVyJTIwY2xlYW5pbmclMjBjbG90aCUyMHdoaXRlfGVufDF8fHx8MTc3NTIyMzg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Premium Care Bundle',
    price: 3199.00,
    image: 'https://images.unsplash.com/photo-1774653256680-9ba4f10ca7c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwY2FyZSUyMGFjY2Vzc29yaWVzJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzUyMjM4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cleaning Kits',
  },
  {
    id: '7',
    name: 'Professional Brush Collection',
    price: 1399.00,
    image: 'https://images.unsplash.com/photo-1577466928082-5d4680898ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwY2xlYW5pbmclMjBicnVzaCUyMHRvb2xzfGVufDF8fHx8MTc3NTIyOTQzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Brushes',
  },
  {
    id: '8',
    name: 'Ultimate Protection Spray',
    price: 999.00,
    image: 'https://images.unsplash.com/photo-1618349248404-0192cf727a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwY2FyZSUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc3NTYzMTA2NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Protectors',
  },
  {
    id: '9',
    name: 'Deep Clean Solution',
    price: 849.00,
    image: 'https://images.unsplash.com/photo-1714058995656-b0319bf3dc6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwY2xlYW5pbmclMjBwcm9kdWN0cyUyMGJvdHRsZXN8ZW58MXx8fHwxNzc1NjMxMDY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sprays',
  },
  {
    id: '10',
    name: 'Suede Brush Premium',
    price: 679.00,
    image: 'https://images.unsplash.com/photo-1590156351935-500f39544b27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYnJ1c2hlcyUyMGNsZWFuaW5nJTIwdG9vbHN8ZW58MXx8fHwxNzc1NjMxMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Brushes',
  },
  {
    id: '11',
    name: 'Travel Size Kit',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc2hvZSUyMGNsZWFuaW5nJTIwa2l0JTIwYnJ1c2h8ZW58MXx8fHwxNzc1MjIzODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cleaning Kits',
  },
  {
    id: '12',
    name: 'Precision Cleaning Towels',
    price: 399.00,
    image: 'https://images.unsplash.com/photo-1714058948946-8fc9c3fa6a67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2ZpYmVyJTIwY2xvdGglMjBjbGVhbmluZ3xlbnwxfHx8fDE3NzU2MzEwNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
  },
];

const categories = ['All Products', 'Cleaning Kits', 'Brushes', 'Sprays', 'Protectors', 'Accessories'];
const sortOptions = ['Most Popular', 'Price: Low to High', 'Price: High to Low', 'Newest'];

export function Store() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedSort, setSelectedSort] = useState('Most Popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof storeProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Filter products
  const filteredProducts = storeProducts.filter((product) => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 mt-16 md:mt-20">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <a href="/" className="hover:text-neutral-900 transition-colors">Home</a>
            <span>/</span>
            <span className="text-neutral-900">Store</span>
          </div>
        </div>
      </div>

      {/* Store Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl tracking-tight mb-4"
          >
            <span className="font-light">All </span>
            <span className="font-semibold">Products</span>
          </motion.h1>
          <p className="text-neutral-600 max-w-2xl">
            Premium shoe care products for every need. From cleaning to protection, find everything to keep your sneakers fresh.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - IKEA Style */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-between mb-4 pb-4 border-b border-neutral-200"
              >
                <span className="font-semibold flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-neutral-900">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-neutral-900">Category</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          selectedCategory === category
                            ? 'bg-neutral-900 text-white'
                            : 'text-neutral-600 hover:bg-neutral-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-neutral-900">Price Range</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                      <span className="text-neutral-400">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <button
                      onClick={() => setPriceRange({ min: 0, max: 5000 })}
                      className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      Reset price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-neutral-600">
                <span className="font-semibold text-neutral-900">{sortedProducts.length}</span> products
              </p>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-neutral-600">Sort by:</label>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 bg-white"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid - IKEA Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-white rounded-full flex items-center gap-2 font-medium text-sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
                      {product.category}
                    </div>
                    <h3 className="font-medium text-neutral-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold text-neutral-900">
                        ₱{product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm">
                <p className="text-neutral-600 mb-2">No products found</p>
                <p className="text-sm text-neutral-500">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl tracking-tight mb-4">
                <span className="font-light">TAKE</span>
                <span className="font-semibold">TWO</span>
              </div>
              <p className="text-neutral-400 text-sm max-w-md">
                Premium shoe care products designed for sneaker enthusiasts who
                demand the best. Keep your collection fresh, protected, and
                looking brand new.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Cleaning Kits</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brushes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sprays</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Protectors</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
            <p>© 2026 TAKETWO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}