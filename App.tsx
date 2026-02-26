
import React, { useState, useEffect, useRef } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import VimeoPlayer from './components/VimeoPlayer';

const App: React.FC = () => {
  const [showCalendly, setShowCalendly] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [isBlockStyle, setIsBlockStyle] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const fullHeadline = "GET YOUR NEXT COACHING CLIENTS WITHIN 30 DAYS";
  const calendlyUrl = "https://calendly.com/d/cwxc-bt9-825/greatest-marketing-agency-demo-call";

  // Typing animation
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullHeadline.slice(0, i));
      i++;
      if (i > fullHeadline.length) {
        clearInterval(timer);
        // After typing finishes, enable the block style toggle animation
        const toggleInterval = setInterval(() => {
          setIsBlockStyle(prev => !prev);
        }, 1000); // 1.0 second for a slower, more deliberate effect
        return () => clearInterval(toggleInterval);
      }
    }, 40);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to video on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to calendly when it appears
  useEffect(() => {
    if (showCalendly) {
      setTimeout(() => {
        calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showCalendly]);

  const handleVideoThreshold = () => {
    setShowCalendly(true);
  };

  return (
    <div className="relative min-h-screen selection:bg-orange-500 selection:text-white overflow-x-hidden bg-[#030303]">
      <BackgroundVideo />

      <main className="relative z-10 flex flex-col items-center px-4 py-20 md:py-32">
        <div className="max-w-5xl w-full text-center space-y-16">
          
          <div className="animate-fade-in space-y-8">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.2] transition-all duration-300 min-h-[4em] md:min-h-[2.5em] flex flex-wrap justify-center gap-y-2 ${isBlockStyle ? 'text-white' : 'text-white'}`}>
              {displayText.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className={`px-2 py-1 transition-all duration-150 ${
                    isBlockStyle 
                      ? 'bg-[#F27D26] text-white shadow-[4px_4px_0px_rgba(0,0,0,1)]' 
                      : word === 'CLIENTS' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_0_25px_rgba(234,88,12,0.6)] glow-text-orange' 
                        : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  }`}
                >
                  {word}
                </span>
              ))}
              <span className={`inline-block w-1 h-[1em] bg-orange-500 ml-1 animate-pulse align-middle shadow-[0_0_15px_rgba(234,88,12,0.8)] ${isBlockStyle ? 'hidden' : ''}`}></span>
            </h1>
            <p className="text-xl md:text-3xl font-bold text-gray-200 max-w-3xl mx-auto leading-relaxed border-l-4 border-orange-500 pl-6 italic">
              Without Ads. Without Cold DMs. <br className="hidden md:block"/>Without Posting Every Day.
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium opacity-90">
              If you're a coach with a $2K+ offer but inconsistent clients, this shows you the exact system to fix that in 30 days.
            </p>
          </div>

          <div 
            ref={videoSectionRef}
            className="w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 glass-effect animate-fade-in transition-transform duration-700 hover:scale-[1.015] cursor-pointer"
            style={{ animationDelay: '0.2s' }}
          >
            <VimeoPlayer onReachThreshold={handleVideoThreshold} />
          </div>

          {showCalendly && (
            <div 
              ref={calendlyRef}
              className="w-full mt-20 animate-fade-in"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">READY TO SCALE?</h2>
                <p className="text-orange-500 font-bold uppercase tracking-widest">Book Your Strategy Call Below</p>
              </div>
              <div className="w-full h-[800px] rounded-3xl overflow-hidden glass-effect border border-white/10">
                <iframe
                  src={calendlyUrl}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}

          <div className="animate-fade-in flex flex-col items-center" style={{ animationDelay: '0.4s' }}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">
              <div className="flex items-center justify-center space-x-3 group cursor-default">
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform">✔</span>
                <span className="text-sm font-semibold tracking-wide uppercase">No big audience needed</span>
              </div>
              <div className="flex items-center justify-center space-x-3 group cursor-default">
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform">✔</span>
                <span className="text-sm font-semibold tracking-wide uppercase">Zero ad spend</span>
              </div>
              <div className="flex items-center justify-center space-x-3 group cursor-default">
                <span className="text-orange-500 font-bold text-xl group-hover:scale-125 transition-transform">✔</span>
                <span className="text-sm font-semibold tracking-wide uppercase">Serious coaches only</span>
              </div>
            </div>
            
            <div className="mt-12 flex items-center space-x-2 opacity-60">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
              <p className="text-xs uppercase tracking-[0.3em] text-orange-500 font-black">
                Limited Availability: We only take 3 clients/week
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="h-40"></div>
    </div>
  );
};

export default App;
