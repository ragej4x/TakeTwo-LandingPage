import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { FeaturedProduct } from '../components/FeaturedProduct';
import { ProductCarousel } from '../components/ProductCarousel';
import { AboutUs } from '../components/AboutUs';
import { BrandCarousel } from '../components/BrandCarousel';
import { featuredProducts, carouselProducts } from '../data/products';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <FeaturedProduct product={featuredProducts[0]} />
      <FeaturedProduct product={featuredProducts[1]} />
      <ProductCarousel products={carouselProducts} />
      <FeaturedProduct product={featuredProducts[2]} />
      <AboutUs />
      <BrandCarousel />

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12 px-4 sm:px-6 lg:px-8">
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
