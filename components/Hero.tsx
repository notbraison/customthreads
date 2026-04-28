'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/invincibleheaderimg.webp"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 max-w-2xl flex flex-col items-start gap-6 pt-32">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white text-balance">
          WELCOME TO CUSTOM THREADS
        </h1>
        
        <p className="text-lg md:text-xl text-gray-100 text-balance max-w-xl">
          Discover our premium collection of custom embroidered apparel, crafted with precision and style
        </p>

        <Button 
          size="lg"
          className="mt-4 bg-black text-white hover:bg-gray-800 px-8 py-6 text-lg font-semibold rounded-none transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          SHOP ALL
          <ArrowRight className="ml-2" size={24} />
        </Button>
      </div>
    </section>
  );
}
