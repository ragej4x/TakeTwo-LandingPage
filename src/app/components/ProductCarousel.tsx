import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  detail?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];
  const total = products.length;

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current === 0 ? total - 1 : current - 1));
  };

  // Calculates the relative position of each item so the active item is always the "second left"
  const getRelativePosition = (index: number) => {
    let diff = index - activeIndex;
    
    // Smooth array wrapping logic
    if (diff > Math.floor(total / 2)) diff -= total;
    if (diff < -Math.floor(total / 2)) diff += total;
    
    return diff;
  };

  // Maps the relative position to visual styling (left %, scale, opacity)
  const getVariants = (diff: number) => {
    const base = { y: "-50%" }; // Keeps elements vertically centered
    
    switch (diff) {
      case -2: // Hidden left
        return { ...base, left: "-20%", scale: 0.5, opacity: 0, zIndex: 0 };
      case -1: // First item (Leftmost, visible)
        return { ...base, left: "5%", scale: 0.85, opacity: 0.6, zIndex: 1 };
      case 0:  // Second item (Active, Highlighted)
        return { ...base, left: "38%", scale: 1.55, opacity: 1, zIndex: 20 };
      case 1:  // Third item (Rightmost, visible)
        return { ...base, left: "71%", scale: 0.85, opacity: 0.6, zIndex: 1 };
      case 2:  // Hidden right
        return { ...base, left: "100%", scale: 0.5, opacity: 0, zIndex: 0 };
      default: // Fallback for larger arrays
        return { ...base, left: "38%", scale: 0, opacity: 0, zIndex: 0 };
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#f8f8f9] min-h-screen flex flex-col justify-center font-serif overflow-hidden">
      
      {/* Main Title */}
      <div className="max-w-7xl mx-auto w-full mb-12 lg:mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 text-center"
        >
          Deodorizer Disinfectant Spray<br />Collection
        </motion.h1>
      </div>

      {/* Side-by-Side Layout Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Left Side: The Image Carousel */}
        <div className="w-full lg:w-[60%] relative h-[400px] md:h-[500px] flex items-center group">
          
          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute left-[-10px] md:left-2 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-neutral-600 hover:text-neutral-900 hover:scale-110 transition-all border border-neutral-100"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-[-10px] md:right-2 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-neutral-600 hover:text-neutral-900 hover:scale-110 transition-all border border-neutral-100"
          >
            <ChevronRight size={24} />
          </button>

          {/* Rotating Images Track */}
          <div className="relative w-full h-full overflow-hidden mx-12">
            {products.map((product, index) => {
              const diff = getRelativePosition(index);
              
              return (
                <motion.div
                  key={product.id}
                  animate={getVariants(diff)}
                  transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.8 }}
                  className={`absolute top-1/2 ${
                    diff === 0
                      ? 'w-[44%] md:w-[38%] max-w-[260px]'
                      : 'w-[28%] md:w-[25%] max-w-[180px]'
                  } aspect-[3/4] shadow-2xl bg-white cursor-pointer origin-center`}
                  onClick={() => setActiveIndex(index)}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Product Description */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center px-4 md:px-8 h-[250px] lg:h-auto text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center lg:items-start"
            >
              <span className="text-sm uppercase tracking-widest text-neutral-500 font-sans font-semibold mb-4">
                {activeProduct.category || "Featured Book"}
              </span>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-neutral-900 mb-8 leading-tight">
                {activeProduct.name}
              </h2>
              
              {activeProduct.detail && (
                <div className="mb-3 text-sm text-neutral-500">
                  {activeProduct.detail}
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-6 font-sans">
                <button className="px-8 py-3 bg-[#f0eaff] text-[#6b4cff] font-semibold rounded hover:bg-[#e4dbff] transition-colors duration-200">
                  Add to Cart
                </button>
                <span className="text-lg text-neutral-600 font-medium">
                  Price - ₱{activeProduct.price.toFixed(2)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}