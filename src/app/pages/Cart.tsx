import { Navigation } from '../components/Navigation';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  const shippingFee = getTotalPrice() >= 2000 ? 0 : 150;
  const totalWithShipping = getTotalPrice() + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navigation />
        
        <div className="bg-white border-b border-neutral-200 mt-16 md:mt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <a href="/" className="hover:text-neutral-900 transition-colors">Home</a>
              <span>/</span>
              <span className="text-neutral-900">Cart</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-12 text-center"
          >
            <ShoppingBag className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">Add some products to get started!</p>
            <Link
              to="/store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 mt-16 md:mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <a href="/" className="hover:text-neutral-900 transition-colors">Home</a>
            <span>/</span>
            <span className="text-neutral-900">Cart</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold mb-2"
        >
          Shopping Cart
        </motion.h1>
        <p className="text-neutral-600 mb-8">{getTotalItems()} items in your cart</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-4 flex gap-4"
              >
                <div className="w-24 h-24 flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-neutral-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4 text-neutral-600" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-neutral-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">
                        ₱{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-neutral-500">
                        ₱{item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">₱{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `₱${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-semibold text-lg">
                  ₱{totalWithShipping.toFixed(2)}
                </span>
              </div>

              {shippingFee > 0 && (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600">
                  Add ₱{(2000 - getTotalPrice()).toFixed(2)} more to get free shipping!
                </div>
              )}

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/store"
                className="block text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
