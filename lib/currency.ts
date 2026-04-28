export type CurrencyCode = 'KES' | 'USD';

export const DEFAULT_CURRENCY: CurrencyCode = 'KES';

// Prices in `mockProducts` are authored in KES.
// Update this if you want a different conversion.
export const KES_PER_USD = 130;

export function convertFromKes(amountKes: number, currency: CurrencyCode) {
  if (currency === 'KES') return amountKes;
  return amountKes / KES_PER_USD;
}

export function formatMoney(amount: number, currency: CurrencyCode) {
  if (currency === 'KES') {
    const formatted = new Intl.NumberFormat('en-KE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    return `KSh${formatted}`;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `$${formatted}`;
}
