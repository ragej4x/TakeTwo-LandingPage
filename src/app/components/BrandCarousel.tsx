import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BrandCarousel() {
  // Brand logos (using images that represent the brands)
  const brands = [
    {
      name: 'Nike',
      image: 'https://images.unsplash.com/photo-1629212537116-151e8fb7469f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwbG9nbyUyMGJyYW5kfGVufDF8fHx8MTc3NTIwMjI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Adidas',
      image: 'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZGlkYXMlMjBsb2dvJTIwYnJhbmR8ZW58MXx8fHwxNzc1MjI5NDQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Puma',
      image: 'https://images.unsplash.com/photo-1758499535896-7be3b226d854?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1hJTIwbG9nbyUyMGJyYW5kfGVufDF8fHx8MTc3NTIyOTQ0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Jordan',
      image: 'https://images.unsplash.com/photo-1593081891731-fda0877988da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb3JkYW4lMjBicmFuZCUyMGxvZ298ZW58MXx8fHwxNzc1MjI5NDQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'New Balance',
      image: 'https://images.unsplash.com/photo-1607702648223-d0c66d38bea3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjBiYWxhbmNlJTIwYnJhbmQlMjBsb2dvfGVufDF8fHx8MTc3NTIyOTQ0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Vans',
      image: 'https://images.unsplash.com/photo-1765062165354-c93420f0d8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5zJTIwbG9nbyUyMGJyYW5kfGVufDF8fHx8MTc3NTIyOTQ0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-12 md:py-16 bg-white border-t border-neutral-200 overflow-hidden">
      <div className="mb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm uppercase tracking-wider text-neutral-500 font-medium"
        >
          PARTNERSHIP
        </motion.p>
      </div>

      {/* Infinite Scrolling Carousel */}
      <div className="relative">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Container */}
        <motion.div
          className="flex gap-12 md:gap-16"
          animate={{
            x: [0, -1920], // Adjust based on total width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
        >
          {duplicatedBrands.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: '160px', height: '80px' }}
            >
              <div className="relative w-full h-full flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                <ImageWithFallback
                  src={brand.image}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
