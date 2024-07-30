"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, BlogItem, ServiceItem } from "./ui/navbar-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 w-fit mx-auto z-50", className)}
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
          <div className="flex flex-row items-center justify-center gap-2 text-sm overflow-auto ">
            <span className="size-4 rounded-full bg-gradient-to-t animate-spin from-[#005EEB] to-[#21AAFF]"/>
            <HoveredLink href="#">{"Omni Dashboard (coming soon)"}</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Blogs">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
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
          <div className="flex flex-row justify-start items-start gap-2 max-w-4xl max-h-xl overflow-auto">
            <ServiceItem
              title="360 DOOH Solution"
              href="#"
              emoji="🔥"
              description="A digitized solution for managing and optimizing your DOOH campaigns."
            />
            <ServiceItem
              title="Ad Scheduling and Slot Management"
              href="#"
              emoji="🔥"
              description="Book ad slots effortlessly with our calendar view."
            />
            <ServiceItem
              title="Real-Time Content Delivery"
              href="#"
              emoji="🔥"
              description="Seamlessly deliver ads in real-time to thousands of screens."
            />
            <ServiceItem
              title="Broad Monitoring and Reporting"
              href="#"
              emoji="🔥"
              description="Monitor screen statuses and view detailed playback reports."
            />
            <ServiceItem
              title="User-Friendly Admin Dashboard"
              href="#"
              emoji="🔥"
              description="Navigate and manage campaigns with ease through our interfaces."
            />
            <ServiceItem
              title="Flexible User Management"
              href="#"
              emoji="🔥"
              description="Register, manage profiles, and control access efficiently."
            />
            <ServiceItem
              title="Enhanced Security"
              href="#"
              emoji="🔥"
              description="Enjoy secure data encryption, reliable authentication, and constant uptime."
            />
            <ServiceItem
              title="Seamless Integration"
              href="#"
              emoji="🔥"
              description="Integrate smoothly with Android boxes for automatic screen updates."
            />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
