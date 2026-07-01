import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface CollectionInfo {
  name: string;
  tagline: string;
  description: string;
  image: string;
  accentColor: string;
}

const COLLECTIONS_INFO: CollectionInfo[] = [
  {
    name: 'Outerwear',
    tagline: 'Timeless Silhouette & Warmth',
    description: 'Our signature trench coats, tailored double-weave crepe blazers, and heritage outerwear designed for elegance and weather protection.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-amber-600/20 text-amber-900 bg-amber-50/50',
  },
  {
    name: 'Knitwear',
    tagline: 'Pure Cashmere & Fine Wool',
    description: 'Crafted from premium long-staple Mongolian cashmere and soft merino wool. Seamless finishes and beautiful ribbed details.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-orange-600/20 text-orange-900 bg-orange-50/50',
  },
  {
    name: 'Dresses',
    tagline: 'Fluid Grace & Soft Silks',
    description: 'From certified mulberry silk slip dresses to structured organic cotton midi wraps. Impeccable drape for sunset to sunrise.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-emerald-600/20 text-emerald-900 bg-emerald-50/50',
  },
  {
    name: 'Apparel',
    tagline: 'Elevated Everyday Essentials',
    description: 'Perfected basics, custom-woven poplin linen shirts, and tailored wide-leg trousers built for effortless modern wardrobes.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-blue-600/20 text-blue-900 bg-blue-50/50',
  },
  {
    name: 'Footwear',
    tagline: 'Italian Leather Craftsmanship',
    description: 'Hand-finished mules, tailored boots, and slides featuring ergonomic cork footbeds and premium certified calfskin leather.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-stone-600/20 text-stone-900 bg-stone-50/50',
  },
  {
    name: 'Accessories',
    tagline: 'The Finishing Editorial Touch',
    description: 'Minimalist smooth-grain leather bags, silk twill scarves, and timeless brass jewelry pieces to elevate any ensemble.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    accentColor: 'border-purple-600/20 text-purple-900 bg-purple-50/50',
  },
];

interface CollectionsDirectoryProps {
  products: Product[];
  onSelectCollection: (category: string) => void;
}

export const CollectionsDirectory: React.FC<CollectionsDirectoryProps> = ({
  products,
  onSelectCollection,
}) => {
  // Count products per category
  const getCount = (catName: string) => {
    return products.filter((p) => p.category.toLowerCase() === catName.toLowerCase()).length;
  };

  return (
    <div id="collections-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-[11px] font-bold tracking-[0.3em] text-stone-400 uppercase flex items-center justify-center gap-2">
          <Sparkles size={12} className="text-amber-500" /> THE DESIGN CODES
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-stone-900 tracking-tight leading-tight">
          Explore Our <span className="font-semibold">Seasonal Collections</span>
        </h1>
        <p className="text-sm text-stone-500 font-sans leading-relaxed">
          Each capsule represents hours of meticulous pattern drafting, responsible raw fabric sourcing, and hand-tailored finishes. Click any collection to view the curated range.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COLLECTIONS_INFO.map((collection, index) => {
          const count = getCount(collection.name);
          return (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => onSelectCollection(collection.name)}
              className="group cursor-pointer bg-white border border-stone-200/80 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-stone-100">
                <img
                  src={collection.image}
                  alt={`${collection.name} Collection`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-950/20 to-transparent" />
                
                {/* Float badges */}
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${collection.accentColor} backdrop-blur-md`}>
                    {collection.tagline}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-stone-150 text-[10px] font-semibold text-stone-800 tracking-wider">
                  {count} {count === 1 ? 'Piece' : 'Pieces'}
                </div>
              </div>

              {/* Text Description Content */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-stone-700 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                <div className="flex items-center text-xs font-bold tracking-wider text-stone-900 uppercase group-hover:translate-x-2 transition-transform duration-300">
                  <span>Browse Curation</span>
                  <ArrowRight size={14} className="ml-2 text-stone-600 group-hover:text-stone-900" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Seasonal Campaign Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white p-8 sm:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 border border-stone-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
          <span className="text-[10px] font-bold tracking-[0.3em] text-amber-500 uppercase">THE MORGAN MANIFESTO</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light leading-tight">
            Designed for <span className="italic font-normal">Living</span>. Crafted for <span className="font-bold">Generations</span>.
          </h2>
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            We reject the rapid churn of fast fashion. Our designs embrace architectural simplicity, clean geometric lines, and ethical luxury that values the hands of the maker as much as the hand of the wearer.
          </p>
        </div>

        <button
          onClick={() => onSelectCollection('All')}
          className="z-10 w-full sm:w-auto px-8 py-4 bg-white text-stone-950 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          <span>View Complete Catalog</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
