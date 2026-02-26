
import React, { useEffect, useRef } from 'react';
import InteractiveBackground from './InteractiveBackground';

const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Background video autoplay failed:", err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <InteractiveBackground />
      
      {/* Video Layer */}
      <div className="absolute inset-0 opacity-[0.1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover grayscale brightness-50"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-particles-moving-in-slow-motion-23214-large.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Texture & Depth Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#030303_95%)]"></div>
      
      {/* Grain/Noise Overlay for a premium look */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

export default BackgroundVideo;
