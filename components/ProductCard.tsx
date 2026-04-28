'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { ShoppingCart } from 'lucide-react';
import { QuickViewModal } from './QuickViewModal';
import { useCurrency } from '@/hooks/useCurrency';
import { convertFromKes, formatMoney } from '@/lib/currency';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { currency } = useCurrency();

  const displaySale = product.salePrice ? convertFromKes(product.salePrice, currency) : null;
  const displayOriginal = convertFromKes(product.originalPrice, currency);
  const displaySavings = product.salePrice
    ? convertFromKes(product.originalPrice - product.salePrice, currency)
    : null;

  return (
    <>
      <div className="flex flex-col gap-4 group">
        <Link href={`/products/${product.id}`} className="block w-full">
          {/* Image Container */}
          <div className="relative w-full aspect-square bg-muted overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Sale Badge */}
            {product.salePrice && (
              <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 text-[11px] font-bold tracking-wide">
                SAVE {formatMoney(displaySavings ?? 0, currency)}
              </div>
            )}

            {/* Mobile cart button (matches screenshot) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center border border-border bg-background text-foreground shadow-sm sm:hidden"
              aria-label="Quick view"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Desktop quick view overlay */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="absolute inset-0 hidden bg-black/50 items-center justify-center gap-2 text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 sm:flex"
            >
              Quick View
            </button>
          </div>
        </Link>

        {/* Product Info */}
        <Link href={`/products/${product.id}`} className="block">
          <div className="flex flex-col gap-2 sm:gap-2">
            <h3 className="text-base md:text-lg font-medium text-foreground transition-colors text-center sm:text-left">
              {product.name}
            </h3>

            {/* Price */}
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-baseline sm:gap-2">
              {product.salePrice ? (
                <>
                  <span className="text-base font-medium text-red-600">
                    From {formatMoney(displaySale ?? 0, currency)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through sm:mt-0">
                    {formatMoney(displayOriginal, currency)}
                  </span>
                </>
              ) : (
                <span className="text-base font-medium text-red-600 sm:text-foreground">
                  From {formatMoney(displayOriginal, currency)}
                </span>
              )}
            </div>
          </div>
        </Link>
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
