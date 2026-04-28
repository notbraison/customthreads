'use client';

import { createContext, useContext } from 'react';
import type { CurrencyCode } from '@/lib/currency';

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency() {
  const value = useContext(CurrencyContext);
  if (!value) throw new Error('useCurrency must be used within CurrencyProvider');
  return value;
}

export { CurrencyContext };

