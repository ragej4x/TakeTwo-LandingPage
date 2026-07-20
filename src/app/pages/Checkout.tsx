import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, CreditCard, Package, CheckCircle } from 'lucide-react';

export function Checkout() {
  const { items, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const shippingFee = getTotalPrice() >= 2000 ? 0 : 150;
  const totalWithShipping = getTotalPrice() + shippingFee;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: 'Juan Dela Cruz',
    phone: '+63 912 345 6789',
    street: '123 Rizal Street, Brgy. San Miguel',
    city: 'Manila',
    province: 'Metro Manila',
    zipCode: '1005',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleConfirmOrder = () => {
    setStep(2);
  };

  const handleProceedToPayment = () => {
    setStep(3);
  };

  const handleCompletePayment = () => {
    // Clear cart and redirect
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (items.length === 0 && step !== 3) {
    navigate('/cart');
    return null;
  }

  // Payment Success Screen
  if (step === 3) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-12 max-w-md text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
          <p className="text-neutral-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <p className="text-sm text-neutral-500">
            Redirecting to homepage...
          </p>
        </motion.div>
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
            <a href="/cart" className="hover:text-neutral-900 transition-colors">Cart</a>
            <span>/</span>
            <span className="text-neutral-900">Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold mb-8"
        >
          {step === 1 ? 'Checkout' : 'Confirm & Pay'}
        </motion.h1>

        {/* Step 1: Shipping & Review */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.fullName}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, phone: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.street}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, street: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, city: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Province
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.province}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, province: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.zipCode}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, zipCode: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Order Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items ({items.length})
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-neutral-100 last:border-0">
                      <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₱{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
                  <span className="font-semibold text-lg">₱{totalWithShipping.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="w-full px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Continue to Payment
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* Step 2: Confirmation & Payment */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Order Confirmation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </h3>
                    <p className="text-sm text-neutral-700">{shippingInfo.fullName}</p>
                    <p className="text-sm text-neutral-700">{shippingInfo.phone}</p>
                    <p className="text-sm text-neutral-700">{shippingInfo.street}</p>
                    <p className="text-sm text-neutral-700">
                      {shippingInfo.city}, {shippingInfo.province} {shippingInfo.zipCode}
                    </p>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-neutral-600 hover:text-neutral-900 underline mt-2"
                    >
                      Edit address
                    </button>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Order Items
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-neutral-700">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-medium">
                            ₱{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Credit / Debit Card</p>
                      <p className="text-xs text-neutral-500">Visa, Mastercard, etc.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="gcash"
                      checked={paymentMethod === 'gcash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">GCash</p>
                      <p className="text-xs text-neutral-500">E-wallet payment</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-neutral-200 rounded-lg cursor-pointer hover:border-neutral-400 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-xs text-neutral-500">Pay when you receive</p>
                    </div>
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
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
                  <span className="font-semibold text-lg">₱{totalWithShipping.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCompletePayment}
                  className="w-full px-6 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors mb-3"
                >
                  Complete Payment
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Back to Shipping
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
