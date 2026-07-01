import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart, Anchor, ShieldCheck, Leaf, Feather } from 'lucide-react';

export const StorySection: React.FC = () => {
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

      {/* Narrative Section - Staggered Premium Lookbook Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20 md:space-y-32">
        
        {/* CHAPTER I: Heritage */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Image Pane */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-6 relative h-80 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl group bg-stone-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1558137623-ce933996c730?auto=format&fit=crop&w=1200&q=85"
              alt="Morgan Atelier Workspace"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-500" />
          </motion.div>

          {/* Text Pane */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-amber-600 uppercase block">CHAPTER I</span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-stone-950">
                Born in <span className="font-semibold italic">Liverpool</span>, Built for the World
              </h3>
            </div>
            
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              In our quiet atelier located at <strong>25 Lyra Road, Liverpool</strong>, we set out with a simple blueprint: restore the deliberate slowness of historic tailoring. Rejecting the automated, high-waste output of modern mass fashion, our designers' drafting tables remain the heart of our operations.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              Every curve of our lapels, selection of buttons, and width of pockets are measured repeatedly to ensure comfort, functionality, and lasting grace.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-stone-700 uppercase tracking-widest">
              <Anchor size={14} className="text-amber-600" />
              <span>ESTABLISHED 2026 • UNITED KINGDOM</span>
            </div>
          </motion.div>
        </div>

        {/* CHAPTER II: Sourcing (Alternated Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Text Pane - First on desktop */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-6 order-2 md:order-1 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-amber-600 uppercase block">CHAPTER II</span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-stone-950">
                Meticulous Material <span className="font-semibold italic">Sourcing</span>
              </h3>
            </div>
            
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              We spend months tracking the pedigree of our raw fibers. Our long-staple cashmeres are sourced responsibly from historic Mongolian grasslands; our crisp, fluid silks are certified organic twills; and our calfskin leather comes from accredited Tuscan tanneries that treat water safety as an absolute priority.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              By working strictly with carbon-certified yarn-spinners, we guarantee that your garment does not leave a heavy footprint behind.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-stone-700 uppercase tracking-widest">
              <Leaf size={14} className="text-emerald-600" />
              <span>100% CERTIFIED ORGANIC & CONSCIOUS</span>
            </div>
          </motion.div>

          {/* Image Pane - Second on desktop */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-6 order-1 md:order-2 relative h-80 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl group bg-stone-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=1200&q=85"
              alt="Natural Fibers Sourcing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-500" />
          </motion.div>
        </div>

        {/* CHAPTER III: Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Image Pane */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:col-span-6 relative h-80 sm:h-96 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-xl group bg-stone-200"
          >
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
              alt="Tailored Generational Silhouette"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors duration-500" />
          </motion.div>

          {/* Text Pane */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="md:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-[0.25em] text-amber-600 uppercase block">CHAPTER III</span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-stone-950">
                Designed for <span className="font-semibold italic">Living</span>, Built to <span className="font-semibold">Endure</span>
              </h3>
            </div>
            
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              The modern wardrobe should consist of pieces that grow softer, more characterful, and carry memory. We believe that a double-breasted coat or silk dress purchased today should find its way into the hands of your child or friend thirty years from now, retaining its luxury finish and elegance.
            </p>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              We offer free lifetime repairs and fit adjustments for all local orders at our Liverpool shop, honoring the bond between owner, garment, and maker.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-stone-700 uppercase tracking-widest">
              <ShieldCheck size={14} className="text-amber-600" />
              <span>THE MORGAN GENERATIONAL MANIFESTO</span>
            </div>
          </motion.div>
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
