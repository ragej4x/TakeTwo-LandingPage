import { motion } from 'motion/react';
import { ShoppingCart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedProductProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    features: string[];
  };
}

export function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 shadow-lg"
          >
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium">
              Featured
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-neutral-900 text-neutral-900'
                        : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 tracking-tight">
                {product.name}
              </h2>
              <p className="mt-4 text-base md:text-lg text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-neutral-700"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="pt-4 space-y-4">
              <div className="text-3xl md:text-4xl font-semibold text-neutral-900">
                ₱{product.price.toFixed(2)}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-8 py-4 bg-neutral-900 text-white rounded-full flex items-center justify-center gap-3 hover:bg-neutral-800 transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Add to Cart</span>
              </motion.button>

              <p className="text-xs text-neutral-500">
                Free shipping on orders over ₱2,000 • 30-day money-back guarantee
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}