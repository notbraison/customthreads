'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ChevronRight, Share2, Facebook, Twitter } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import { convertFromKes, formatMoney } from '@/lib/currency';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = mockProducts.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedStyle, setSelectedStyle] = useState('Sweater (No Hood)');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const { addToCart } = useCart();
  const { currency } = useCurrency();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  const displaySale = product.salePrice ? convertFromKes(product.salePrice, currency) : null;
  const displayOriginal = convertFromKes(product.originalPrice, currency);
  const displaySavings = product.salePrice
    ? convertFromKes(product.originalPrice - product.salePrice, currency)
    : null;
  const sizes = ['Small', 'Medium', 'Large', 'X-Large', 'XL-Large'];
  const styles = ['Sweater (No Hood)', 'Hoodie (With Hood)'];

  const handleAddToCart = () => {
    addToCart();
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          PLEASE ALLOW AROUND 1 - 2 WEEKS FOR YOUR ORDER TO BE PROCESSED.
        </p>
      </div>

      <Header />

      <main className="w-full bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">Home</Link>
            <ChevronRight size={16} />
            <span>{product.name}</span>
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {[product.image, product.image, product.image].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 border-2 transition-colors ${
                      selectedImage === img ? 'border-black' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative">
                <Image
                  src={selectedImage || product.image}
                  alt={product.name}
                  width={500}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                {product.salePrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm font-bold">
                    SAVE {formatMoney(displaySavings ?? 0, currency)}
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-6">
              {/* Title and Price */}
              <div>
                <h1 className="text-3xl md:text-4xl font-normal text-black mb-4 uppercase">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-2xl font-bold text-red-600">
                        {formatMoney(displaySale ?? 0, currency)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        {formatMoney(displayOriginal, currency)}
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-black">
                      {formatMoney(displayOriginal, currency)}
                    </span>
                  )}
                  {product.salePrice && (
                    <span className="bg-red-600 text-white px-2 py-1 text-sm font-bold">
                      SAVE {formatMoney(displaySavings ?? 0, currency)}
                    </span>
                  )}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Size: {selectedSize}
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-black hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Selector */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">
                  Style: {selectedStyle}
                </label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-2 border-2 transition-colors ${
                        selectedStyle === style
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-black hover:border-black'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-black mb-3">Quantity:</label>
                <div className="flex items-center gap-3 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 border border-gray-300 hover:border-black"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 py-2 text-center border border-gray-300 focus:outline-none focus:border-black"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 border border-gray-300 hover:border-black"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-300 text-black hover:bg-gray-400 py-3 text-base font-semibold rounded-none"
                >
                  ADD TO CART
                </Button>
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-base font-semibold rounded-none">
                  Buy with Shop
                </button>
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 underline py-2">
                  More payment options
                </button>
              </div>

              {/* Product Info */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-black">Custom {product.name}</span>
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>* 100% Embroidered.</li>
                  <li>* Machine Washable (cold wash, soft dry)</li>
                  <li>* Unisex Sizes</li>
                </ul>
              </div>

              {/* Fabric Info */}
              <div className="border-t border-gray-200 pt-6 space-y-2">
                <p className="font-semibold text-black">Fabric info:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>* Heavy blend 50/50 cotton-poly fabric</li>
                  <li>* Quarter-turned to eliminate centre crease</li>
                </ul>
              </div>

              {/* Share */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm font-semibold text-black mb-3">Share</p>
                <div className="flex gap-3">
                  <button className="p-2 border border-gray-300 hover:border-black">
                    <Facebook size={18} />
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-black">
                    <Twitter size={18} />
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-black">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
