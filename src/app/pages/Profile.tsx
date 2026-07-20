import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { User, MapPin, Mail, Phone, Edit2, Save } from 'lucide-react';
import { motion } from 'motion/react';

interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  zipCode: string;
  isDefault: boolean;
}

export function Profile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: 'Juan Dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 912 345 6789',
  });

  const [tempProfile, setTempProfile] = useState(profile);

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      fullName: 'Juan Dela Cruz',
      phone: '+63 912 345 6789',
      street: '123 Rizal Street, Brgy. San Miguel',
      city: 'Manila',
      province: 'Metro Manila',
      zipCode: '1005',
      isDefault: true,
    },
  ]);

  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    label: '',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    province: '',
    zipCode: '',
    isDefault: false,
  });

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setIsEditingProfile(false);
  };

  const handleCancelProfile = () => {
    setTempProfile(profile);
    setIsEditingProfile(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.fullName || !newAddress.street || !newAddress.city) {
      alert('Please fill in all required fields');
      return;
    }

    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
    };

    if (address.isDefault) {
      setAddresses((prev) =>
        prev.map((addr) => ({ ...addr, isDefault: false }))
      );
    }

    setAddresses((prev) => [...prev, address]);
    setNewAddress({
      label: '',
      fullName: '',
      phone: '',
      street: '',
      city: '',
      province: '',
      zipCode: '',
      isDefault: false,
    });
    setIsAddingAddress(false);
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 mt-16 md:mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <a href="/" className="hover:text-neutral-900 transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-neutral-900">Profile</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Information
            </h2>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelProfile}
                  className="px-4 py-2 text-sm border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={isEditingProfile ? tempProfile.name : profile.name}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, name: e.target.value })
                }
                disabled={!isEditingProfile}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                type="email"
                value={isEditingProfile ? tempProfile.email : profile.email}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, email: e.target.value })
                }
                disabled={!isEditingProfile}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone
              </label>
              <input
                type="tel"
                value={isEditingProfile ? tempProfile.phone : profile.phone}
                onChange={(e) =>
                  setTempProfile({ ...tempProfile, phone: e.target.value })
                }
                disabled={!isEditingProfile}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 disabled:bg-neutral-50 disabled:text-neutral-600"
              />
            </div>
          </div>
        </motion.div>

        {/* Addresses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Delivery Addresses
            </h2>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              + Add Address
            </button>
          </div>

          {/* Add Address Form */}
          {isAddingAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 border border-neutral-200 rounded-lg"
            >
              <h3 className="font-medium mb-4">New Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Address Label (e.g., Home, Office)"
                  value={newAddress.label}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, label: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={newAddress.fullName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, fullName: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Street Address *"
                  value={newAddress.street}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, street: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  placeholder="City *"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Province"
                  value={newAddress.province}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, province: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="setDefault"
                    checked={newAddress.isDefault}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        isDefault: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-neutral-300"
                  />
                  <label htmlFor="setDefault" className="text-sm">
                    Set as default address
                  </label>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 text-sm border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  className="px-4 py-2 text-sm bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Save Address
                </button>
              </div>
            </motion.div>
          )}

          {/* Address List */}
          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-4 border rounded-lg ${
                  address.isDefault
                    ? 'border-neutral-900 bg-neutral-50'
                    : 'border-neutral-200'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{address.label}</h3>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 text-xs bg-neutral-900 text-white rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">
                      {address.fullName}
                    </p>
                    <p className="text-sm text-neutral-600">{address.phone}</p>
                  </div>
                  <div className="flex gap-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="text-xs text-neutral-600 hover:text-neutral-900 underline"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-neutral-700">{address.street}</p>
                <p className="text-sm text-neutral-700">
                  {address.city}, {address.province} {address.zipCode}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
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
                demand the best.
              </p>
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
