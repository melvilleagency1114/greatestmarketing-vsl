
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Quote } from 'lucide-react';

const testimonials = [
  { id: "1179202280", title: "Coaching Success #1" },
  { id: "1179202916", title: "Coaching Success #2" },
  { id: "1171798147", title: "Coaching Success #3" },
  { id: "1179203820", title: "Coaching Success #4" },
  { id: "1179204854", title: "Coaching Success #5" },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <section className="w-full space-y-32 py-20">
      {/* Scarcity Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-orange-600/20 to-transparent border border-orange-500/30 p-12 text-center shadow-[0_0_100px_rgba(234,88,12,0.2)]"
      >
        <div className="absolute -inset-24 bg-orange-600/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          WE ONLY TAKE <span className="text-orange-500 glow-text-orange">3 CLIENTS</span> A WEEK
        </h2>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
          To ensure every coaching business we partner with gets the attention and results they deserve, we strictly limit our intake.
        </p>
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-orange-500/10 rounded-full border border-orange-500/20 shadow-[0_0_20px_rgba(234,88,12,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Current Openings: 1/3</span>
        </motion.div>
      </motion.div>

      {/* Testimonials Section */}
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-black uppercase tracking-[0.2em]"
          >
            <Quote size={14} />
            <span>Success Stories</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            REAL RESULTS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">REAL GROWTH.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            See how we've helped coaching businesses scale their operations and dominate their niche.
          </p>
        </div>

        {/* Slideshow */}
        <div className="relative px-4 md:px-12">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
            <AnimatePresence mode="popLayout">
              {getVisibleTestimonials().map((testimonial, idx) => (
                <motion.div
                  key={`${testimonial.id}-${idx}`}
                  layout
                  initial={{ opacity: 0, x: 50, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="flex-1 min-w-0 group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-400 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <div className="relative aspect-[9/16] md:aspect-[3/4] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-[0_0_40px_rgba(234,88,12,0.15)] group-hover:shadow-[0_0_60px_rgba(234,88,12,0.3)] transition-all duration-500">
                    <iframe
                      src={`https://player.vimeo.com/video/${testimonial.id}?background=0&autoplay=0&muted=1&byline=0&portrait=0&title=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      title={testimonial.title}
                    ></iframe>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-500 hover:border-orange-500 transition-all z-20 backdrop-blur-md"
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-orange-500 hover:border-orange-500 transition-all z-20 backdrop-blur-md"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <motion.a 
            whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(255,255,255,0.4)" }}
            whileTap={{ scale: 0.95 }}
            href="https://greatestmarketingagency.com/testimonials/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center space-x-3 px-12 py-6 bg-white text-black font-black rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            <span className="text-lg tracking-tight">VIEW MORE TESTIMONIALS</span>
            <ExternalLink size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
