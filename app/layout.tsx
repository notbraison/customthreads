import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { CurrencyProvider } from '@/components/CurrencyProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custom Threads - Custom Apparel',
  description: 'Premium custom apparel - Discover our collection of sweaters, hoodies, and t-shirts',
  icons: {
    icon: {
      url: '/hoodiefavicon.png',
      type: 'image/png',
    },
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ fontFamily: 'Arial, sans-serif' }} className="bg-background">
      <body className="font-sans antialiased">
        <CurrencyProvider>{children}</CurrencyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
