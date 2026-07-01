/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetails } from './components/ProductDetails';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './components/Checkout';
import { Confirmation } from './components/Confirmation';
import { CollectionsDirectory } from './components/CollectionsDirectory';
import { HelpModal, HelpTab } from './components/HelpModal';
import { StorySection } from './components/StorySection';
import { PRODUCTS } from './products';
import { Product, CartItem, ShippingDetails, PaymentDetails, Review } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Shield, RefreshCw, Sparkles, Filter, CheckCircle } from 'lucide-react';

const App: React.FC = () => {
  // Products catalog in local state (enables dynamic review appending)
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  
  // Navigation & Browsing filters
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Shopping Bag States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState<boolean>(false);

  // Active Selected Product Detail Slideover
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Checkout Stage Flow Management
  const [checkoutStage, setCheckoutStage] = useState<'browsing' | 'checkout' | 'confirmed'>('browsing');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Help Modal active state
  const [helpModalTab, setHelpModalTab] = useState<HelpTab | null>(null);

  // Load cart from local storage on startup (robust client persistence)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('morgan_cart');
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Could not load cart from localStorage', e);
    }
  }, []);

  // Save cart to local storage whenever it changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('morgan_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Could not save cart to localStorage', e);
    }
  };

  // Add Item to Bag
  const handleAddToBag = (
    product: Product,
    size: string,
    color: { name: string; hex: string },
    quantity: number
  ) => {
    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor.name === color.name
    );

    let updatedCart: CartItem[] = [];
    if (existingIndex >= 0) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    }
    saveCart(updatedCart);
    
    // Automatically open the shopping bag drawer and close the details view for direct feedback
    setSelectedProduct(null);
    setCartOpen(true);
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (index: number, qty: number) => {
    if (qty <= 0) return;
    const updated = cart.map((item, idx) =>
      idx === index ? { ...item, quantity: qty } : item
    );
    saveCart(updated);
  };

  // Remove Item from Cart
  const handleRemoveCartItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    saveCart(updated);
  };

  // Submit dynamic review (fully interactive!)
  const handleAddReview = (productId: string, review: Review) => {
    const updated = productsList.map((prod) => {
      if (prod.id === productId) {
        const nextReviews = [review, ...prod.reviews];
        // Recalculate average star rating
        const totalStars = nextReviews.reduce((sum, r) => sum + r.rating, 0);
        const nextRating = parseFloat((totalStars / nextReviews.length).toFixed(1));
        return {
          ...prod,
          reviews: nextReviews,
          rating: nextRating,
        };
      }
      return prod;
    });

    setProductsList(updated);

    // If active product detail drawer is open, keep its state synchronized!
    if (selectedProduct && selectedProduct.id === productId) {
      const found = updated.find((p) => p.id === productId);
      if (found) {
        setSelectedProduct(found);
      }
    }
  };

  // Filter and Sort Processing
  const processedProducts = React.useMemo(() => {
    let result = [...productsList];

    // 1. Filter by category
    if (activeCategory !== 'All' && activeCategory !== 'Collections') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // 2. Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.materials.toLowerCase().includes(term)
      );
    }

    // 3. Apply sorting rule
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // default: featured items first, then ID order
      result.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.id.localeCompare(b.id);
      });
    }

    return result;
  }, [productsList, activeCategory, searchTerm, sortBy]);

  // Proceed from bag slide-over to full checkout view
  const handleProceedToCheckout = (discountAmt: number, discountCd: string) => {
    setDiscountAmount(discountAmt);
    setDiscountCode(discountCd);
    setCartOpen(false);
    setCheckoutStage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete formal purchase order
  const handleCompleteOrder = (shipping: ShippingDetails, payment: PaymentDetails) => {
    setShippingDetails(shipping);
    setPaymentDetails(payment);
    setCheckoutStage('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Empty cart and restart boutique browsing state
  const handleContinueShopping = () => {
    setCart([]);
    localStorage.removeItem('morgan_cart');
    setShippingDetails(null);
    setPaymentDetails(null);
    setDiscountAmount(0);
    setDiscountCode('');
    setActiveCategory('All');
    setCheckoutStage('browsing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle newsletter submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <div className="min-h-screen w-full bg-[#F9F8F4] text-stone-800 selection:bg-stone-900 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Luxurious Navigation Header */}
      <Header
        cart={cart}
        onOpenCart={() => setCartOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setCheckoutStage('browsing');
        }}
        activeCategory={activeCategory}
        onSearch={setSearchTerm}
        searchTerm={searchTerm}
      />

      {checkoutStage === 'browsing' ? (
        activeCategory === 'Collections' ? (
          <div className="pt-24 pb-16 flex-1">
            <CollectionsDirectory
              products={productsList}
              onSelectCollection={(category) => {
                setActiveCategory(category);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        ) : (
          <>
            {/* Main Hero Banner Editorial */}
            <Hero />

            {/* Boutique Catalog Segment */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 space-y-10" id="boutique-grid">
            {/* Filter and Sorting Header Panel */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-6 gap-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold tracking-[0.25em] text-stone-400 uppercase">MORGAN BOUTIQUE</span>
                <h2 className="font-serif text-3xl font-bold text-stone-950">
                  {activeCategory === 'All' ? 'Complete Collection' : `${activeCategory} Curation`}
                </h2>
                {searchTerm && (
                  <p className="text-xs text-stone-500 font-sans">
                    Showing results for <strong className="text-stone-800 font-semibold">"{searchTerm}"</strong>
                  </p>
                )}
              </div>

              {/* Sorting selectors and count */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                <span className="text-stone-400 font-medium">
                  {processedProducts.length} {processedProducts.length === 1 ? 'item' : 'items'} found
                </span>
                
                <div className="flex items-center gap-2 border border-stone-200 bg-white px-3 py-1.5 rounded-md">
                  <Filter size={12} className="text-stone-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none outline-none font-semibold text-stone-700 cursor-pointer text-xs"
                  >
                    <option value="featured">Featured First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Main grid of cards */}
            {processedProducts.length === 0 ? (
              <div className="text-center py-24 space-y-4">
                <div className="text-stone-300 font-serif text-5xl">∅</div>
                <div className="space-y-1">
                  <p className="font-serif text-lg font-bold text-stone-850">No pieces match your query</p>
                  <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                    Try adjusting your search terms or filter tags to discover other tailored designs from our studio.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="px-6 py-2 bg-stone-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {processedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onOpenDetails={(p) => setSelectedProduct(p)}
                  />
                ))}
              </div>
            )}

            {/* Trust Badges - Why shop Morgan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 border-t border-stone-200">
              <div className="flex gap-4 items-start p-5 bg-white rounded-xl border border-stone-150 shadow-xs">
                <div className="p-3 bg-stone-100 rounded-lg text-stone-800 flex-shrink-0">
                  <Shield size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-900">Tailored Longevity</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Crafted from certified organic raw materials designed to withstand generations of wear with absolute grace.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-5 bg-white rounded-xl border border-stone-150 shadow-xs">
                <div className="p-3 bg-stone-100 rounded-lg text-stone-800 flex-shrink-0">
                  <RefreshCw size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-900">Complimentary Return Loops</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Request prepaid return envelopes and size swaps within 30 days of arrival with no questions asked.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-5 bg-white rounded-xl border border-stone-150 shadow-xs">
                <div className="p-3 bg-stone-100 rounded-lg text-stone-800 flex-shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-sm text-stone-900">European Workmanship</h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-sans">
                    Hand-finished in family-owned Portuguese and Italian tailoring houses honoring historical expertise.
                  </p>
                </div>
              </div>
            </div>

            {/* Elegant Newsletter Form with Promo Code Hook */}
            <div className="bg-stone-900 rounded-2xl text-white p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%) pointer-events-none" />
              
              <div className="space-y-2 max-w-md text-center md:text-left">
                <span className="text-[10px] font-bold tracking-[0.25em] text-amber-500 uppercase">MEMBER BENEFITS</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">Join the Morgan Circle</h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed font-sans">
                  Subscribe to receive seasonal invitations, pre-sale launch keys, and dynamic editorial insights.
                  Get <strong className="text-white font-semibold">10% off</strong> your first order immediately upon signup!
                </p>
              </div>

              <div className="w-full max-w-sm">
                {newsletterSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 border border-white/10 p-5 rounded-lg space-y-3 text-center sm:text-left"
                  >
                    <p className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5 leading-none">
                      <CheckCircle size={14} className="text-emerald-500" />
                      WELCOME TO MORGAN SHOP
                    </p>
                    <p className="text-[11px] text-stone-300">
                      Use coupon code <strong className="text-white font-mono font-bold bg-stone-800 px-2 py-0.5 rounded tracking-wider">WELCOME10</strong> in your shopping bag to receive 10% off your purchase.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-white rounded text-xs outline-none focus:border-white placeholder-stone-500 font-sans"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-white hover:bg-stone-200 text-stone-900 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </main>

          <StorySection />
        </>
      ) ) : checkoutStage === 'checkout' ? (
        <Checkout
          cart={cart}
          discountAmount={discountAmount}
          discountCode={discountCode}
          onBack={() => setCheckoutStage('browsing')}
          onCompleteOrder={handleCompleteOrder}
        />
      ) : (
        <Confirmation
          cart={cart}
          shipping={shippingDetails!}
          payment={paymentDetails!}
          discountAmount={discountAmount}
          discountCode={discountCode}
          onContinueShopping={handleContinueShopping}
        />
      )}

      {/* Drawer Components overlay */}
      <AnimatePresence>
        {/* Selected item Specifications details */}
        {selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToBag={handleAddToBag}
            onAddReview={handleAddReview}
          />
        )}

        {/* Floating Cart Drawer list */}
        {cartOpen && (
          <CartDrawer
            cart={cart}
            onClose={() => setCartOpen(false)}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveCartItem}
            onProceedToCheckout={handleProceedToCheckout}
          />
        )}

        {/* Dynamic Help Center Modal overlays */}
        {helpModalTab && (
          <HelpModal
            activeTab={helpModalTab}
            onClose={() => setHelpModalTab(null)}
          />
        )}
      </AnimatePresence>

      {/* Modern footer */}
      <footer className="w-full bg-stone-950 text-stone-400 py-12 border-t border-stone-850 mt-16 print:hidden font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-serif font-bold text-xl tracking-[0.2em] text-white">MORGAN</span>
            <p className="text-[11px] text-stone-500 leading-relaxed max-w-xs">
              A bespoke luxury project dedicated to the craft of tailoring, material purity, and modular e-commerce architecture. Made in sustainable European workshops.
            </p>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">COLLECTIONS</h4>
            <ul className="space-y-2 text-[11px] text-stone-500">
              <li><button onClick={() => { setActiveCategory('Outerwear'); setCheckoutStage('browsing'); }} className="hover:text-white transition-colors">Trench Coats & Blazers</button></li>
              <li><button onClick={() => { setActiveCategory('Knitwear'); setCheckoutStage('browsing'); }} className="hover:text-white transition-colors">Cashmere & Fine Wool</button></li>
              <li><button onClick={() => { setActiveCategory('Dresses'); setCheckoutStage('browsing'); }} className="hover:text-white transition-colors">Mulberry Silk Apparel</button></li>
              <li><button onClick={() => { setActiveCategory('Accessories'); setCheckoutStage('browsing'); }} className="hover:text-white transition-colors">Leather Totes & Jewelry</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">HELP & SECURE</h4>
            <ul className="space-y-2 text-[11px] text-stone-500">
              <li><button onClick={() => setHelpModalTab('track')} className="hover:text-white transition-colors text-left">Track Shipment Route</button></li>
              <li><button onClick={() => setHelpModalTab('returns')} className="hover:text-white transition-colors text-left">Prepaid Returns Center</button></li>
              <li><button onClick={() => setHelpModalTab('size')} className="hover:text-white transition-colors text-left">Size Guide Assistance</button></li>
              <li><button onClick={() => setHelpModalTab('ssl')} className="hover:text-white transition-colors text-left">SSL Financial Transactions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">ATELIER OFFICE</h4>
            <ul className="space-y-1.5 text-[11px] text-stone-500">
              <li>Morgan Shop Atelier</li>
              <li>25 Lyra Road</li>
              <li>Liverpool, L22 0NT</li>
              <li>United Kingdom</li>
              <li className="pt-2 font-mono text-stone-600">contact@morganshop.co.uk</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-stone-900/80 flex flex-col sm:flex-row items-center justify-between text-[10px] text-stone-600">
          <div className="text-center sm:text-left">
            <p>© 2026 Morgan Shop. All rights reserved. Registered under UK Business Code.</p>
            <p className="mt-1 text-[11px] text-stone-500 font-medium italic">Designed with love by Anthonius Croese</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms of Booking</a>
            <span>•</span>
            <a href="#" className="hover:text-stone-400 transition-colors">Cookie Controls</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
