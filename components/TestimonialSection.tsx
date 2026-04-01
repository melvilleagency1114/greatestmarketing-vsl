
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';
import Player from '@vimeo/player';

const testimonials = [
  { id: '1179202280', title: 'Coaching Success Story #1', thumbnail: 'https://vumbnail.com/1179202280.jpg' },
  { id: '1179202916', title: 'Coaching Success Story #2', thumbnail: 'https://vumbnail.com/1179202916.jpg' },
  { id: '1171798147', title: 'Coaching Success Story #3', thumbnail: 'https://vumbnail.com/1171798147.jpg' },
  { id: '1179203820', title: 'Coaching Success Story #4', thumbnail: 'https://vumbnail.com/1179203820.jpg' },
  { id: '1179204854', title: 'Coaching Success Story #5', thumbnail: 'https://vumbnail.com/1179204854.jpg' },
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setActiveVideo(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setActiveVideo(null);
  };

  useEffect(() => {
    if (activeVideo && iframeRef.current) {
      const player = new Player(iframeRef.current);
      
      player.on('ended', () => {
        nextSlide();
      });

      return () => {
        player.off('ended');
      };
    }
  }, [activeVideo]);

  return (
    <section className="w-full py-32 space-y-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
      <div className="text-center space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-4">
          Success Stories
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none">
          POWERFUL <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_0_20px_rgba(234,88,12,0.4)]">TESTIMONIALS</span>
        </h2>
        <p className="text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
          We've helped dozens of coaching businesses scale to $50k+/mo by fixing their client acquisition once and for all.
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Carousel Container with intense glow */}
        <div className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-[2.5rem] blur-2xl transition duration-1000 ${activeVideo ? 'opacity-50' : 'opacity-20 group-hover:opacity-40'}`}></div>
          
          <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] shadow-2xl transition-all duration-500 ${activeVideo ? 'shadow-[0_0_50px_rgba(234,88,12,0.3)]' : 'group-hover:shadow-[0_0_30px_rgba(234,88,12,0.15)]'}`}>
            <div className="flex items-center justify-center min-h-[300px] md:min-h-[500px] relative">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="w-full aspect-video relative"
                >
                  {activeVideo === testimonials[currentIndex].id ? (
                    <iframe
                      ref={iframeRef}
                      src={`https://player.vimeo.com/video/${testimonials[currentIndex].id}?autoplay=1&muted=0`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group/video"
                      onClick={() => setActiveVideo(testimonials[currentIndex].id)}
                    >
                      {/* Video Thumbnail Placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                      <div className="absolute inset-0 bg-[#111] flex items-center justify-center overflow-hidden">
                        <img 
                          src={testimonials[currentIndex].thumbnail} 
                          alt={testimonials[currentIndex].title}
                          className="w-full h-full object-cover opacity-60 group-hover/video:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] absolute inset-0"></div>
                      </div>

                      <div className="relative z-20 flex flex-col items-center space-y-8">
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_50px_rgba(234,88,12,0.6)] group-hover/video:shadow-[0_0_80px_rgba(234,88,12,0.9)] transition-all duration-500"
                        >
                          <Play className="text-white fill-white w-10 h-10 md:w-12 md:h-12 ml-1" />
                        </motion.div>
                        <div className="text-center space-y-2">
                          <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                            {testimonials[currentIndex].title}
                          </h3>
                          <p className="text-orange-500 font-bold uppercase tracking-widest text-sm">Click to play success story</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/80 border border-white/10 text-white flex items-center justify-center hover:bg-orange-500 hover:border-orange-400 transition-all duration-300 backdrop-blur-xl shadow-xl"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-black/80 border border-white/10 text-white flex items-center justify-center hover:bg-orange-500 hover:border-orange-400 transition-all duration-300 backdrop-blur-xl shadow-xl"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-10 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setActiveVideo(null);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === index ? 'w-12 bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 'w-4 bg-white/10 hover:bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center space-y-10">
        <motion.a 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="https://greatestmarketingagency.com/testimonials/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center space-x-4 px-12 py-6 bg-orange-600 text-white font-black text-2xl rounded-full hover:bg-orange-500 transition-all duration-500 shadow-[0_0_40px_rgba(234,88,12,0.3)] hover:shadow-[0_0_60px_rgba(234,88,12,0.6)]"
        >
          <span>VIEW MORE TESTIMONIALS</span>
          <ExternalLink className="w-7 h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </motion.a>
        
        <div className="flex items-center space-x-6 opacity-40">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-white"></div>
          <p className="text-sm font-bold tracking-[0.4em] uppercase text-white">
            Proven Results
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-white"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
