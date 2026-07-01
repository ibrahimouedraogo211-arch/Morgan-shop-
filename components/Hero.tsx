import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  const handleScrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('boutique-grid');
    if (target) {
      const offset = 90;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-[#F4F3EE] overflow-hidden">
      {/* Editorial Split Grid */}
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 h-full w-full">
        {/* Left Side Content Placement (Spacer for layout overlay) */}
        <div className="hidden lg:block lg:col-span-5 h-full bg-[#F4F3EE]"></div>
        
        {/* Right Side Editorial Portrait Panel */}
        <div className="col-span-12 lg:col-span-7 relative h-full w-full">
          <motion.div 
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=80"
              alt="Morgan Shop Haute Couture Model"
              className="w-full h-full object-cover object-center brightness-95 filter"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Gentle luxury shadow overlay for smooth text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4F3EE] via-[#F4F3EE]/40 to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4F3EE] via-transparent to-transparent pointer-events-none lg:hidden" />
        </div>
      </div>

      {/* Floating Interactive Copy */}
      <div className="absolute inset-0 flex items-center z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl text-stone-900 mt-20 lg:mt-0">
            {/* Meta category label */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="h-px w-8 bg-stone-400"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-stone-500">
                COLLECTION 2026 • THE NEW SEASON
              </span>
            </motion.div>

            {/* Giant Title */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-950 leading-[1.05] mb-6"
            >
              The Art of <br />
              <span className="italic font-normal text-stone-700 font-serif">Timeless Tailoring</span>
            </motion.h1>

            {/* Editorial Description */}
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-stone-600 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-md"
            >
              A precise study of minimalist cuts, rich biological materials, and classic silhouettes redesigned for high comfort and infinite wearability. Explore bespoke trenches, fine cashmere, and structural blazers.
            </motion.p>

            {/* Premium CTA Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center space-x-6"
            >
              <button
                onClick={handleScrollToProducts}
                className="group px-8 py-3.5 bg-stone-950 hover:bg-stone-850 text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.2em] rounded-full shadow-lg transition-all duration-300 flex items-center gap-3 hover:-translate-y-0.5"
              >
                EXPLORE COLLECTION
                <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Corner Details */}
      <div className="absolute bottom-10 left-10 z-10 hidden xl:flex flex-col text-[10px] tracking-widest text-stone-400 font-sans uppercase">
        <span>ESTABLISHED • PARIS</span>
        <span className="font-serif italic font-normal text-stone-500 mt-1">Made in sustainable ateliers</span>
      </div>

      <div className="absolute bottom-10 right-10 z-10 hidden xl:flex flex-col text-[10px] tracking-widest text-stone-400 font-sans uppercase text-right">
        <span>01 / 04 VOLUME</span>
        <span className="font-serif italic font-normal text-stone-500 mt-1">High fidelity luxury apparel</span>
      </div>
    </section>
  );
};
