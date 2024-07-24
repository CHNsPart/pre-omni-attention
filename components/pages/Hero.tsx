import Image from 'next/image';
import React from 'react';
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { BackgroundBeams } from '../ui/background-beams';

export default function Hero() {
  const words = [
    {
      text: "Welcome",
    },
    {
      text: "to",
    },
    {
      text: "Omni",
    },
    {
      text: "Attention",
      className: "text-[#005EEB]",
    },
  ];
  return (
    <section className="w-full h-screen flex flex-col md:flex-row items-center justify-center gap-20 bg-white px-4">
      <div className="z-40 w-fit text-center md:text-left flex flex-col justify-center items-center md:items-start h-full">
        <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          Revolutionizing Digital Out-of-Home Advertising
        </p>
        <TypewriterEffectSmooth words={words} />
        <p className="max-w-sm text-sm text-black/50 mb-8">
            {"Experience the future of digital out-of-home advertising with Omni Attention redefining the industry with cutting-edge tech and innovation"}
        </p> 
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
          <button className="w-40 h-10 rounded-md hover:bg-[#005EEB] transition-all duration-300 ease-linear bg-black border dark:border-white border-transparent text-white text-sm">
            Join now
          </button>
          {/* <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Signup
          </button> */}
        </div>
      </div>
      <div className="z-40 hidden sm:flex items-center justify-center">
        <Image
          height={400} // Adjust the height as needed
          width={400} // Adjust the width as needed
          src="/Hero.svg"
          alt="Hero"
          className="object-contain"
        />
      </div>
      <BackgroundBeams />
    </section>
  );
}
