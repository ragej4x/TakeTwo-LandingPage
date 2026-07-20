import { useState } from 'react';
import { ShoppingCart, Menu, X, User, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = getTotalItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl md:text-2xl tracking-tight cursor-pointer"
            >
              <span className="font-light">TAKE</span>
              <span className="font-semibold">TWO</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[{ to: "/store", label: "Store" }, { to: "/dropoff", label: "Drop-off" }].map(({ to, label }) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  to={to}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200 relative group"
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-200 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Cart & Profile & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Track Orders Icon */}
            <Link to="/orders">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                aria-label="Track orders"
              >
                <ClipboardList className="w-5 h-5 text-neutral-700" />
              </motion.button>
            </Link>

            {/* Profile Icon */}
            <Link to="/profile">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                aria-label="Profile"
              >
                <User className="w-5 h-5 text-neutral-700" />
              </motion.button>
            </Link>

            {/* Cart Icon */}
            <Link to="/cart">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5 text-neutral-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-900 text-white text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-neutral-700" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-neutral-200 bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              <Link
                to="/store"
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Store
              </Link>
              <Link
                to="/dropoff"
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Drop-off
              </Link>
              <Link
                to="/orders"
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Orders
              </Link>
              <Link
                to="/profile"
                className="block py-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}