'use client';

import { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

interface DotLottieOptions {
  autoplay?: boolean;
  loop?: boolean;
  [key: string]: any;
}

interface LottieViewerProps extends Omit<DotLottieOptions, 'canvas' | 'src'> {
  src: string;
  width?: number;
  height?: number;
}

const LottieViewer: React.FC<LottieViewerProps> = ({ src, width = 300, height = 300, ...dotLottieOptions }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const dotLottie = new DotLottie({
        ...dotLottieOptions,
        canvas: canvasRef.current,
        src,
      });

      return () => {
        dotLottie.destroy();
      };
    }
  }, [src, dotLottieOptions]);

  return <canvas ref={canvasRef} style={{ width: `${width}px`, height: `${height}px` }} />;
};

export default LottieViewer;