import React from 'react';
import { Printer, ShoppingBag, CheckCircle, Sparkles } from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails } from '../types';

interface ConfirmationProps {
  cart: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
  discountAmount: number;
  discountCode: string;
  onContinueShopping: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  cart,
  shipping,
  payment,
  discountAmount,
  discountCode,
  onContinueShopping,
}) => {
  // Generate random order number once
  const orderNumber = React.useMemo(() => {
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `MRG-${rand}-2026`;
  }, []);

  const handlePrint = () => {
    window.print();
  };

  // Math totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 15.0;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * 0.08;
  const total = taxableAmount + shippingCost + taxAmount;

  // Mask card number for display
  const maskedCardNumber = React.useMemo(() => {
    const raw = payment.cardNumber.replace(/\s/g, '');
    if (raw.length < 4) return '••••';
    return `•••• •••• •••• ${raw.slice(-4)}`;
  }, [payment.cardNumber]);

  return (
    <section className="min-h-screen bg-[#FBFBFA] pt-24 pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-stone-200/60 shadow-lg overflow-hidden p-6 sm:p-10 space-y-8" id="invoice-printable">
          {/* Header checkmark */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle size={28} />
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-950">Purchase Complete</h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              Your booking with Morgan Shop is confirmed. A tracked parcel request has been submitted to our atelier.
            </p>
          </div>

          <div className="h-px bg-stone-200/60" />

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-6 text-xs text-stone-600">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Order Identifier</p>
              <p className="font-mono text-stone-900 font-bold">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Date Purchased</p>
              <p className="font-medium text-stone-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Delivery address details */}
            <div className="space-y-2 text-xs">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Ship To Address</p>
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200/50 space-y-1 text-stone-700">
                <p className="font-bold text-stone-900">{shipping.firstName} {shipping.lastName}</p>
                <p>{shipping.address}</p>
                <p>{shipping.city}, {shipping.postalCode}</p>
                <p className="font-semibold">{shipping.country}</p>
                <p className="text-stone-400 mt-1 font-mono">{shipping.phone}</p>
              </div>
            </div>

            {/* Payment card details */}
            <div className="space-y-2 text-xs">
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Authorized Payment</p>
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200/50 space-y-1 text-stone-700">
                <p className="font-semibold text-stone-900">Credit / Debit Card</p>
                <p className="font-mono font-medium">{maskedCardNumber}</p>
                <p className="text-stone-400 uppercase text-[10px]">{payment.cardName}</p>
                <p className="text-emerald-600 font-bold uppercase text-[9px] mt-2 flex items-center gap-1">
                  <Sparkles size={11} /> 3D Secure Verification OK
                </p>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Itemized Bill of Lading</p>
            <div className="border border-stone-200/60 rounded-xl overflow-hidden divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex items-center justify-between p-4 bg-stone-50/30 text-xs">
                  <div className="flex gap-3">
                    <div className="w-10 h-14 bg-stone-100 rounded overflow-hidden border border-stone-200/30 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <p className="font-serif font-bold text-stone-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="text-[10px] text-stone-500 mt-0.5">Color: {item.selectedColor.name}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-stone-900">£{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical breakdown */}
          <div className="pt-4 border-t border-stone-200 text-xs text-stone-600 font-sans space-y-2 max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">£{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount ({discountCode})</span>
                <span>-£{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span>{shippingCost === 0 ? 'Complimentary' : `£${shippingCost.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span>£{taxAmount.toFixed(2)}</span>
            </div>

            <div className="h-px bg-stone-150 pt-1" />

            <div className="flex justify-between text-base font-semibold text-stone-950 pt-1 font-serif">
              <span>Total Paid</span>
              <span className="font-sans font-bold">£{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="h-px bg-stone-200/60" />

          {/* Invoice Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 rounded-md border border-stone-300 hover:bg-stone-50 text-stone-700 hover:text-stone-900 transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Printer size={14} />
              Print Invoice Receipt
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full sm:w-auto px-6 py-3 bg-stone-950 hover:bg-stone-850 text-white rounded-md font-semibold text-xs uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={14} />
              Continue Boutique Browsing
            </button>
          </div>
        </div>

        {/* Outer thank you signet */}
        <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest mt-8 font-sans">
          All shipments fully insured. Underwritten by Morgan Shop Paris.
        </p>
      </div>
    </section>
  );
};
