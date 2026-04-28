'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, User, Search, ChevronDown, Mail, Instagram, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useCart } from '@/hooks/useCart';

export function Header() {
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop All', href: '/products' },
    { label: 'Sweats', href: '/sweats' },
    { label: 'Hoodies', href: '/hoodies' },
    { label: 'T-Shirts', href: '/t-shirts' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Announcement Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-600">
          Free shipping on orders over KSH 5,000 • Limited time offer
        </p>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-white hover:opacity-80 transition-opacity">
              Custom Threads
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm text-white relative group transition-colors hover:text-gray-300 ${
                    pathname === link.href ? 'text-gray-200' : ''
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-white transition-all duration-300 ${
                      pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Desktop Search */}
              <button className="hidden sm:flex items-center justify-center text-white hover:text-gray-300 transition-colors">
                <Search size={20} />
              </button>

              {/* Email Icon */}
              <button className="hidden sm:flex items-center justify-center text-white hover:text-gray-300 transition-colors">
                <Mail size={20} />
              </button>

              {/* Account Icon */}
              <button className="hidden sm:flex items-center justify-center text-white hover:text-gray-300 transition-colors">
                <User size={20} />
              </button>

              {/* Cart Icon with Badge */}
              <button className="relative text-white hover:text-gray-300 transition-colors">
                <ShoppingCart size={20} />
                {count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>

              {/* Mobile Menu Trigger */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="text-white hover:bg-gray-900">
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-80 bg-white">
                  <div className="flex flex-col gap-6 mt-8">
                    <h2 className="text-2xl font-normal text-black">Menu</h2>
                    
                    <div className="flex flex-col gap-4">
                      {navLinks.map((link) => (
                        <SheetClose key={link.label} asChild>
                          <Link
                            href={link.href}
                            className={`text-lg transition-colors ${
                              pathname === link.href
                                ? 'text-black font-semibold'
                                : 'text-black hover:text-gray-600'
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <div className="border-t pt-6 flex flex-col gap-4">
                      <button className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
                        <Search size={20} />
                        <span>Search</span>
                      </button>
                      <button className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors">
                        <User size={20} />
                        <span>Account</span>
                      </button>
                      <button className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors relative">
                        <ShoppingCart size={20} />
                        <span>Cart</span>
                        {count > 0 && (
                          <span className="ml-auto bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {count}
                          </span>
                        )}
                      </button>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center gap-2 text-black cursor-pointer hover:text-gray-600 transition-colors">
                        <Smartphone size={20} />
                        <span className="text-sm">United States (USD)</span>
                        <ChevronDown size={16} className="ml-auto" />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
