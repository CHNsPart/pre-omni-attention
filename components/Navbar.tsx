"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, BlogItem, ServiceItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, useAnimation } from 'framer-motion';

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!active) {
        if (currentScrollY > prevScrollY) {
          // Scrolling down
          controls.start({ y: -20, opacity: 0 });
        } else {
          // Scrolling up
          controls.start({ y: 0, opacity: 1 });
        }
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls, prevScrollY, active]);

  return (
    <motion.div
      className={cn("fixed top-10 inset-x-0 w-fit mx-auto z-50 select-none", className)}
      initial={{ y: 0, opacity: 1 }}
      animate={controls}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Menu setActive={setActive}>
        <Image
          height={30} // Adjust the height as needed
          width={30} // Adjust the width as needed
          src="/oa_icon.svg"
          alt="Hero"
          className="object-contain mr-2"
        />
        <MenuItem setActive={setActive} active={active} item="Product">
          <div className="flex flex-row items-center justify-center gap-2 text-sm overflow-auto">
            <span className="size-4 rounded-full bg-gradient-to-t animate-spin from-[#005EEB] to-[#21AAFF]" />
            <HoveredLink href="#">{"Omni Dashboard (coming soon)"}</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Blogs">
          <div className="text-sm relative w-screen md:w-fit grid grid-cols-1 md:grid-cols-2 gap-10 p-0 md:p-4">
            <BlogItem
              title="Create DOOH Campaigns with Omni Attention"
              href="#"
              src="/b1.png"
              description="Omni Attention dashboard is high-end."
            />
            <BlogItem
              title="Why Do I Need DOOH Marketing?"
              href="#"
              src="/b2.png"
              description="Digital out of Home marketing hot right now."
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-row justify-start items-start gap-2 max-w-lg md:max-w-4xl max-h-xl overflow-auto pr-44 lg:pr-0">
            <ServiceItem
              title="Unmatched Strategic Ad Flexibility"
              href="#"
              emoji="📢"
              description="Target specific locations and peak times with our extensive screen network."
            />
            <ServiceItem
              title="Real-Time Content Delivery"
              href="#"
              emoji="🔥"
              description="Instantly update ads across numerous screens for optimal engagement."
            />
            <ServiceItem
              title="Advanced AI-Driven Insights"
              href="#"
              emoji="🔮"
              description="Gain deep insights and optimize ads with our transparent AI technology."
            />
            <ServiceItem
              title="Comprehensive Monitoring & Reporting"
              href="#"
              emoji="🗂️"
              description="Track ad performance and screen status with real-time reports."
            />
            <ServiceItem
              title="Seamless Integration & Scalability"
              href="#"
              emoji="✨"
              description="Easily integrate and scale to manage both small and large screen networks."
            />
          </div>
        </MenuItem>

      </Menu>
    </motion.div>
  );
}
