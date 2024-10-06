"use client"
// File: app/page.tsx

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import HeroVideo from '@/components/pages/HeroVideo';
import NewsletterCTA from '@/components/pages/NewsletterCTA';
import Footer from '@/components/Footer';

// Dynamic imports with correct typing
const DynamicBentoGrid = dynamic(() => import('@/components/pages/BentoGrid').then(mod => mod.BentoGrid), {
  loading: () => <p>Loading BentoGrid...</p>,
});

const DynamicTeam = dynamic(() => import('@/components/pages/Team').then(mod => mod.default), {
  loading: () => <p>Loading Team...</p>,
});

const DynamicContact = dynamic(() => import('@/components/pages/Contact').then(mod => mod.default), {
  loading: () => <p>Loading Contact...</p>,
});

const DynamicSalesFunnel = dynamic(() => import('@/components/pages/SalesFunnel').then(mod => mod.default), {
  loading: () => <p>Loading Sales Funnel...</p>,
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-10" />
      </div>
      <HeroVideo/>
      <Suspense fallback={<p>Loading BentoGrid...</p>}>
        <DynamicBentoGrid/>
      </Suspense>

      <Suspense fallback={<p>Loading Sales Funnel...</p>}>
        <DynamicSalesFunnel/>
      </Suspense>

      <Suspense fallback={<p>Loading Team...</p>}>
        <DynamicTeam/>
      </Suspense>
      <Suspense fallback={<p>Loading Contact...</p>}>
        <DynamicContact/>
      </Suspense>
      <NewsletterCTA/>
      <Footer/>
    </main>
  );
}