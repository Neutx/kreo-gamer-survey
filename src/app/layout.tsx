import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SurveyProvider } from '@/context/SurveyContext'
import { ToastProvider } from '@/components/ui/toast'
import { websiteJsonLd, organizationJsonLd } from '@/lib/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kreo Ultimate Gamer Survey',
  description: "India's first comprehensive gaming lifestyle survey. Share your gaming habits, preferences, and win exciting gaming gear from Kreo.",
  keywords: "gaming survey, Indian gamers, gaming habits, gaming preferences, Kreo, gaming gear, India gaming",
  authors: [{ name: 'Kreo Tech' }],
  creator: 'Kreo Tech',
  publisher: 'Kreo Tech',
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'https://howindiagames.web.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kreo Ultimate Gamer Survey',
    description: "India's first comprehensive gaming lifestyle survey. Share your gaming habits, preferences, and win exciting gaming gear from Kreo.",
    url: 'https://howindiagames.web.app',
    siteName: 'How India Games',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Kreo Ultimate Gamer Survey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How India Games',
    description: "India's first comprehensive gaming lifestyle survey",
    images: ['/twitter-image.jpg'],
  },
  icons: {
    icon: '/android-chrome-512x512.png',
    apple: '/android-chrome-512x512.png',
  },
  verification: {
    google: '4yZneb_cKlw8VBiZj4cSUEszey0Hv-VUlIZgbO9H1dk',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body className={inter.className}>
        <ToastProvider>
          <SurveyProvider>{children}</SurveyProvider>
        </ToastProvider>
      </body>
    </html>
  )
} 