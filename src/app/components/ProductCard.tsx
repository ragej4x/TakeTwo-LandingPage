import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex-shrink-0"
      style={{ width: 'calc(100% - 16px)', maxWidth: '280px' }}
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <motion.button
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-neutral-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-900" />
          </motion.div>
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="text-xs uppercase tracking-wider text-neutral-500">
          {product.category}
        </div>
        <h3 className="text-base font-medium text-neutral-900 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-semibold text-neutral-900">
            ₱{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}