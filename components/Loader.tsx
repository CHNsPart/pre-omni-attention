// components/Loader.tsx
import { useEffect, useRef } from 'react';
import { DotLottie } from '@lottiefiles/dotlottie-web';

const Loader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const dotLottie = new DotLottie({
        autoplay: true,
        loop: true,
        canvas: canvasRef.current,
        src: '/OA_Loader.json', // replace with your Lottie animation URL
      });

      return () => {
        dotLottie.destroy();
      };
    }
  }, []);

  return <canvas ref={canvasRef} style={{ width: '300px', height: '300px' }} />;
};

export default Loader;
