import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { CurrencyProvider } from '@/components/CurrencyProvider'
import { ThemeProvider } from '@/components/theme-provider'
import { DayNightModeProvider } from '@/components/day-night-mode-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Custom Threads - Custom Apparel',
  description: 'Premium custom apparel - Discover our collection of sweaters, hoodies, and t-shirts',
  openGraph: {
    title: 'Custom Threads - Custom Apparel',
    description: 'Premium custom apparel - Discover our collection of sweaters, hoodies, and t-shirts',
    images: [
      {
        url: '/invincibleheaderimg.webp',
        width: 1200,
        height: 630,
        alt: 'Custom Threads',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Threads - Custom Apparel',
    description: 'Premium custom apparel - Discover our collection of sweaters, hoodies, and t-shirts',
    images: ['/invincibleheaderimg.webp'],
  },
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
    <html
      lang="en"
      suppressHydrationWarning
      style={{ fontFamily: 'Arial, sans-serif' }}
      className="bg-background"
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DayNightModeProvider>
            <CurrencyProvider>{children}</CurrencyProvider>
          </DayNightModeProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
