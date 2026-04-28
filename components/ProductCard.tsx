'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { Eye } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.discount ? Math.round(product.discount) : 0;

  return (
    <>
      <div className="flex flex-col gap-4 group">
        {/* Image Container */}
        <div
          className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Sale Badge */}
          {product.salePrice && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discount}%
            </div>
          )}

          {/* Quick View Button */}
          <button
            onClick={() => setIsQuickViewOpen(true)}
            className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 text-white font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <Eye size={20} />
            Quick View
          </button>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base md:text-lg font-semibold text-black group-hover:text-gray-700 transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-red-600">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-black">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
