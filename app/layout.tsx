import './global.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Richard Ho',
    template: '%s | Next.js Portfolio Starter',
  },
  description: 'Richard Ho\'s website.',
  openGraph: {
    title: 'Richard Ho\'s website',
    description: 'Welcome to my website!',
    url: baseUrl,
    siteName: 'Richard Ho\'s website',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'katex-css': 'https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css',
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-white bg-[rgb(16,16,16)]',
        spaceMono.variable
      )}
    >
      <body className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto font-mono">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          crossOrigin="anonymous"
        />
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
