"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Define the type for team member data
type TeamMember = {
  image: string;
  name: string;
  position: string;
};

// Card component
const TeamMemberCard: React.FC<TeamMember> = ({ image, name, position }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ scale: 1, opacity: 1 });
    }
  }, [controls, inView]);

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
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="size-28 rounded-lg bg-blue-500 absolute top-[40%] transform rotate-45 transition-transform duration-300 group-hover:rotate-180 group-hover:cursor-pointer"
        initial={{ scale: 0.8, opacity: 0, rotate:45 }}
        animate={controls}
      />
      <div className="text-center mt-16">
        <p className="text-xl font-semibold">{name}</p>
        <p className="text-blue-600">{position}</p>
      </div>
    </div>
  );
};

// Main Team component
const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    { image: "/ts.png", name: "Tyler Steeves", position: "Chief Executive Officer" },
    { image: "/chn.png", name: "Touhidul Islam Chayan", position: "Chief Technology Officer" },
    { image: "/si.png", name: "Shamir Imtiaz", position: "Technical Lead" },
    // Add more team members here
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