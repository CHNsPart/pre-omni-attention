import React from 'react';
import { BentoCard, BentoGrid as BentoGridComponent } from '@/components/magicui/BentoCard';
import { TbDeviceHeartMonitor } from "react-icons/tb";
import { GiBrainFreeze, GiSmallFire, GiFloorHatch } from "react-icons/gi";
import LottieViewer from '../LottieViewer';

const features = [
  {
    name: "Unmatched Ad Flexibility",
    description: "Target specific locations and peak times with our vast screen network.",
    href: "#",
    cta: "Learn More",
    Icon: GiFloorHatch,
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className='absolute h-full w-full left-32 flex justify-center items-end'>
        <LottieViewer
          src="/flexible.json"
          autoplay={true}
          loop={true}
          width={300}
          height={300}
        />
      </div>
    ),
  },
  {
    name: "Real-Time Content Delivery",
    description: "Update ads instantly across multiple screens for maximum engagement.",
    href: "#",
    cta: "Learn More",
    Icon: GiSmallFire,
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className='absolute h-full w-full flex justify-end items-center mt-2 md:mt-10'>
        <LottieViewer
          src="/content.json"
          autoplay={true}
          loop={true}
          width={400}
          height={500}
        />
      </div>
    ),
  },
  {
    name: "Advanced AI-Driven Insights",
    description: "Leverage AI for deep insights and transparent ad performance optimization.",
    href: "#",
    cta: "Learn More",
    Icon: GiBrainFreeze,
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className='absolute h-full w-full flex justify-end items-start'>
        <LottieViewer
          src="/ai.json"
          autoplay={true}
          loop={true}
          width={300}
          height={300}
        />
      </div>
    ),
  },
  {
    name: "Broad Monitoring & Reporting",
    description: "Monitor ad performance and screen status with detailed real-time reports.",
    href: "#",
    cta: "Learn More",
    Icon: TbDeviceHeartMonitor,
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className='absolute h-full w-full flex justify-center items-start -mt-10'>
        <LottieViewer
          src="/monitor.json"
          autoplay={true}
          loop={true}
          width={400}
          height={300}
        />
      </div>
    ),
  },
];

export function BentoGrid() {
  return (
    <section className='relative max-w-6xl h-fit flex flex-col items-center justify-center bg-white px-4 gap-10 py-24 lg:py-48'>
      <BentoGridComponent>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGridComponent>
    </section>
  );
}
