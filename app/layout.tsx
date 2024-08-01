import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Omni Attention',
  description: '360° Omni Marketing Solutions',
  keywords: ['DOOH', 'Omni Channel Marketing', 'Digital Outdoor Marketing'],
  authors: [{ name: 'Touhidul Islam Chayan', url: 'https://chnspart.com' }],
  creator: 'Red Planet Empire',
  publisher: 'Omni Attention',
  openGraph: {
    title: 'Omni Attention',
    description: '360° Omni Marketing Solutions',
    url: 'https://omniattention.com',
    siteName: 'Omni Attention',
    images: [
      {
        url: 'https://omniattention.com/oa_og.png',
        width: 1200,
        height: 630,
        alt: 'Omni Attention',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omni Attention',
    description: '360° Omni Marketing Solutions',
    creator: '@R_CHN4',
    images: ['https://omniattention.com/oa_og.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
