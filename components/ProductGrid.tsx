'use client';

import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-black text-balance">
            FEATURED SWEATERS
          </h2>
          <p className="text-gray-600 text-lg mt-4">
            Discover our handpicked collection of premium embroidered pieces
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button className="px-12 py-4 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300 rounded-none text-lg">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </div>
    </section>
  );
}
