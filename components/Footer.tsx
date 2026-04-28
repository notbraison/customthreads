'use client';

import { useMemo, useState, type ReactNode, type SVGProps } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { ArrowRight, ChevronDown, Facebook, Instagram } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import type { CurrencyCode } from '@/lib/currency';
import { DayNightModeToggle } from '@/components/DayNightModeToggle';

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14.5 4c.7 2.4 2.3 3.9 4.8 4.1v3.2c-1.7.1-3.1-.4-4.7-1.3v6.1c0 3-2.4 5.4-5.4 5.4S4 19.1 4 16.1c0-3 2.4-5.4 5.4-5.4.4 0 .8 0 1.2.1v3.4c-.4-.1-.7-.2-1.2-.2-1.1 0-2.1.9-2.1 2.1 0 1.1.9 2.1 2.1 2.1 1.3 0 2.2-1 2.2-2.5V4h2.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

type PaymentLogoProps = { className?: string };

function PaymentBox({
  className,
  children,
  widthClassName = 'w-11',
}: {
  className?: string;
  widthClassName?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`h-6 ${widthClassName} overflow-hidden rounded border border-black/10 bg-white shadow-sm ${className ?? ''}`}
    >
      <div className="flex h-full items-center justify-center px-1">{children}</div>
    </div>
  );
}

function AmexLogo({ className }: PaymentLogoProps) {
  return (
    <PaymentBox className={`bg-[#0070BA] ${className ?? ''}`} widthClassName="w-11">
      <span className="text-[9px] font-extrabold tracking-wider text-white">AMEX</span>
    </PaymentBox>
  );
}

function ApplePayLogo() {
  return (
    <PaymentBox widthClassName="w-14">
      <span className="text-[9px] font-semibold text-black"> Pay</span>
    </PaymentBox>
  );
}

function GooglePayLogo() {
  return (
    <PaymentBox widthClassName="w-14">
      <span className="text-[9px] font-semibold text-black">G Pay</span>
    </PaymentBox>
  );
}

function KlarnaLogo() {
  return (
    <PaymentBox className="bg-[#FFB3CF]" widthClassName="w-14">
      <span className="text-[9px] font-semibold text-black">Klarna</span>
    </PaymentBox>
  );
}

function MastercardLogo() {
  return (
    <PaymentBox widthClassName="w-11">
      <svg viewBox="0 0 44 24" className="h-4 w-full" aria-hidden="true">
        <circle cx="19" cy="12" r="6" fill="#EB001B" />
        <circle cx="25" cy="12" r="6" fill="#F79E1B" />
      </svg>
    </PaymentBox>
  );
}

function VisaLogo() {
  return (
    <PaymentBox widthClassName="w-11">
      <span className="text-[9px] font-extrabold tracking-wider text-[#1A1F71]">
        VISA
      </span>
    </PaymentBox>
  );
}

function PayPalLogo() {
  return (
    <PaymentBox widthClassName="w-11">
      <span className="text-[9px] font-extrabold tracking-wide text-[#003087]">
        PP
      </span>
    </PaymentBox>
  );
}

function ShopPayLogo() {
  return (
    <PaymentBox className="bg-[#5A31F4]" widthClassName="w-11">
      <span className="text-[9px] font-semibold text-white">shop</span>
    </PaymentBox>
  );
}

function SimpleLogo({
  label,
  className,
  widthClassName,
}: {
  label: string;
  className?: string;
  widthClassName?: string;
}) {
  return (
    <PaymentBox className={className} widthClassName={widthClassName}>
      <span className="text-[9px] font-semibold text-black">{label}</span>
    </PaymentBox>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerMenuLinks = [
    { label: 'Search', href: '#' },
    { label: 'Home', href: '/' },
    { label: 'Sweaters and Hoodies', href: '#' },
    { label: 'T-Shirts', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact Us', href: '#' },
  ];

  const currencyLabel = useMemo(() => {
    if (currency === 'USD') return 'United States (USD $)';
    return 'Kenya (KES KSh)';
  }, [currency]);

  const setCurrencyAndClose = (next: CurrencyCode) => {
    setCurrency(next);
    setCurrencyOpen(false);
  };

  return (
    <footer className="w-full bg-black text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-28">
        <div className="mb-14 grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10 lg:gap-16">
          {/* Column 1: Footer Menu */}
          <div>
            <h3 className="mb-6 text-xs font-normal tracking-[0.2em] text-white">
              FOOTER MENU
            </h3>
            <div className="flex flex-col gap-3 text-base">
              {footerMenuLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-200 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Newsletter Signup */}
          <div>
            <h3 className="mb-6 text-xs font-normal tracking-[0.2em] text-white">
              SIGN UP AND WE&apos;LL SEND YOU DISCOUNT
              <br />
              CODES
            </h3>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12 rounded-xl border-white/10 bg-white/5 pr-12 text-white placeholder:text-white/40"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-sm text-green-400">Thanks for subscribing!</p>
              )}
            </form>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="mb-6 text-xs font-normal tracking-[0.2em] text-white">
              FOLLOW US
            </h3>
            <div className="inline-flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-14 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <div className="h-12 w-px bg-white/10" />
              <Link
                href="https://www.tiktok.com/@customthreads"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-14 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <TikTokIcon className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </Link>
              <div className="h-12 w-px bg-white/10" />
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-12 w-14 items-center justify-center text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            {/* Currency + Theme */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Currency selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCurrencyOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 shadow-[0_0_30px_rgba(255,255,255,0.08)] transition-colors hover:bg-white/10"
                >
                  <span className="text-base leading-none">
                    {currency === 'USD' ? '🇺🇸' : '🇰🇪'}
                  </span>
                  <span className="font-medium">{currencyLabel}</span>
                  <ChevronDown className="h-4 w-4 text-white/60" />
                </button>
                {currencyOpen && (
                  <div
                    className="absolute left-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-black/95 shadow-xl backdrop-blur"
                    role="menu"
                  >
                    <button
                      type="button"
                      onClick={() => setCurrencyAndClose('KES')}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/90 transition-colors hover:bg-white/10"
                      role="menuitem"
                    >
                      <span className="text-base leading-none">🇰🇪</span>
                      <span className="flex-1">Kenya (KES KSh)</span>
                      {currency === 'KES' && <span className="text-white/50">✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrencyAndClose('USD')}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-white/90 transition-colors hover:bg-white/10"
                      role="menuitem"
                    >
                      <span className="text-base leading-none">🇺🇸</span>
                      <span className="flex-1">United States (USD $)</span>
                      {currency === 'USD' && <span className="text-white/50">✓</span>}
                    </button>
                  </div>
                )}
              </div>

              <DayNightModeToggle className="border-white/10 text-white/90 [&_[data-slot=toggle-group-item]]:gap-1.5" />
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-3 text-sm text-white/70">
              <span>© Custom Threads 2026</span>
            </div>

            {/* Payments */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-white/70">We accept</span>
              <div className="flex flex-wrap items-center gap-2">
                <AmexLogo />
                <ApplePayLogo />
                <SimpleLogo label="ban" className="bg-[#F0F7FF]" widthClassName="w-11" />
                <GooglePayLogo />
                <SimpleLogo label="iDEAL" className="bg-[#FFF3E0]" widthClassName="w-11" />
                <KlarnaLogo />
                <MastercardLogo />
                <PayPalLogo />
                <ShopPayLogo />
                <SimpleLogo label="UP" widthClassName="w-11" />
                <VisaLogo />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
