// Centralized product data for API integration

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  detail?: string;
}

export interface FeaturedProduct extends Product {
  description: string;
  rating: number;
  reviews: number;
  features: string[];
}

// Product Carousel Data
export const carouselProducts: Product[] = [
  {
    id: '2',
    name: 'Advanced Cleaning Spray',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1599015588313-ffccd197fe89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VyJTIwY2xlYW5pbmclMjBzcHJheSUyMGJvdHRsZXxlbnwxfHx8fDE3NzUyMjM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sprays',
  },
  {
    id: '3',
    name: 'Professional Brush Set',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1577467013301-3cfafe7079a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwYnJ1c2glMjBwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwxfHx8fDE3NzUyMjM4Njh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Brushes',
  },
  {
    id: '4',
    name: 'Water & Stain Protector',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1626558655328-a10ae4ae1dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwcHJvdGVjdG9yJTIwc3ByYXklMjBwcm9kdWN0fGVufDF8fHx8MTc3NTIyMzg2OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Protectors',
  },
  {
    id: '5',
    name: 'Microfiber Cloth Pack',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1761934658331-2e00b20dc6c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2ZpYmVyJTIwY2xlYW5pbmclMjBjbG90aCUyMHdoaXRlfGVufDF8fHx8MTc3NTIyMzg2OXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Premium Care Bundle',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1774653256680-9ba4f10ca7c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwY2FyZSUyMGFjY2Vzc29yaWVzJTIwcHJlbWl1bXxlbnwxfHx8fDE3NzUyMjM4Njl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cleaning Kits',
  },
];

// Featured Products Data
export const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Premium Sneaker Cleaning Kit',
    description:
      'Our complete cleaning system includes everything you need for professional results. Deep clean, restore, and protect your favorite sneakers with premium, eco-friendly formulas.',
    price: 49.99,
    rating: 4.8,
    reviews: 326,
    image: 'https://images.unsplash.com/photo-1577467014381-aa7c13dbf331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc2hvZSUyMGNsZWFuaW5nJTIwa2l0JTIwYnJ1c2h8ZW58MXx8fHwxNzc1MjIzODY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Cleaning Kits',
    features: [
      'Deep cleaning foam formula',
      'Premium soft & medium bristle brushes',
      'Microfiber cleaning cloth',
      'Safe for leather, suede, canvas & mesh',
      'Eco-friendly & biodegradable ingredients',
      'Professional-grade results at home',
    ],
  },
  {
    id: '7',
    name: 'Professional Brush Collection',
    description:
      'A comprehensive set of specialized brushes designed for every cleaning task. From delicate suede to tough rubber soles, these precision-crafted tools ensure thorough cleaning without damage.',
    price: 34.99,
    rating: 4.9,
    reviews: 217,
    image: 'https://images.unsplash.com/photo-1577466928082-5d4680898ce7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9lJTIwY2xlYW5pbmclMjBicnVzaCUyMHRvb2xzfGVufDF8fHx8MTc3NTIyOTQzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Brushes',
    features: [
      'Soft bristle brush for delicate materials',
      'Medium bristle brush for general cleaning',
      'Stiff bristle brush for tough stains',
      'Detail brush for hard-to-reach areas',
      'Ergonomic grip design',
      'Durable & long-lasting construction',
    ],
  },
  {
    id: '8',
    name: 'Ultimate Protection Spray',
    description:
      'Advanced water and stain repellent technology creates an invisible barrier that keeps your sneakers looking fresh. Perfect for all materials including leather, suede, and canvas.',
    price: 24.99,
    rating: 4.7,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1618349248404-0192cf727a13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwc2hvZSUyMHByb3RlY3RvciUyMHNwcmF5fGVufDF8fHx8MTc3NTIyOTQzOXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Protectors',
    features: [
      'Water & stain repellent formula',
      'Breathable protection layer',
      'Safe for all shoe materials',
      'Long-lasting protection up to 4 weeks',
      'Quick-dry application',
      'No discoloration or residue',
    ],
  },
];

// All products combined for easy access
export const allProducts: Product[] = [
  ...featuredProducts,
  ...carouselProducts,
];
