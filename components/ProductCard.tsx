import React from 'react';
import { Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5 }}
      id={`product-card-${product.id}`}
      className="group flex flex-col w-full max-w-full box-border bg-white overflow-hidden border border-stone-200/50 shadow-sm hover:shadow-md transition-all duration-300 rounded-lg"
    >
      {/* Image container with hover overlays */}
      <div className="relative overflow-hidden aspect-[3/4] bg-stone-100 cursor-pointer w-full max-w-full box-border" onClick={() => onOpenDetails(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Brand Tag (if featured) */}
        {product.featured && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-stone-900 text-[#F9F8F4] text-[9px] font-bold tracking-[0.15em] uppercase rounded-full">
            Featured
          </span>
        )}

        {/* Hover Option Overlay */}
        <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            id={`quick-view-${product.id}`}
            className="px-6 py-2.5 bg-[#F9F8F4] text-stone-900 rounded-full text-xs font-semibold uppercase tracking-[0.15em] shadow-lg hover:bg-stone-900 hover:text-white transition-all duration-300 flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0"
          >
            <Eye size={13} />
            Quick View
          </button>
        </div>
      </div>

      {/* Description & metadata panel */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        {/* Category & stars */}
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-stone-400 uppercase">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={10} className="sm:w-[11px] sm:h-[11px]" fill="currentColor" />
            <span className="text-[9px] sm:text-[10px] font-semibold text-stone-600 font-sans">{product.rating}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onOpenDetails(product)}
          className="font-serif text-sm sm:text-base font-semibold text-stone-950 hover:text-stone-700 transition-colors cursor-pointer leading-snug line-clamp-1 mb-1 sm:mb-2"
        >
          {product.name}
        </h3>

        {/* Color swatches preview */}
        <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
          {product.colors.map((col) => (
            <span
              key={col.name}
              title={col.name}
              style={{ backgroundColor: col.hex }}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full border border-stone-300"
            />
          ))}
        </div>

        {/* Price & Size Previews */}
        <div className="mt-auto pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-semibold text-stone-900 font-sans">
            £{product.price.toFixed(2)}
          </span>
          <div className="hidden sm:flex gap-1">
            {product.sizes.slice(0, 3).map((sz) => (
              <span
                key={sz}
                className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded border border-stone-200/40 font-sans uppercase font-medium"
              >
                {sz}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-400 rounded font-sans uppercase font-medium">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
