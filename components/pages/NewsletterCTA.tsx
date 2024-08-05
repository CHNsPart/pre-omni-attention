import React, { useEffect } from 'react';
import GridPattern from '../magicui/GridPattern';
import { cn } from '@/lib/utils';
import { MailSubs } from '../MailSubs';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
};

export default function NewsletterCTA() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return (
    <section className='h-full flex flex-col md:flex-row justify-center items-center py-24 lg:py-48'>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={textVariants}
        className="relative flex h-fit w-full md:w-1/2 items-center justify-center overflow-hidden rounded-lg bg-background p-20"
      >
        <motion.p 
        initial="hidden"
        animate={controls}
        variants={textVariants}
          transition={{ type: "spring", stiffness: 400, damping: 17, delay:0.9 }}
          className="z-10 whitespace-pre-wrap text-center md:text-left text-4xl md:text-5xl font-medium tracking-tighter text-black dark:text-white"
        >
          Find out {"what's"} <span className='bg-gradient-to-b from-orange-700 to-slate-950 text-transparent bg-clip-text'>going</span> on near you soon!
        </motion.p>
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />
      </motion.div>
      <motion.div
        whileHover="hover"
        variants={buttonVariants}
      >
        <MailSubs />
      </motion.div>
    </section>
  );
}
