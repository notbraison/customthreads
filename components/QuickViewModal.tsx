'use client';

import Image from 'next/image';
import { Product } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart();
    onClose();
  };

  const discount = product.discount ? Math.round(product.discount) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl gap-0 p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.salePrice && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                -{discount}%
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-4 justify-between">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-black mb-4">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                {product.salePrice ? (
                  <>
                    <span className="text-2xl font-bold text-red-600">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-black">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 text-base mb-6">
                  {product.description}
                </p>
              )}

              {/* Features */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-semibold text-black">Features:</span>
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Premium quality embroidery</li>
                  <li>✓ Comfortable fit</li>
                  <li>✓ Available in multiple colors</li>
                  <li>✓ Free shipping on orders over $100</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-black text-white hover:bg-gray-800 py-6 text-base font-semibold rounded-none"
              >
                <ShoppingCart className="mr-2" size={20} />
                ADD TO CART
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full py-6 text-base font-semibold rounded-none border-gray-300"
              >
                CONTINUE SHOPPING
              </Button>
            </div>
          </div>
        </div>

        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
