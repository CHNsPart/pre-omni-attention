import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

const SmoothScrolling = ({ children }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
      <ReactLenis
        root // Apply smooth scrolling to the entire page
        options={{
          lerp: 0.1, // Adjust for desired smoothness (lower = smoother)
          duration: 1.5, // Adjust for preferred scroll duration (seconds)
        }}
      >
        {children}
      </ReactLenis>
    );
  };
  
  export default SmoothScrolling;
  