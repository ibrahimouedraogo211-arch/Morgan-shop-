import React, { useState } from 'react';
import { X, Star, ShieldCheck, Ruler, ChevronDown, ChevronUp, Check, ShoppingBag, CornerDownRight } from 'lucide-react';
import { Product, Review } from '../types';
import { motion } from 'framer-motion';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAddToBag: (product: Product, size: string, color: { name: string; hex: string }, quantity: number) => void;
  onAddReview: (productId: string, review: Review) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onClose,
  onAddToBag,
  onAddReview,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    product.colors[0] || { name: 'None', hex: '#000' }
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Review Form States
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size.');
      return;
    }
    setIsAdding(true);
    setTimeout(() => {
      onAddToBag(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 2000);
    }, 800);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      setReviewError('Please fill out all fields.');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };

    onAddReview(product.id, newReview);
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="product-details-panel">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Main Drawer Body */}
      <div className="relative w-full max-w-2xl bg-[#F9F8F4] h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-slide-in-right">
        {/* Drawer Header */}
        <div className="sticky top-0 bg-[#F9F8F4]/90 backdrop-blur-md z-20 px-6 py-4 border-b border-stone-200/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-stone-400">BOUTIQUE COLLECTION</span>
            <span className="font-serif text-lg font-bold text-stone-900 line-clamp-1">{product.name}</span>
          </div>
          <button
            onClick={onClose}
            id="close-details-btn"
            className="p-2.5 rounded-full border border-stone-200/80 hover:bg-stone-100 text-stone-700 hover:text-stone-900 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 flex-1 space-y-8">
          {/* Main Visual & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="aspect-[3/4] bg-stone-100 rounded-lg overflow-hidden border border-stone-200/60">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.round(product.rating) ? 'currentColor' : 'none'}
                      className={i < Math.round(product.rating) ? '' : 'text-stone-300'}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-stone-500 font-sans">
                  ({product.reviews.length} customer reviews)
                </span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-950 leading-tight">
                {product.name}
              </h2>

              <p className="text-xl font-semibold text-stone-900 font-sans">
                £{product.price.toFixed(2)}
              </p>

              <div className="h-px bg-stone-200" />

              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>
          </div>

          {/* Core Interactive Configurator */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-stone-200/60 space-y-6">
            {/* Color Swatches Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                  COLOR: <span className="text-stone-900 font-semibold">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`w-8 h-8 rounded-full border transition-all duration-300 relative flex items-center justify-center ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-stone-950 ring-offset-2 border-transparent scale-105'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <Check
                        size={12}
                        className={selectedColor.hex === '#FFFFFF' || selectedColor.hex === '#FAF9F6' ? 'text-stone-900' : 'text-white'}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector with Size Guide Trigger */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest text-stone-500 uppercase">
                  SIZE: <span className="text-stone-900 font-semibold">{selectedSize}</span>
                </span>
                <button
                  onClick={() => setShowSizeGuide(!showSizeGuide)}
                  className="flex items-center gap-1.5 text-stone-500 hover:text-stone-900 transition-colors text-xs font-medium uppercase tracking-wider"
                >
                  <Ruler size={13} />
                  Sizing Guide
                </button>
              </div>

              {/* Sizing Guide Table Drawer */}
              {showSizeGuide && (
                <div className="mb-4 bg-stone-50 p-4 rounded-lg border border-stone-200 animate-fade-in text-xs">
                  <p className="font-semibold text-stone-800 mb-2">Sizing & Measurements (Inches)</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-stone-200 text-stone-400 font-semibold uppercase text-[10px]">
                          <th className="py-1">Size</th>
                          <th className="py-1">Chest</th>
                          <th className="py-1">Waist</th>
                          <th className="py-1">Hips</th>
                        </tr>
                      </thead>
                      <tbody className="text-stone-600 font-mono">
                        <tr className="border-b border-stone-100">
                          <td className="py-1 font-sans font-bold">XS</td>
                          <td className="py-1">31-33</td>
                          <td className="py-1">24-25</td>
                          <td className="py-1">34-35</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                          <td className="py-1 font-sans font-bold">S</td>
                          <td className="py-1">34-35</td>
                          <td className="py-1">26-27</td>
                          <td className="py-1">36-37</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                          <td className="py-1 font-sans font-bold">M</td>
                          <td className="py-1">36-37</td>
                          <td className="py-1">28-29</td>
                          <td className="py-1">38-39</td>
                        </tr>
                        <tr className="border-b border-stone-100">
                          <td className="py-1 font-sans font-bold">L</td>
                          <td className="py-1">38-40</td>
                          <td className="py-1">30-32</td>
                          <td className="py-1">40-42</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-sans font-bold">XL</td>
                          <td className="py-1">41-43</td>
                          <td className="py-1">33-35</td>
                          <td className="py-1">43-45</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[3.5rem] py-2 px-3 border text-xs font-semibold rounded-md transition-all duration-300 font-sans ${
                      selectedSize === sz
                        ? 'bg-stone-900 border-stone-900 text-white shadow-sm'
                        : 'border-stone-200 bg-[#FBFBFA] text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart button */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center border border-stone-200 rounded-md bg-[#FBFBFA] h-12">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-900 disabled:opacity-30 font-bold"
                >
                  -
                </button>
                <span className="px-3 text-stone-900 font-semibold font-sans text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-stone-500 hover:text-stone-900 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToBag}
                id={`add-to-cart-btn-${product.id}`}
                disabled={isAdding}
                className={`flex-1 h-12 rounded-md font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-950 text-white hover:bg-stone-850 shadow-md active:scale-98'
                }`}
              >
                {isAdding ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : addedSuccess ? (
                  <>
                    <Check size={16} />
                    Added to Shopping Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={15} />
                    Add to Bag — £{(product.price * quantity).toFixed(2)}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Secondary Details Information Tabs */}
          <div className="space-y-4">
            <div className="flex border-b border-stone-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-xs font-bold tracking-widest uppercase border-b-2 mr-8 transition-colors ${
                  activeTab === 'details' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`pb-3 text-xs font-bold tracking-widest uppercase border-b-2 mr-8 transition-colors ${
                  activeTab === 'materials' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                }`}
              >
                Materials & Care
              </button>
              <button
                onClick={() => setActiveTab('shipping')}
                className={`pb-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${
                  activeTab === 'shipping' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400'
                }`}
              >
                Delivery & Returns
              </button>
            </div>

            <div className="text-xs text-stone-600 font-sans leading-relaxed min-h-[5rem]">
              {activeTab === 'details' && (
                <ul className="space-y-2">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CornerDownRight size={12} className="text-stone-400 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeTab === 'materials' && (
                <div className="space-y-3">
                  <p><strong>Composition:</strong> {product.materials}</p>
                  <p><strong>Care guidelines:</strong> {product.care}</p>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="space-y-2">
                  <p><strong>Standard Shipping:</strong> Complimentary standard delivery on orders above £150. Dispatched within 24-48 business hours.</p>
                  <p><strong>Returns:</strong> We offer smooth, hassle-free returns on all unworn items returned within 30 days of shipment receipt, accompanied by original tags and packaging.</p>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Customer Reviews Module */}
          <div className="space-y-6 pt-6 border-t border-stone-200">
            <h3 className="font-serif text-xl font-bold text-stone-950">Customer Reviews</h3>

            {/* List Reviews */}
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-4 rounded-lg border border-stone-200/50 space-y-2 font-sans">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-stone-800 text-sm">{rev.author}</p>
                    <p className="text-[10px] text-stone-400">{rev.date}</p>
                  </div>
                  <div className="flex text-amber-500 gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={11}
                        fill={i < rev.rating ? 'currentColor' : 'none'}
                        className={i < rev.rating ? '' : 'text-stone-200'}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* Write a Review Form */}
            <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-5 rounded-lg border border-stone-200 space-y-4">
              <p className="font-serif text-sm font-bold text-stone-900">Share Your Experience</p>

              {reviewError && (
                <div className="text-xs font-semibold text-rose-600 font-sans">{reviewError}</div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Marie Claire"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs outline-none focus:border-stone-900 text-stone-850"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Your Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs outline-none focus:border-stone-900 text-stone-850 font-sans font-semibold"
                  >
                    <option value="5">★★★★★ (5 Stars)</option>
                    <option value="4">★★★★☆ (4 Stars)</option>
                    <option value="3">★★★☆☆ (3 Stars)</option>
                    <option value="2">★★☆☆☆ (2 Stars)</option>
                    <option value="1">★☆☆☆☆ (1 Star)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Your Comment</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Tell us what you love or how the fit is..."
                  rows={3}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded text-xs outline-none focus:border-stone-900 text-stone-850"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold text-[10px] uppercase tracking-wider transition-colors shadow-sm"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>

        {/* Drawer Footer with Secure Badging */}
        <div className="bg-stone-100 p-6 border-t border-stone-200 text-center flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center gap-1.5 text-stone-500 text-[10px] font-bold tracking-widest uppercase font-sans">
            <ShieldCheck size={14} className="text-stone-400" />
            COMPLIMENTARY EUROPEAN DELIVERY & SECURE TRANSACTIONS
          </div>
          <p className="text-[9px] text-stone-400">All prices displayed include standard local taxes. Customs may apply outside Europe.</p>
        </div>
      </div>
    </div>
  );
};
