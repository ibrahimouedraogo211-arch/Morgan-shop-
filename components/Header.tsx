import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onSearch: (term: string) => void;
  searchTerm: string;
}

export const Header: React.FC<HeaderProps> = ({
  cart,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onSearch,
  searchTerm
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const categories = ['All', 'Collections', 'Outerwear', 'Knitwear', 'Dresses', 'Apparel', 'Footwear', 'Accessories'];

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#F9F8F4]/95 border-b border-stone-200/50 backdrop-blur-md py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Trigger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
              className="p-2 -ml-2 text-stone-700 hover:text-stone-900 md:hidden transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Navigation Links - Left (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {categories.slice(0, 5).map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 relative py-1 ${
                    activeCategory === cat
                      ? 'text-stone-900 font-bold'
                      : cat === 'Collections'
                      ? 'text-stone-600 hover:text-stone-950 font-semibold'
                      : 'text-stone-500 hover:text-stone-950'
                  }`}
                >
                  {cat === 'All' ? 'Shop All' : cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-900 animate-slide-in" />
                  )}
                  {cat === 'Collections' && activeCategory !== 'Collections' && (
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Luxury Brand Logo - Center */}
            <div className="flex-1 md:flex-initial text-center md:text-left">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('All');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block group"
              >
                <span className="font-serif font-bold text-2xl tracking-[0.25em] text-stone-950 transition-all duration-300 group-hover:opacity-80">
                  MORGAN
                </span>
                <span className="block text-[0.55rem] tracking-[0.4em] uppercase text-stone-400 font-sans -mt-1 font-bold">
                  SHOP
                </span>
              </a>
            </div>

            {/* Navigation & Controls - Right */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Toggle */}
              <div className="relative">
                <div className={`flex items-center transition-all duration-300 ${searchOpen ? 'w-48 sm:w-64 border-b border-stone-300 px-2 py-1' : 'w-10'}`}>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 text-stone-700 hover:text-stone-950 transition-colors"
                    aria-label="Search items"
                  >
                    <Search size={19} />
                  </button>
                  {searchOpen && (
                    <input
                      type="text"
                      placeholder="Search collection..."
                      value={searchTerm}
                      onChange={(e) => onSearch(e.target.value)}
                      className="bg-transparent border-none outline-none text-xs w-full text-stone-800 placeholder-stone-400 font-sans"
                      autoFocus
                    />
                  )}
                  {searchOpen && searchTerm && (
                    <button
                      onClick={() => onSearch('')}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Shopping Bag Trigger */}
              <button
                id="bag-trigger-btn"
                onClick={onOpenCart}
                className="p-2 text-stone-700 hover:text-stone-950 relative transition-all duration-300 hover:scale-105"
                aria-label="View shopping bag"
              >
                <ShoppingBag size={20} />
                {totalCartItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-stone-900 text-white rounded-full flex items-center justify-center text-[9px] font-bold font-sans animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-nav-drawer">
          <div
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
          />

          <div className="relative flex flex-col w-full max-w-xs bg-[#F9F8F4] h-full p-6 shadow-2xl overflow-y-auto animate-slide-in-left">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
              <span className="font-serif font-bold text-xl tracking-widest text-stone-950">MORGAN</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-stone-600 hover:text-stone-900 rounded-full border border-stone-200/60"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col space-y-5">
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">COLLECTIONS</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm tracking-widest uppercase py-1 flex items-center justify-between ${
                    activeCategory === cat ? 'text-stone-900 font-bold border-l-2 border-stone-900 pl-3' : 'text-stone-600 pl-3'
                  }`}
                >
                  <span>{cat === 'All' ? 'Shop All' : cat}</span>
                  {cat === 'Collections' && activeCategory !== 'Collections' && (
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 animate-ping" />
                  )}
                </button>
              ))}
            </div>

            <div className="mt-auto border-t border-stone-200 pt-6 space-y-4">
              <div className="bg-stone-100 p-4 rounded-lg">
                <p className="text-xs font-semibold text-stone-800">FREE STANDARD DELIVERY</p>
                <p className="text-[10px] text-stone-500 mt-1">On all orders over $150. Easy returns within 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
