'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="mx-auto w-full max-w-none px-4 md:px-6 lg:px-10 2xl:px-14">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-black text-balance">
            FEATURED SWEATERS
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link
            href="/products"
            className="px-12 py-4 border-2 border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-300 rounded-none text-lg"
          >
            VIEW ALL PRODUCTS
          </Link>
        </div>
      </div>
    </section>
  );
}
