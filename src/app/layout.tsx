import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SurveyProvider } from '@/context/SurveyContext'
import { ToastProvider } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kreo Ultimate Gamer Survey',
  description: "India's first comprehensive gamer survey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <SurveyProvider>{children}</SurveyProvider>
        </ToastProvider>
      </body>
    </html>
  )
} 