// File: app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { AuthProvider } from '../contexts/AuthContext';



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.7.14/lottie.min.js"
          strategy="lazyOnload"
        />
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}