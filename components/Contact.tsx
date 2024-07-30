import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactLottie = dynamic(() => import('../components/ContactLottie'), { ssr: false });

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
};

const spanVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.2 },
  }),
};

export default function Contact() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const titleControls = useAnimation();
  
  const { ref: spanRef, inView: spanInView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const spanControls = useAnimation();

  useEffect(() => {
    if (titleInView) {
      titleControls.start("visible");
    } else {
      titleControls.start("hidden");
    }
  }, [titleInView, titleControls]);

  useEffect(() => {
    if (spanInView) {
      spanControls.start("visible");
    } else {
      spanControls.start("hidden");
    }
  }, [spanInView, spanControls]);

  return (
    <section className='relative w-full h-fit flex flex-col md:flex-row items-center justify-center bg-white px-4 md:px-8 gap-10 py-24 lg:py-48'>
      <div className='flex flex-col gap-5 justify-start items-start'>
        <motion.h2
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
          custom={1}
          className="z-10 text-center md:text-left text-4xl md:text-5xl max-w-md font-medium tracking-tighter text-black dark:text-white"
        >
          {"Let's"} talk to see if you wanna help us{' '}
          <motion.span
            ref={spanRef}
            variants={spanVariants}
            custom={2}
            className='bg-gradient-to-b from-blue-700 to-slate-950 text-transparent bg-clip-text'
          >
            build
          </motion.span>{' '}
          or{' '}
          <motion.span
            ref={spanRef}
            variants={spanVariants}
            custom={3}
            className='bg-gradient-to-b from-orange-700 to-slate-950 text-transparent bg-clip-text'
          >
            invest
          </motion.span>{' '}
          in it.
        </motion.h2>
        <motion.span
          ref={spanRef}
          initial="hidden"
          animate={spanControls}
          variants={spanVariants}
          custom={4}
          className='flex gap-2 px-4 py-2 items-center justify-center w-full md:w-fit bg-black text-white rounded-lg cursor-pointer hover:bg-blue-950 transition-all'
        >
          <Image src={"/gmail.svg"} height={20} width={20} alt='gmail' />
          info@omniattention.com
        </motion.span>
      </div>
      <div><ContactLottie /></div>
    </section>
  );
}
