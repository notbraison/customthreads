'use client';

import { useEffect, useMemo, useState } from 'react';
import { CurrencyContext } from '@/hooks/useCurrency';
import { DEFAULT_CURRENCY, type CurrencyCode } from '@/lib/currency';

const STORAGE_KEY = 'tt.currency';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'KES' || saved === 'USD') setCurrencyState(saved);
  }, []);

  const setCurrency = (next: CurrencyCode) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  const value = useMemo(() => ({ currency, setCurrency }), [currency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

