"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { RiMailFill, RiLinkedinBoxFill } from "react-icons/ri";
import Link from 'next/link';

type TeamMember = {
  image: string;
  name: string;
  position: string;
  linkedin: string,
  gmail: string
};

// Card component
const TeamMemberCard: React.FC<TeamMember> = ({ image, name, position, linkedin, gmail }) => {
  const controls = useAnimation();
  const squareControls = useAnimation();
  const textControls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1 });
      squareControls.start({ scale: 0.8, opacity: 1, rotate: 45 });
      textControls.start({ y: 0, opacity: 1 });
    } else {
      controls.start({ scale: 1, opacity: 0 });
      squareControls.start({ scale: 0.8, opacity: 0, rotate: 0 });
      textControls.start({ y: 10, opacity: 0 });
    }
  }, [controls, squareControls, textControls, inView]);

  return (
    <div className="flex flex-col items-center py-8 relative group" ref={ref}>
      <motion.div
        className="relative z-10"
        initial={{ scale: 1, opacity: 0 }}
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Image 
          src={image} 
          quality={100} 
          priority 
          height={200} 
          width={200} 
          alt={name} 
          className="rounded-full"
        />
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
        animate={squareControls}
        transition={{ type: "tween", stiffness: 400, damping: 17 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        className="size-28 rounded-lg bg-blue-500 absolute top-[37%] transform rotate-45 transition-transform duration-300 group-hover:rotate-180 group-hover:cursor-pointer"
      />
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={textControls}
        transition={{ duration: 0.5, delay: 0.6, staggerChildren: 0.3 }}
        className="text-center mt-16"
      >
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-blue-600">{position}</p>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={textControls}
          transition={{ duration: 0.5, delay: 0.6, staggerChildren: 0.3 }}
          className='flex items-center justify-center pt-2'
        >
          <Link target='_blank' href={gmail}>
            <RiMailFill className='size-6 text-black cursor-pointer'/>
          </Link>
          <Link target='_blank' href={linkedin}>
            <RiLinkedinBoxFill className='size-6 text-black cursor-pointer'/>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main Team component
const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { image: "https://tylersteeves.netfirms.com/ts.png", name: "Tyler Steeves", position: "Chief Executive Officer", linkedin: "https://www.linkedin.com/in/tyler-steeves-26384129", gmail: "mailto:ts@omniattention.com" },
    { image: "https://tylersteeves.netfirms.com/chn.png", name: "Touhidul Islam Chayan", position: "Chief Technology Officer", linkedin: "https://www.linkedin.com/in/chnspart", gmail: "mailto:chayan@omniattention.com" },
    { image: "https://tylersteeves.netfirms.com/si.png", name: "Shamir Imtiaz", position: "Technical Lead", linkedin: "https://www.linkedin.com/in/shamir-imtiaz", gmail: "mailto:shamir@omniattention.com" },
  ];

  return (
    <section className='relative w-full h-fit flex flex-col items-center justify-center bg-white px-4 gap-10 py-24 lg:py-48'>
      <h2 className="z-10 text-center md:text-left text-4xl md:text-5xl font-medium tracking-tighter text-black dark:text-white">
        Creators of Your Next <span className='bg-gradient-to-b from-orange-700 to-slate-950 text-transparent bg-clip-text'>Obsession</span>
      </h2>
      <div className='relative flex flex-col md:flex-row w-full justify-center items-center gap-10'>
        {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default Team;
