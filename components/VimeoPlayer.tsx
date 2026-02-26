
import React, { useEffect, useRef } from 'react';

interface VimeoPlayerProps {
  onReachThreshold: () => void;
}

declare const Vimeo: any;

const VimeoPlayer: React.FC<VimeoPlayerProps> = ({ onReachThreshold }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Vimeo Video ID: 1165329797
    const videoId = "1165329797";
    
    const options = {
      id: videoId,
      autoplay: true,
      muted: true,
      loop: false,
      responsive: true,
      title: false,
      byline: false,
      portrait: false,
      controls: true,
      playsinline: true,
    };

    const initPlayer = () => {
      if (containerRef.current && typeof Vimeo !== 'undefined' && !playerRef.current) {
        playerRef.current = new Vimeo.Player(containerRef.current, options);

        playerRef.current.on('timeupdate', (data: { percent: number }) => {
          // Trigger modal at 98% completion
          if (data.percent >= 0.98 && !hasTriggered.current) {
            hasTriggered.current = true;
            onReachThreshold();
          }
        });

        // Force play after ready, ensuring it's muted to satisfy browser policies
        playerRef.current.ready().then(() => {
          console.log('Vimeo Player Ready');
          // Small delay to ensure browser is ready for autoplay
          setTimeout(() => {
            playerRef.current.setMuted(true).then(() => {
              playerRef.current.play().catch((error: any) => {
                console.warn('Autoplay failed, user interaction needed:', error);
              });
            });
          }, 500);
        });
      }
    };

    // Check if Vimeo script is ready
    if (typeof Vimeo === 'undefined') {
      const interval = setInterval(() => {
        if (typeof Vimeo !== 'undefined') {
          clearInterval(interval);
          initPlayer();
        }
      }, 100);
    } else {
      initPlayer();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.unload();
      }
    };
  }, [onReachThreshold]);

  return (
    <div className="vimeo-wrapper bg-black">
      <div ref={containerRef} className="w-full h-full"></div>
    </div>
  );
};

export default VimeoPlayer;
