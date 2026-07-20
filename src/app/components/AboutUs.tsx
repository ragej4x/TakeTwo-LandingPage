import { motion } from 'motion/react';

export function AboutUs() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-neutral-900 tracking-tight mb-4">
            About <span className="font-light">TAKETWO</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about keeping your sneakers in pristine condition.
            Since 2018, we've been developing premium shoe care solutions that
            deliver professional results at home.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-neutral-50 rounded-3xl p-8 md:p-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
              Born from a love of sneakers and frustration with harsh cleaning
              products, TAKETWO was created to bridge the gap between
              professional shoe care and everyday convenience. Our founder, a
              lifelong sneaker collector, spent years perfecting formulas that
              clean deeply without damaging delicate materials.
            </p>
            <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
              Today, we're proud to serve thousands of sneaker enthusiasts who
              trust us to keep their collections looking fresh, protected, and
              ready to wear.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}