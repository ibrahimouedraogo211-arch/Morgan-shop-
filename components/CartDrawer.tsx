import React, { useState } from 'react';
import { X, Trash2, Tag, ShoppingBag, ArrowRight, Lock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (discountAmount: number, discountCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  cart,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<{ code: string; rate: number } | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Math totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold || subtotal === 0 ? 0 : 15.0;

  const handleApplyPromo = () => {
    const codeUpper = promoCode.trim().toUpperCase();
    if (codeUpper === 'WELCOME10') {
      setActiveDiscount({ code: 'WELCOME10', rate: 0.1 });
      setPromoSuccess('10% off applied successfully!');
      setPromoError('');
    } else if (codeUpper === 'SUMMER15') {
      setActiveDiscount({ code: 'SUMMER15', rate: 0.15 });
      setPromoSuccess('15% off applied successfully!');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10 or SUMMER15.');
      setPromoSuccess('');
    }
  };

  const discountAmount = activeDiscount ? subtotal * activeDiscount.rate : 0;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * 0.08; // 8% local tax
  const total = taxableAmount + shippingCost + taxAmount;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" id="cart-drawer-panel">
      {/* Black backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out drawer container */}
      <div className="relative w-full max-w-md bg-[#F9F8F4] h-full shadow-2xl flex flex-col z-10 overflow-hidden animate-slide-in-right">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-stone-200/60 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-stone-900" />
            <span className="font-serif font-bold text-lg text-stone-950">Your Shopping Bag</span>
            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-sans font-bold">
              {cart.reduce((sum, i) => sum + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={onClose}
            id="close-cart-drawer-btn"
            className="p-2 rounded-full border border-stone-200/60 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable list items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-300">
                <ShoppingBag size={28} />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-base font-bold text-stone-850">Your bag is empty</p>
                <p className="text-xs text-stone-500 max-w-[240px]">Browse our new arrivals and add items to your personal wardrobe.</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-950 hover:bg-stone-800 text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`}
                className="flex gap-4 p-4 bg-white rounded-lg border border-stone-200/50 shadow-xs relative group"
              >
                {/* Item Thumbnail */}
                <div className="w-20 h-24 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 border border-stone-200/40">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details layout */}
                <div className="flex-1 flex flex-col justify-between font-sans">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors ml-2"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] text-stone-500 font-medium">
                      <span className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 uppercase font-bold">
                        SIZE: {item.selectedSize}
                      </span>
                      <span className="flex items-center gap-1">
                        COLOR:
                        <span
                          style={{ backgroundColor: item.selectedColor.hex }}
                          className="w-2 h-2 rounded-full border border-stone-300"
                        />
                        {item.selectedColor.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-100">
                    {/* Quantity selectors */}
                    <div className="flex items-center border border-stone-200 rounded bg-[#FBFBFA]">
                      <button
                        disabled={item.quantity <= 1}
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-stone-500 hover:text-stone-900 disabled:opacity-30 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 text-stone-850 text-xs font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-stone-500 hover:text-stone-900 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Single vs Total price */}
                    <div className="text-right">
                      <span className="text-xs text-stone-400 block">${item.product.price.toFixed(2)} ea</span>
                      <span className="text-sm font-semibold text-stone-950">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Coupon and checkout sticky pricing */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-stone-200 p-6 space-y-4">
            {/* Promo Codes Block */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="flex-1 flex items-center border border-stone-200 rounded px-2.5 py-1.5 bg-stone-50">
                  <Tag size={13} className="text-stone-400 mr-2" />
                  <input
                    type="text"
                    placeholder="ENTER WELCOME10 OR SUMMER15"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-transparent border-none outline-none text-xs w-full text-stone-800 placeholder-stone-400 font-sans uppercase font-medium"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-4 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Apply
                </button>
              </div>

              {promoSuccess && (
                <p className="text-[10px] text-emerald-600 font-semibold font-sans flex items-center gap-1">
                  ✓ {promoSuccess}
                </p>
              )}
              {promoError && (
                <p className="text-[10px] text-rose-600 font-semibold font-sans">
                  ✗ {promoError}
                </p>
              )}
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-2 text-xs font-sans text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
              </div>

              {activeDiscount && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({activeDiscount.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-emerald-600 font-semibold uppercase text-[10px]">Free Standard</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Local Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>

              {shippingCost > 0 && (
                <p className="text-[9px] text-stone-400 leading-none">
                  Add <strong className="text-stone-600 font-bold">${(shippingThreshold - subtotal).toFixed(2)}</strong> more for free premium standard delivery.
                </p>
              )}

              <div className="h-px bg-stone-150 pt-1" />

              <div className="flex justify-between text-base font-semibold text-stone-950 pt-1">
                <span className="font-serif">Total Estimate</span>
                <span className="font-sans font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed checkout actions */}
            <button
              onClick={() => onProceedToCheckout(discountAmount, activeDiscount?.code || '')}
              id="proceed-checkout-btn"
              className="w-full h-12 bg-stone-950 hover:bg-stone-850 text-white rounded-md font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:-translate-y-0.5 active:scale-98"
            >
              <Lock size={13} />
              Proceed to Secure Checkout
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
