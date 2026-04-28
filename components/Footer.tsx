'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Mail, Smartphone, ChevronDown } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Shipping Info', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Size Guide', href: '#' },
  ];

  const policies = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-12">
          {/* Column 1: Footer Menu */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">SHOP</h3>
            <div className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Newsletter Signup */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">NEWSLETTER</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 rounded-none"
                />
                <Button
                  type="submit"
                  className="bg-white text-black hover:bg-gray-200 px-6 font-semibold rounded-none"
                >
                  Join
                </Button>
              </div>
              {subscribed && (
                <p className="text-green-400 text-sm">
                  Thanks for subscribing!
                </p>
              )}
            </form>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-6">FOLLOW</h3>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail size={24} />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left: Country Selector */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <Smartphone size={18} />
              <span className="text-sm">United States (USD)</span>
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </div>

            {/* Center: Copyright */}
            <p className="text-gray-400 text-sm text-center">
              © 2024 Tailored Threads. All rights reserved.
            </p>

            {/* Right: Policies */}
            <div className="flex gap-6 text-sm">
              {policies.map((policy) => (
                <Link
                  key={policy.label}
                  href={policy.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {policy.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex gap-4 justify-center mt-8 pt-8 border-t border-gray-800">
            <span className="text-gray-400 text-sm">Payment methods:</span>
            <div className="flex gap-3 text-gray-400 text-xs">
              <span>Visa</span>
              <span>•</span>
              <span>Mastercard</span>
              <span>•</span>
              <span>PayPal</span>
              <span>•</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
