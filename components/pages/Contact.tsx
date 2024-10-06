import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@radix-ui/react-toast';
import dynamic from 'next/dynamic';

const LottieViewer = dynamic(() => import('../LottieViewer'), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

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
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const titleControls = useAnimation();
  
  const { ref: spanRef, inView: spanInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const spanControls = useAnimation();
  
  const [open, setOpen] = useState(false);

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("info@omniattention.com").then(() => {
      setOpen(true);
    }).catch(err => {
      console.error("Failed to copy email address.", err);
    });
  };

  return (
    <section className='relative w-full h-fit flex flex-col md:flex-row items-center justify-center bg-white px-4 md:px-8 gap-10 py-24 lg:py-48'>
      <ToastProvider swipeDirection="right">
        <Toast className='rounded-lg px-3 py-2 bg-blue-500 text-white z-[9999]' open={open} onOpenChange={setOpen}>
          <ToastTitle>📌</ToastTitle>
          <ToastDescription>Email address copied to clipboard!</ToastDescription>
        </Toast>
        <ToastViewport className="fixed bottom-0 right-0 p-4 w-96" />
      </ToastProvider>

      <div className='flex flex-col gap-5 justify-start items-start'>
        <motion.h2
          ref={titleRef}
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
          custom={1}
          className="z-10 text-center md:text-left text-4xl md:text-5xl max-w-md font-medium tracking-tighter text-black dark:text-white"
        >
          Follow{' '}Our
          <motion.span
            ref={spanRef}
            variants={spanVariants}
            custom={3}
            className='bg-gradient-to-b from-orange-700 to-slate-950 text-transparent bg-clip-text'
          >
            Journey
          </motion.span>{' '}
        </motion.h2>
        <motion.span
          ref={spanRef}
          initial="hidden"
          animate={spanControls}
          variants={spanVariants}
          custom={4}
          onClick={handleCopyEmail}
          className='flex gap-2 px-4 py-2 items-center justify-center w-full md:w-fit bg-black text-white rounded-lg cursor-pointer hover:bg-blue-950 transition-all'
        >
          <Image src={"/gmail.svg"} height={20} width={20} alt='gmail' />
          <span>info@omniattention.com</span>
        </motion.span>
      </div>
      <div className='hidden md:block'>
        <LottieViewer
          src="/contact.json"
          autoplay={true}
          loop={true}
          width={300}
          height={300}
        />
      </div>
    </section>
  );
}
