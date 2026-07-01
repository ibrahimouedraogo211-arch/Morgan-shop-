import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { CartItem, ShippingDetails, PaymentDetails } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  discountAmount: number;
  discountCode: string;
  onBack: () => void;
  onCompleteOrder: (shipping: ShippingDetails, payment: PaymentDetails) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({
  cart,
  discountAmount,
  discountCode,
  onBack,
  onCompleteOrder,
}) => {
  // Step State
  const [checkoutStep, setCheckoutStep] = useState<'shipping' | 'payment'>('shipping');

  // Shipping Form State
  const [shipping, setShipping] = useState<ShippingDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '25 Lyra Road',
    city: 'Liverpool',
    postalCode: 'L22 0NT',
    country: 'United Kingdom',
    phone: '',
  });

  // Payment Form State
  const [payment, setPayment] = useState<PaymentDetails>({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Form Errors
  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingDetails, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({});

  // Loading indicator
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  // Math totals
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingThreshold = 150;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 15.0;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * 0.08;
  const total = taxableAmount + shippingCost + taxAmount;

  // Validation Rules
  const validateShipping = (): boolean => {
    const errors: Partial<Record<keyof ShippingDetails, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!shipping.email.trim()) errors.email = 'Email address is required';
    else if (!emailRegex.test(shipping.email)) errors.email = 'Please provide a valid email';

    if (!shipping.firstName.trim()) errors.firstName = 'First name is required';
    if (!shipping.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shipping.address.trim()) errors.address = 'Street address is required';
    if (!shipping.city.trim()) errors.city = 'City is required';
    if (!shipping.postalCode.trim()) errors.postalCode = 'Postal / Zip code is required';
    if (!shipping.phone.trim()) errors.phone = 'Phone number is required';

    setShippingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = (): boolean => {
    const errors: Partial<Record<keyof PaymentDetails, string>> = {};
    const cardDigits = payment.cardNumber.replace(/\s/g, '');
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;

    if (!cardDigits) errors.cardNumber = 'Card number is required';
    else if (cardDigits.length !== 16) errors.cardNumber = 'Card number must be 16 digits';

    if (!payment.cardName.trim()) errors.cardName = 'Cardholder name is required';

    if (!payment.expiryDate.trim()) errors.expiryDate = 'Expiry date is required';
    else if (!expiryRegex.test(payment.expiryDate)) errors.expiryDate = 'Use MM/YY format';

    if (!payment.cvv.trim()) errors.cvv = 'CVV is required';
    else if (payment.cvv.length !== 3) errors.cvv = 'CVV must be 3 digits';

    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Card formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const formatted = value.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    setPayment({ ...payment, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setPayment({ ...payment, expiryDate: value });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPayment({ ...payment, cvv: value });
  };

  // Detect card type (mock helper)
  const getCardType = () => {
    const num = payment.cardNumber.replace(/\s/g, '');
    if (num.startsWith('4')) return 'Visa';
    if (num.startsWith('5')) return 'Mastercard';
    return 'Premium Debit';
  };

  // Submission process
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setCheckoutStep('payment');
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setIsProcessing(true);
    setProcessingStatus('Verifying credit card safety...');

    setTimeout(() => {
      setProcessingStatus('Securing checkout window...');
      setTimeout(() => {
        setProcessingStatus('Finalizing boutique booking...');
        setTimeout(() => {
          onCompleteOrder(shipping, payment);
          setIsProcessing(false);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-[#FBFBFA] pt-24 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top return anchor */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Boutique
          </button>
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-stone-400">
            <span className={checkoutStep === 'shipping' ? 'text-stone-900 font-bold' : 'text-stone-400 font-normal'}>1. SHIPPING</span>
            <span className="text-stone-300">/</span>
            <span className={checkoutStep === 'payment' ? 'text-stone-900 font-bold' : 'text-stone-400 font-normal'}>2. PAYMENT</span>
          </div>
        </div>

        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-16 h-16 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin" />
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900">Processing Your Order</h3>
              <p className="text-xs text-stone-500 max-w-sm font-sans italic">{processingStatus}</p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-400 uppercase tracking-widest font-bold">
              <ShieldCheck size={14} /> SECURE 256-BIT ENCRYPTION ACTIVE
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form details */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-200/50 shadow-xs">
              {checkoutStep === 'shipping' ? (
                <form onSubmit={handleNextStep} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-950 mb-1">Shipping Details</h2>
                    <p className="text-xs text-stone-500">Provide shipping coordinates for standard complimentary premium delivery.</p>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Email Address *</label>
                      <input
                        type="email"
                        value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.email ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="e.g. claire@luxmail.com"
                      />
                      {shippingErrors.email && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.phone ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="+33 (0) 6 12 34 56 78"
                      />
                      {shippingErrors.phone && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.phone}</p>}
                    </div>
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">First Name *</label>
                      <input
                        type="text"
                        value={shipping.firstName}
                        onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.firstName ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="Claire"
                      />
                      {shippingErrors.firstName && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={shipping.lastName}
                        onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.lastName ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="Dubois"
                      />
                      {shippingErrors.lastName && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.lastName}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Street Address *</label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                        shippingErrors.address ? 'border-rose-500' : 'border-stone-200'
                      }`}
                      placeholder="12 Avenue des Champs-Élysées"
                    />
                    {shippingErrors.address && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.address}</p>}
                  </div>

                  {/* City, Zip, Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">City *</label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.city ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="Paris"
                      />
                      {shippingErrors.city && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Postal / Zip Code *</label>
                      <input
                        type="text"
                        value={shipping.postalCode}
                        onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-medium ${
                          shippingErrors.postalCode ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="75008"
                      />
                      {shippingErrors.postalCode && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{shippingErrors.postalCode}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Country *</label>
                      <select
                        value={shipping.country}
                        onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                        className="w-full px-3 py-2.5 bg-[#FAF9F6] border border-stone-200 rounded text-xs outline-none focus:bg-white text-stone-850 font-medium"
                      >
                        <option value="United States">United States</option>
                        <option value="France">France</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Japan">Japan</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-stone-900 hover:bg-stone-800 text-white rounded-md font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    Continue to Payment Method
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-stone-950 mb-1">Payment Method</h2>
                      <p className="text-xs text-stone-500">Provide card payment credentials for secure authorization.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('shipping')}
                      className="text-xs font-semibold text-stone-500 hover:text-stone-900 underline uppercase tracking-wider"
                    >
                      Edit Shipping
                    </button>
                  </div>

                  {/* 3D-Styled Interactive Card Preview */}
                  <div className="relative w-full max-w-sm mx-auto aspect-[1.58/1] rounded-2xl bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-750 text-white p-5 sm:p-6 shadow-xl flex flex-col justify-between overflow-hidden">
                    {/* Glow Accents */}
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-stone-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

                    {/* Top Row: Chip & Brand */}
                    <div className="flex justify-between items-start">
                      {/* Interactive Chip layout */}
                      <div className="w-10 h-8 rounded bg-amber-400/20 border border-amber-300/30 flex flex-col justify-between p-1.5 overflow-hidden">
                        <div className="h-0.5 bg-amber-300/50 w-full" />
                        <div className="flex justify-between">
                          <div className="w-2 h-3 border-r border-amber-300/50" />
                          <div className="w-2 h-3 border-l border-amber-300/50" />
                        </div>
                        <div className="h-0.5 bg-amber-300/50 w-full" />
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-[10px] tracking-[0.2em] font-bold text-white uppercase block leading-none">MORGAN</span>
                        <span className="text-[7px] text-stone-400 tracking-widest font-sans uppercase">BLACK LABEL</span>
                      </div>
                    </div>

                    {/* Middle Row: Card Number */}
                    <div className="my-2 text-center">
                      <p className="font-mono text-base sm:text-lg tracking-[0.18em] text-stone-100 drop-shadow-sm font-semibold select-all">
                        {payment.cardNumber || '•••• •••• •••• ••••'}
                      </p>
                    </div>

                    {/* Bottom Row: Name, Expire, Card Logo */}
                    <div className="flex justify-between items-end font-sans">
                      <div className="max-w-[70%]">
                        <p className="text-[7px] text-stone-400 uppercase tracking-widest mb-1">Cardholder Name</p>
                        <p className="text-xs uppercase tracking-wider font-semibold truncate">
                          {payment.cardName || 'CLAIRE DUBOIS'}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <p className="text-[7px] text-stone-400 uppercase tracking-widest mb-1">Expires</p>
                          <p className="text-xs font-mono font-semibold">
                            {payment.expiryDate || 'MM/YY'}
                          </p>
                        </div>

                        <div>
                          <p className="text-[7px] text-stone-400 uppercase tracking-widest mb-1">Type</p>
                          <p className="text-xs font-semibold text-amber-500">
                            {getCardType()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Inputs */}
                  <div className="space-y-4">
                    {/* Cardholder Name */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Cardholder Name *</label>
                      <input
                        type="text"
                        value={payment.cardName}
                        onChange={(e) => setPayment({ ...payment, cardName: e.target.value })}
                        className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-semibold uppercase ${
                          paymentErrors.cardName ? 'border-rose-500' : 'border-stone-200'
                        }`}
                        placeholder="CLAIRE DUBOIS"
                      />
                      {paymentErrors.cardName && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{paymentErrors.cardName}</p>}
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Card Number *</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={payment.cardNumber}
                          onChange={handleCardNumberChange}
                          className={`w-full pl-9 pr-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-mono font-semibold ${
                            paymentErrors.cardNumber ? 'border-rose-500' : 'border-stone-200'
                          }`}
                          placeholder="4000 1234 5678 9010"
                        />
                        <CreditCard size={14} className="absolute left-3 top-3 text-stone-400" />
                      </div>
                      {paymentErrors.cardNumber && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{paymentErrors.cardNumber}</p>}
                    </div>

                    {/* Expire & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Expiration Date *</label>
                        <input
                          type="text"
                          value={payment.expiryDate}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-mono font-semibold ${
                            paymentErrors.expiryDate ? 'border-rose-500' : 'border-stone-200'
                          }`}
                        />
                        {paymentErrors.expiryDate && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{paymentErrors.expiryDate}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 mb-1">Security Code (CVV) *</label>
                        <input
                          type="password"
                          value={payment.cvv}
                          onChange={handleCvvChange}
                          placeholder="•••"
                          maxLength={3}
                          className={`w-full px-3 py-2.5 bg-[#FAF9F6] border rounded text-xs outline-none focus:bg-white text-stone-850 font-mono font-semibold ${
                            paymentErrors.cvv ? 'border-rose-500' : 'border-stone-200'
                          }`}
                        />
                        {paymentErrors.cvv && <p className="text-[10px] text-rose-500 mt-1 font-semibold">{paymentErrors.cvv}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-lg border border-stone-200/50 flex items-start gap-3">
                    <ShieldCheck size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-stone-500 leading-normal">
                      Your payment parameters are securely tokenized with SSL. Morgan Shop does not retain physical credit records, ensuring complete financial safety.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-stone-950 hover:bg-stone-850 text-white rounded-md font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    Confirm Purchase — ${total.toFixed(2)}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-stone-200/50 shadow-xs space-y-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-stone-950">Order Summary</h3>

              {/* Items feed */}
              <div className="space-y-4 max-h-[22rem] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}`} className="flex gap-3 text-xs">
                    <div className="w-12 h-16 bg-stone-100 rounded-md overflow-hidden flex-shrink-0 border border-stone-200/40">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-stone-900 truncate">{item.product.name}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                      <p className="text-[10px] font-semibold text-stone-600 mt-1">${item.product.price.toFixed(2)} ea</p>
                    </div>
                    <p className="font-semibold text-stone-950 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Accounting details */}
              <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-600 font-sans">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount ({discountCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="text-emerald-600 font-semibold uppercase text-[10px]">Free Premium Delivery</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>

                <div className="h-px bg-stone-150 pt-1" />

                <div className="flex justify-between text-base font-semibold text-stone-950 pt-1 font-serif">
                  <span>Total Amount</span>
                  <span className="font-sans font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security block */}
              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200/50 space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-bold text-stone-600 uppercase tracking-wider">
                  <Truck size={14} className="text-stone-400" />
                  Premium Delivery Speed
                </div>
                <p className="text-[10px] text-stone-500 leading-relaxed">
                  Complimentary tracked express shipping included. Estimated arrival in Paris & major cities: **3 to 5 business days**.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
