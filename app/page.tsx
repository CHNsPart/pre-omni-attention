"use client"
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Image from "next/image";
import NumberTicker from '@/components/magicui/NumberTicker';
import Hero from '@/components/pages/Hero';
import { Navbar } from '@/components/Navbar';
import HeroVideo from '@/components/pages/HeroVideo';
import NewsletterCTA from '@/components/pages/NewsletterCTA';
import Team from '@/components/pages/Team';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const Loader = dynamic(() => import('../components/Loader'), { ssr: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // Adjust the delay as needed 4500

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center'>
      <Loader />
      <div className='absolute bottom-5'>
        <NumberTicker value={100} />  <span>%</span>
      </div>
    </div>
    )
  }

  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-10" />
      </div>
      {/* <Hero/> */}
      <HeroVideo/>
      <NewsletterCTA/>
      <Team/>
      <Contact/>
      <Footer/>
    </main>
  );
}