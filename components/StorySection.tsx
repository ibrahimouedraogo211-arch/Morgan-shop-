import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Heart, Anchor, ShieldCheck, Leaf, Feather, ArrowDown } from 'lucide-react';

export const StorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracker tied perfectly to the scrolling narrative block (used for desktop sticky effect)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth background transitions with scale effects
  const opacityImg1 = useTransform(scrollYProgress, [0, 0.26, 0.34], [1, 1, 0]);
  const scaleImg1 = useTransform(scrollYProgress, [0, 0.34], [1.1, 1.02]);

  const opacityImg2 = useTransform(scrollYProgress, [0.26, 0.34, 0.60, 0.68], [0, 1, 1, 0]);
  const scaleImg2 = useTransform(scrollYProgress, [0.26, 0.68], [1.12, 1.03]);

  // Image 3 fades out completely at the end (0.90 to 0.98) so it transitions back to the light page footer elegantly
  const opacityImg3 = useTransform(scrollYProgress, [0.60, 0.68, 0.90, 0.98], [0, 1, 1, 0]);
  const scaleImg3 = useTransform(scrollYProgress, [0.60, 0.98], [1.15, 1.04]);

  // Dynamic Scroll-linked Opacities and Positions for each card on desktop
  const opacityCard1 = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.32], [0, 1, 1, 0]);
  const yCard1 = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.32], [60, 0, 0, -60]);

  const opacityCard2 = useTransform(scrollYProgress, [0.26, 0.34, 0.58, 0.66], [0, 1, 1, 0]);
  const yCard2 = useTransform(scrollYProgress, [0.26, 0.34, 0.58, 0.66], [60, 0, 0, -60]);

  const opacityCard3 = useTransform(scrollYProgress, [0.60, 0.68, 0.90, 0.98], [0, 1, 1, 0]);
  const yCard3 = useTransform(scrollYProgress, [0.60, 0.68, 0.90, 0.98], [60, 0, 0, -60]);

  // Immersive active HUD navigation indicator highlights
  const indicatorColor1 = useTransform(scrollYProgress, [0, 0.30], ["#D97706", "#44403C"]);
  const indicatorColor2 = useTransform(scrollYProgress, [0.26, 0.34, 0.64], ["#44403C", "#D97706", "#44403C"]);
  const indicatorColor3 = useTransform(scrollYProgress, [0.60, 0.68, 0.94], ["#44403C", "#D97706", "#44403C"]);

  return (
    <div id="about-us-story" className="bg-[#F4F2EC] font-sans overflow-hidden">
      
      {/* Editorial Chapter Header (Intro Section) */}
      <div className="bg-[#F4F2EC] py-16 md:py-24 text-center space-y-4 px-4">
        <span className="text-[11px] font-bold tracking-[0.3em] text-amber-600 uppercase flex items-center justify-center gap-2">
          <Compass size={12} className="text-amber-600 animate-spin-slow" /> OUR HERITAGE & VISION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-stone-900 tracking-tight leading-tight">
          The Story of <span className="font-semibold italic">Morgan Shop</span>
        </h2>
        <div className="h-[1px] w-20 bg-stone-300 mx-auto my-6" />
        <p className="text-xs sm:text-sm md:text-base text-stone-600 font-sans leading-relaxed max-w-2xl mx-auto italic">
          "We do not design garments to capture fleeting trends. We sketch, cut, and seam to define timeless architecture for the human form."
        </p>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE RESPONSIVE NARRATIVE: Simple, gorgeous, vertical list layout (< md) */}
      {/* ========================================================================= */}
      <div className="block md:hidden space-y-12 px-4 pb-16 bg-[#F4F2EC]">
        
        {/* Chapter I Card & Image */}
        <div className="space-y-4">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1558137623-ce933996c730?auto=format&fit=crop&w=800&q=80"
              alt="Morgan Atelier Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="text-[9px] font-bold tracking-[0.2em] text-amber-600 uppercase block">CHAPTER I</span>
            <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
              Born in Liverpool, Built for the World
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              In our quiet atelier located at <strong>25 Lyra Road, Liverpool</strong>, we set out with a simple blueprint: restore the deliberate slowness of historic tailoring. Rejecting the automated, high-waste output of modern mass fashion, our designers' drafting tables remain the heart of our operations.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[9px] font-bold text-stone-500 uppercase tracking-wider">
              <Anchor size={11} className="text-amber-600" />
              <span>ESTABLISHED 2026 • UNITED KINGDOM</span>
            </div>
          </div>
        </div>

        {/* Chapter II Card & Image */}
        <div className="space-y-4">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=800&q=80"
              alt="Natural Fibers Sourcing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
            <span className="text-[9px] font-bold tracking-[0.2em] text-amber-600 uppercase block">CHAPTER II</span>
            <h3 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
              Meticulous Material Sourcing
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              We spend months tracking the pedigree of our raw fibers. Our long-staple cashmeres are sourced responsibly from historic Mongolian grasslands; our crisp, fluid silks are certified organic twills; and our calfskin leather comes from accredited Tuscan tanneries that treat water safety as an absolute priority.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[9px] font-bold text-stone-500 uppercase tracking-wider">
              <Leaf size={11} className="text-emerald-600" />
              <span>100% CERTIFIED ORGANIC & CONSCIOUS</span>
            </div>
          </div>
        </div>

        {/* Chapter III Card & Image */}
        <div className="space-y-4">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
              alt="Tailored Generational Silhouette"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/40" />
          </div>
          <div className="bg-stone-950 text-white p-6 rounded-2xl border border-stone-800 shadow-md space-y-3">
            <span className="text-[9px] font-bold tracking-[0.2em] text-amber-500 uppercase block">CHAPTER III</span>
            <h3 className="font-serif text-xl font-semibold text-stone-100 leading-snug">
              Designed for Living, Built to Endure
            </h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              The modern wardrobe should consist of pieces that grow softer, more characterful, and carry memory. We believe that a double-breasted coat or silk dress purchased today should find its way into the hands of your child or friend thirty years from now, retaining its luxury finish and elegance.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[9px] font-bold text-amber-500 uppercase tracking-wider">
              <ShieldCheck size={11} className="text-amber-500" />
              <span>THE MORGAN GENERATIONAL MANIFESTO</span>
            </div>
          </div>
        </div>

      </div>


      {/* ========================================================================= */}
      {/* DESKTOP IMMERSIVE NARRATIVE: Full sticky viewport timelines (>= md)       */}
      {/* ========================================================================= */}
      <div ref={containerRef} className="hidden md:block relative h-[300vh] w-full bg-stone-950">
        
        {/* Sticky stage containing background cross-fades and centered scroll-linked text cards */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* ==================== BACKGROUND CROSS-FADE STACKS ==================== */}
          
          {/* Slide 1 Image */}
          <motion.div style={{ opacity: opacityImg1 }} className="absolute inset-0 w-full h-full">
            <motion.img 
              style={{ scale: scaleImg1 }}
              src="https://images.unsplash.com/photo-1558137623-ce933996c730?auto=format&fit=crop&w=1800&q=80"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              alt="Morgan Atelier Workspace"
            />
            <div className="absolute inset-0 bg-stone-950/60 mix-blend-multiply" />
          </motion.div>

          {/* Slide 2 Image */}
          <motion.div style={{ opacity: opacityImg2 }} className="absolute inset-0 w-full h-full">
            <motion.img 
              style={{ scale: scaleImg2 }}
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1800&q=80"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              alt="Natural Fibers Sourcing"
            />
            <div className="absolute inset-0 bg-stone-950/65 mix-blend-multiply" />
          </motion.div>

          {/* Slide 3 Image */}
          <motion.div style={{ opacity: opacityImg3 }} className="absolute inset-0 w-full h-full">
            <motion.img 
              style={{ scale: scaleImg3 }}
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=80"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              alt="Tailored Generational Silhouette"
            />
            <div className="absolute inset-0 bg-stone-950/65 mix-blend-multiply" />
          </motion.div>


          {/* ==================== SEAMLESS STICKY DESCRIPTION CARDS ==================== */}

          {/* Chapter 1 Card */}
          <motion.div 
            style={{ opacity: opacityCard1, y: yCard1 }}
            className="absolute max-w-xl mx-4 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-stone-200 shadow-2xl space-y-4 text-left z-10"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-amber-600 uppercase block">CHAPTER I</span>
            <h3 className="font-serif text-3xl font-light leading-tight text-stone-900">
              Born in <span className="font-semibold text-stone-950">Liverpool</span>, Built for the World
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              In our quiet atelier located at <strong>25 Lyra Road, Liverpool</strong>, we set out with a simple blueprint: restore the deliberate slowness of historic tailoring. Rejecting the automated, high-waste output of modern mass fashion, our designers' drafting tables remain the heart of our operations.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              <Anchor size={12} className="text-amber-600" />
              <span>ESTABLISHED 2026 • UNITED KINGDOM</span>
            </div>
          </motion.div>

          {/* Chapter 2 Card */}
          <motion.div 
            style={{ opacity: opacityCard2, y: yCard2 }}
            className="absolute max-w-xl mx-4 bg-white/95 backdrop-blur-md p-12 rounded-3xl border border-stone-200 shadow-2xl space-y-4 text-left z-10"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-amber-600 uppercase block">CHAPTER II</span>
            <h3 className="font-serif text-3xl font-light leading-tight text-stone-900">
              Meticulous Material <span className="font-semibold italic text-stone-950">Sourcing</span>
            </h3>
            <p className="text-xs text-stone-600 font-sans leading-relaxed">
              We spend months tracking the pedigree of our raw fibers. Our long-staple cashmeres are sourced responsibly from historic Mongolian grasslands; our crisp, fluid silks are certified organic twills; and our calfskin leather comes from accredited Tuscan tanneries that treat water safety as an absolute priority.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-stone-500 uppercase tracking-widest">
              <Leaf size={12} className="text-emerald-600" />
              <span>100% CERTIFIED ORGANIC & CONSCIOUS</span>
            </div>
          </motion.div>

          {/* Chapter 3 Card */}
          <motion.div 
            style={{ opacity: opacityCard3, y: yCard3 }}
            className="absolute max-w-xl mx-4 bg-stone-950/95 text-white backdrop-blur-md p-12 rounded-3xl border border-stone-800 shadow-2xl space-y-4 text-left z-10"
          >
            <span className="text-[9px] font-bold tracking-[0.25em] text-amber-500 uppercase block">CHAPTER III</span>
            <h3 className="font-serif text-3xl font-light leading-tight text-stone-100">
              Designed for <span className="font-normal italic text-amber-500">Living</span>, Built to <span className="font-bold text-white">Endure</span>
            </h3>
            <p className="text-xs text-stone-300 font-sans leading-relaxed">
              The modern wardrobe should consist of pieces that grow softer, more characterful, and carry memory. We believe that a double-breasted coat or silk dress purchased today should find its way into the hands of your child or friend thirty years from now, retaining its luxury finish and elegance.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-amber-500" />
              <span>THE MORGAN GENERATIONAL MANIFESTO</span>
            </div>
          </motion.div>


          {/* ==================== IMMERSIVE HUD INDICATORS ==================== */}
          
          <div className="absolute right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-5">
            <div className="flex items-center justify-end gap-3 group cursor-pointer">
              <span className="text-[9px] font-mono tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">HERITAGE</span>
              <motion.div style={{ backgroundColor: indicatorColor1 }} className="w-2 h-2 rounded-full ring-2 ring-white/10" />
            </div>
            <div className="flex items-center justify-end gap-3 group cursor-pointer">
              <span className="text-[9px] font-mono tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">SOURCING</span>
              <motion.div style={{ backgroundColor: indicatorColor2 }} className="w-2 h-2 rounded-full ring-2 ring-white/10" />
            </div>
            <div className="flex items-center justify-end gap-3 group cursor-pointer">
              <span className="text-[9px] font-mono tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">MANIFESTO</span>
              <motion.div style={{ backgroundColor: indicatorColor3 }} className="w-2 h-2 rounded-full ring-2 ring-white/10" />
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/40 text-[9px] font-bold tracking-[0.3em] uppercase z-10 animate-bounce pointer-events-none">
            SCROLL TO CHRONICLE
          </div>

        </div>
      </div>

      {/* Sustainable Commitment Footer Accent (Regular Scroll) */}
      <div className="bg-[#F4F2EC] py-20 md:py-24 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <Heart size={20} className="text-rose-600 animate-pulse mx-auto" />
          <h4 className="font-serif text-2xl font-light text-stone-900">
            Our Pledge to <span className="font-semibold italic">Sustainable Futures</span>
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed font-sans">
            From plastic-free compostable garment wrapping paper to ethical workshop wages, we strive to make Morgan Shop a blueprint of how modern retail can co-exist harmoniously with nature and local communities.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-4 text-[10px] text-stone-500 font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Feather size={12} className="text-amber-600" /> BIODEGRADABLE WRAP</span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-amber-600" /> LIVING WAGE HUB</span>
          </div>
        </div>
      </div>

    </div>
  );
};
