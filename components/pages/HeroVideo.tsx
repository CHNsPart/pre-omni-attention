import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const textVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const videoVariant = {
  hidden: { scale: 0.5, borderRadius: '50%', opacity: 0 },
  visible: { 
    scale: 1, 
    borderRadius: '0%',
    opacity: 1,
    transition: { 
      duration: 1,
      ease: 'easeIn',
      delay: 0.3,
      stiffness: 400, damping: 17,
    }
  }
};

const contentVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: 1,
      staggerChildren: 0.3
    }
  }
};

const buttonVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768); // Assuming 768px as the breakpoint for mobile/desktop
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center bg-white px-4 mt-44 md:mt-56 mb-36 md:mb:48">
      {isDesktop ? (
        <>
          <motion.h1 
            className="text-4xl md:text-5xl font-medium mb-8 text-center z-40"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          >
            <span className='bg-gradient-to-b from-orange-700 to-black text-transparent bg-clip-text'>Attention</span> is <span className='bg-gradient-to-b from-blue-700 to-black text-transparent bg-clip-text'>Currency</span>
          </motion.h1>
          <motion.div 
            className="relative w-full max-w-4xl xl:max-w-6xl overflow-hidden z-40"
            initial="hidden"
            animate="visible"
            variants={videoVariant}
          >
            <video 
              src="https://tylersteeves.netfirms.com/oa_hero.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="w-full"
            >
            </video>
            <motion.div 
              className='flex flex-col items-center md:flex-row justify-center md:justify-between gap-10 z-40'
              initial="hidden"
              animate="visible"
              variants={contentVariant}
            >
              <motion.p 
                className="text-gray-600 text-2xl text-center md:text-left max-w-2xl mt-8"
                variants={contentVariant}
              >
                <span className='text-blue-700 font-medium'>Omni attention</span> captures the interest of important people and engages community in powering human connection.
              </motion.p>
              <motion.button 
                className="mt-8 bg-blue-600 text-white p-4 flex justify-center items-center rounded-lg"
                variants={buttonVariant}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          <h1 className="text-4xl md:text-5xl font-medium mb-8 text-center z-40">
            <span className='bg-gradient-to-b from-orange-700 to-black text-transparent bg-clip-text'>Attention</span> is <span className='bg-gradient-to-b from-blue-700 to-black text-transparent bg-clip-text'>Currency</span>
          </h1>
          <div className="relative w-full max-w-4xl xl:max-w-6xl overflow-hidden z-40">
            <video 
              src="https://tylersteeves.netfirms.com/oa_hero.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              preload="auto"
              className="w-full"
            >
            </video>
            <div className='flex flex-col items-center md:flex-row justify-center md:justify-between gap-10 z-40'>
              <p className="text-gray-600 text-2xl text-center md:text-left max-w-2xl mt-8">
                <span className='text-blue-700 font-medium'>Omni attention</span> captures the interest of important people and engages community in powering human connection.
              </p>
              <button className="mt-8 bg-blue-600 text-white p-4 flex justify-center items-center rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
