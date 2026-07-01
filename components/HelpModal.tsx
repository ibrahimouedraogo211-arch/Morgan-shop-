import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Truck, 
  RotateCcw, 
  Ruler, 
  ShieldCheck, 
  Search, 
  ChevronRight, 
  Check, 
  ArrowRight, 
  Printer, 
  Lock, 
  RefreshCw,
  Sparkles
} from 'lucide-react';

export type HelpTab = 'track' | 'returns' | 'size' | 'ssl';

interface HelpModalProps {
  activeTab: HelpTab;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ activeTab: initialTab, onClose }) => {
  const [activeTab, setActiveTab] = useState<HelpTab>(initialTab);

  // States for Tracker
  const [trackingId, setTrackingId] = useState('MRGN-73892-GB');
  const [trackingResult, setTrackingResult] = useState<boolean | null>(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // States for Returns
  const [orderId, setOrderId] = useState('MRGN-48193');
  const [postalCode, setPostalCode] = useState('L22 0NT');
  const [returnStep, setReturnStep] = useState<'form' | 'label'>('form');
  const [returnReason, setReturnReason] = useState('Too large');

  // States for Size Guide Calculator
  const [measureType, setMeasureType] = useState<'apparel' | 'footwear'>('apparel');
  const [chestInput, setChestInput] = useState('94');
  const [waistInput, setWaistInput] = useState('78');
  const [footInput, setFootInput] = useState('25');
  const [calculatedSize, setCalculatedSize] = useState<string | null>(null);

  // States for SSL
  const [secChecking, setSecChecking] = useState(false);
  const [secStatus, setSecStatus] = useState<'idle' | 'success'>('idle');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;
    setTrackingLoading(true);
    setTimeout(() => {
      setTrackingLoading(false);
      setTrackingResult(true);
    }, 800);
  };

  const handleGenerateReturnLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim() || !postalCode.trim()) return;
    setReturnStep('label');
  };

  const calculateApparelSize = () => {
    const chest = parseFloat(chestInput);
    const waist = parseFloat(waistInput);
    if (isNaN(chest) || isNaN(waist)) return;

    // Elegant simple logic
    if (chest < 88 && waist < 72) {
      setCalculatedSize('XS (Extra Small)');
    } else if (chest < 96 && waist < 80) {
      setCalculatedSize('S (Small)');
    } else if (chest < 104 && waist < 88) {
      setCalculatedSize('M (Medium)');
    } else if (chest < 112 && waist < 96) {
      setCalculatedSize('L (Large)');
    } else {
      setCalculatedSize('XL (Extra Large)');
    }
  };

  const calculateFootSize = () => {
    const foot = parseFloat(footInput);
    if (isNaN(foot)) return;

    if (foot <= 23.5) {
      setCalculatedSize('EU 37 / UK 4');
    } else if (foot <= 24.3) {
      setCalculatedSize('EU 38 / UK 5');
    } else if (foot <= 25.1) {
      setCalculatedSize('EU 39 / UK 6');
    } else if (foot <= 25.9) {
      setCalculatedSize('EU 40 / UK 7');
    } else {
      setCalculatedSize('EU 41 / UK 8');
    }
  };

  const runSecurityScan = () => {
    setSecChecking(true);
    setTimeout(() => {
      setSecChecking(false);
      setSecStatus('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="relative bg-white border border-stone-200 rounded-3xl w-full max-w-4xl h-[85vh] md:h-[75vh] flex flex-col md:flex-row overflow-hidden shadow-2xl z-10 font-sans"
      >
        {/* Navigation Sidebar */}
        <div className="w-full md:w-64 bg-stone-50 border-b md:border-b-0 md:border-r border-stone-200/80 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between md:block">
              <span className="font-serif font-bold text-lg tracking-[0.2em] text-stone-950 block">MORGAN</span>
              <span className="text-[10px] text-stone-400 tracking-widest font-bold uppercase block md:mt-1">SUPPORT CENTER</span>
            </div>

            <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible space-x-2 md:space-x-0 md:space-y-1.5 pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('track')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === 'track' 
                    ? 'bg-stone-950 text-white shadow-lg shadow-stone-950/10' 
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-150'
                }`}
              >
                <Truck size={15} />
                <span>Track Route</span>
              </button>

              <button
                onClick={() => setActiveTab('returns')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === 'returns' 
                    ? 'bg-stone-950 text-white shadow-lg shadow-stone-950/10' 
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-150'
                }`}
              >
                <RotateCcw size={15} />
                <span>Prepaid Returns</span>
              </button>

              <button
                onClick={() => setActiveTab('size')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === 'size' 
                    ? 'bg-stone-950 text-white shadow-lg shadow-stone-950/10' 
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-150'
                }`}
              >
                <Ruler size={15} />
                <span>Size Guide</span>
              </button>

              <button
                onClick={() => setActiveTab('ssl')}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap ${
                  activeTab === 'ssl' 
                    ? 'bg-stone-950 text-white shadow-lg shadow-stone-950/10' 
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-150'
                }`}
              >
                <ShieldCheck size={15} />
                <span>SSL Security</span>
              </button>
            </nav>
          </div>

          <div className="hidden md:block text-[10px] text-stone-400">
            <p>Atelier Office: Liverpool, UK</p>
            <p className="mt-0.5 font-mono">contact@morganshop.co.uk</p>
          </div>
        </div>

        {/* Close Button on Desktop */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 p-2 rounded-full border border-stone-200 transition-colors z-20"
        >
          <X size={16} />
        </button>

        {/* Content Panel Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 flex flex-col justify-between">
          <div>
            {/* TAB 1: TRACKING */}
            {activeTab === 'track' && (
              <motion.div 
                key="track-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase">REAL-TIME ROUTING</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
                    Track Shipment <span className="font-semibold">Route</span>
                  </h2>
                  <p className="text-xs text-stone-500 max-w-xl">
                    Enter your 12-digit Morgan tracking ID or reference number to retrieve the live transport log and routing details directly from our UK hub.
                  </p>
                </div>

                <form onSubmit={handleTrack} className="flex gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <input
                      type="text"
                      value={trackingId}
                      onChange={(e) => setTrackingId(e.target.value)}
                      placeholder="e.g. MRGN-73892-GB"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs font-medium text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-stone-950 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-2"
                  >
                    {trackingLoading ? (
                      <RefreshCw size={13} className="animate-spin" />
                    ) : (
                      <span>Track</span>
                    )}
                  </button>
                </form>

                {/* Tracking Timeline */}
                {trackingResult && !trackingLoading && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-stone-200/80 rounded-2xl p-5 bg-stone-50/50 space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-stone-200/60 pb-3 gap-2">
                      <div>
                        <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase block">CURRENT CARRIER</span>
                        <span className="text-xs font-bold text-stone-800">Royal Mail Special Delivery (Next-Day)</span>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase block">ESTIMATED ARRIVAL</span>
                        <span className="text-xs font-bold text-emerald-600">Expected July 2, 2026 (Before 1:00 PM)</span>
                      </div>
                    </div>

                    {/* Timeline stepper */}
                    <div className="relative pl-6 border-l-2 border-stone-200 space-y-6">
                      {/* Step 4 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-stone-200 bg-white flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-semibold text-stone-400">Out for Local Delivery</h4>
                          </div>
                          <p className="text-[10px] text-stone-400 font-medium">Liverpool North Distribution Centre</p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-stone-900 bg-white flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-stone-900 animate-ping" />
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-stone-900">Sorted & In Transit</h4>
                            <span className="text-[9px] bg-stone-150 text-stone-700 px-1.5 py-0.2 rounded-md font-semibold font-mono">08:14 AM</span>
                          </div>
                          <p className="text-[10px] text-stone-500">North West Regional Sorting Hub</p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-stone-900 bg-stone-900 flex items-center justify-center">
                          <Check size={8} className="text-white" />
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-stone-800">Dispatched from Atelier</h4>
                            <span className="text-[9px] text-stone-400 font-mono">Yesterday, 04:30 PM</span>
                          </div>
                          <p className="text-[10px] text-stone-500">Departed Morgan Shop Office (25 Lyra Road, Liverpool)</p>
                        </div>
                      </div>

                      {/* Step 1 */}
                      <div className="relative">
                        <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-stone-900 bg-stone-900 flex items-center justify-center">
                          <Check size={8} className="text-white" />
                        </span>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-stone-800">Garment Hand-Pressed & Boxed</h4>
                            <span className="text-[9px] text-stone-400 font-mono">Yesterday, 11:15 AM</span>
                          </div>
                          <p className="text-[10px] text-stone-500">Finished inside our sewing ateliers in Liverpool, UK.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB 2: RETURNS */}
            {activeTab === 'returns' && (
              <motion.div 
                key="returns-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase">RESPONSIBLE DESIGN SERVICE</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
                    Prepaid <span className="font-semibold">Returns Center</span>
                  </h2>
                  <p className="text-xs text-stone-500 max-w-xl">
                    We offer complimentary 30-day returns on all un-worn items. To secure a prepaid Royal Mail return postage label, please provide your order reference.
                  </p>
                </div>

                {returnStep === 'form' ? (
                  <form onSubmit={handleGenerateReturnLabel} className="space-y-4 max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">Order ID</label>
                        <input
                          type="text"
                          required
                          value={orderId}
                          onChange={(e) => setOrderId(e.target.value)}
                          placeholder="e.g. MRGN-48193"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">Postal Code</label>
                        <input
                          type="text"
                          required
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="e.g. L22 0NT"
                          className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold tracking-wider text-stone-500 uppercase">Reason for return</label>
                      <select
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs font-medium text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white appearance-none"
                      >
                        <option>Too large</option>
                        <option>Too small</option>
                        <option>Style doesn't suit</option>
                        <option>Fabric texture preference</option>
                        <option>Gift exchange required</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-stone-950 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-stone-800 transition-colors"
                    >
                      Generate Prepaid Return Label
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border border-stone-200 rounded-2xl p-6 bg-stone-50/50 space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">Complimentary Return Generated</h4>
                        <p className="text-[10px] text-stone-500">For Order {orderId} • Associated to {postalCode}</p>
                      </div>
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                    </div>

                    {/* Return instructions */}
                    <div className="bg-white border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-amber-600 tracking-wider uppercase block">POSTAL CARRIER LABEL</span>
                        <p className="text-xs font-semibold text-stone-800">Royal Mail Drop-Off Return</p>
                        <p className="text-[10px] text-stone-400">Scan QR at Post Office, or print label at home.</p>
                      </div>

                      {/* Barcode Mock */}
                      <div className="flex flex-col items-center bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                        {/* Simulated barcode bars */}
                        <div className="flex space-x-[2px] items-stretch h-10 w-44">
                          <div className="w-[3px] bg-stone-950" />
                          <div className="w-[1px] bg-transparent" />
                          <div className="w-[1px] bg-stone-950" />
                          <div className="w-[2px] bg-stone-950" />
                          <div className="w-[4px] bg-stone-950" />
                          <div className="w-[1px] bg-transparent" />
                          <div className="w-[2px] bg-stone-950" />
                          <div className="w-[3px] bg-stone-950" />
                          <div className="w-[1px] bg-stone-950" />
                          <div className="w-[4px] bg-stone-950" />
                          <div className="w-[2px] bg-transparent" />
                          <div className="w-[2px] bg-stone-950" />
                          <div className="w-[1px] bg-stone-950" />
                          <div className="w-[3px] bg-stone-950" />
                        </div>
                        <span className="text-[8px] font-mono tracking-widest text-stone-500 mt-1">RM-RTN-48193-GB</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => window.print()}
                        className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Printer size={14} />
                        <span>Print Return Slip</span>
                      </button>
                      <button 
                        onClick={() => setReturnStep('form')}
                        className="flex-1 py-3 border border-stone-250 text-stone-700 hover:bg-stone-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                      >
                        Create Another Return
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* TAB 3: SIZE GUIDE */}
            {activeTab === 'size' && (
              <motion.div 
                key="size-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase">PRECISION CUTS</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
                    Size Guide <span className="font-semibold">Assistance</span>
                  </h2>
                  <p className="text-xs text-stone-500 max-w-xl">
                    Our garments run true to size, sculpted to modern, architectural silhouettes. Use our dynamic calculator or the conversions table below to select your flawless cut.
                  </p>
                </div>

                {/* Switch Measure calculator type */}
                <div className="border border-stone-200 rounded-2xl p-5 bg-stone-50/50 space-y-4">
                  <div className="flex items-center gap-3 border-b border-stone-200/60 pb-3">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">Interactive Size Finder</span>
                    <div className="flex gap-1 bg-stone-200/60 rounded-lg p-0.5 ml-auto">
                      <button
                        onClick={() => { setMeasureType('apparel'); setCalculatedSize(null); }}
                        className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all ${measureType === 'apparel' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                      >
                        Apparel
                      </button>
                      <button
                        onClick={() => { setMeasureType('footwear'); setCalculatedSize(null); }}
                        className={`text-[10px] font-bold px-3 py-1 rounded-md transition-all ${measureType === 'footwear' ? 'bg-white text-stone-950 shadow-sm' : 'text-stone-500 hover:text-stone-800'}`}
                      >
                        Footwear
                      </button>
                    </div>
                  </div>

                  {measureType === 'apparel' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Chest Circle (cm)</label>
                        <input
                          type="number"
                          value={chestInput}
                          onChange={(e) => setChestInput(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Waist Circle (cm)</label>
                        <input
                          type="number"
                          value={waistInput}
                          onChange={(e) => setWaistInput(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <button
                        onClick={calculateApparelSize}
                        className="py-2.5 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Calculate Size
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-stone-500 uppercase tracking-wider">Foot Length (cm)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={footInput}
                          onChange={(e) => setFootInput(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-900"
                        />
                      </div>
                      <button
                        onClick={calculateFootSize}
                        className="py-2.5 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-stone-800 transition-colors"
                      >
                        Calculate Shoe Size
                      </button>
                    </div>
                  )}

                  {calculatedSize && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles size={14} className="text-amber-600 animate-pulse" />
                        <span className="text-xs text-stone-700">Recommended cut:</span>
                      </div>
                      <span className="text-xs font-extrabold text-stone-950 uppercase tracking-wide">{calculatedSize}</span>
                    </motion.div>
                  )}
                </div>

                {/* Conversion table */}
                <div className="overflow-x-auto border border-stone-150 rounded-xl">
                  <table className="w-full text-left border-collapse text-[10px]">
                    <thead>
                      <tr className="bg-stone-50 text-stone-600 font-bold uppercase border-b border-stone-200/80">
                        <th className="p-3">MORGAN CUT</th>
                        <th className="p-3">UK / AUSTRALIA</th>
                        <th className="p-3">EU CONVERSION</th>
                        <th className="p-3">US / CANADA</th>
                        <th className="p-3">CHEST MEASURE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 font-medium text-stone-700">
                      <tr>
                        <td className="p-3 font-bold text-stone-900">XS</td>
                        <td className="p-3">UK 6</td>
                        <td className="p-3">EU 34</td>
                        <td className="p-3">US 2</td>
                        <td className="p-3">80 - 84 cm</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-stone-900">S</td>
                        <td className="p-3">UK 8 - 10</td>
                        <td className="p-3">EU 36 - 38</td>
                        <td className="p-3">US 4 - 6</td>
                        <td className="p-3">86 - 92 cm</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-stone-900">M</td>
                        <td className="p-3">UK 12</td>
                        <td className="p-3">EU 40</td>
                        <td className="p-3">US 8</td>
                        <td className="p-3">94 - 100 cm</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-stone-900">L</td>
                        <td className="p-3">UK 14 - 16</td>
                        <td className="p-3">EU 42 - 44</td>
                        <td className="p-3">US 10 - 12</td>
                        <td className="p-3">102 - 108 cm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 4: SSL FINANCIAL */}
            {activeTab === 'ssl' && (
              <motion.div 
                key="ssl-tab"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase">ENCRYPTED PROTOCOLS</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-stone-900">
                    SSL Financial <span className="font-semibold">Transactions</span>
                  </h2>
                  <p className="text-xs text-stone-500 max-w-xl">
                    Our digital architecture utilises certified military-grade Transport Layer Security (TLS 1.3) protocols and AES-256 GCM encryption. Your payments are securely brokered directly through Stripe API gateways.
                  </p>
                </div>

                {/* Interactive System Security status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-stone-200/80 rounded-2xl p-5 bg-stone-50/50 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Lock className="text-stone-950" size={16} />
                        <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">SSL Certificate Status</h4>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-xs font-bold text-stone-800">Verified Secure Connection</span>
                        </div>
                        <p className="text-[10px] text-stone-400 font-mono">SHA-256 Fingerprint Auth • Let's Encrypt CA</p>
                      </div>
                    </div>

                    <button
                      onClick={runSecurityScan}
                      disabled={secChecking}
                      className="w-full py-2.5 bg-stone-950 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-80"
                    >
                      {secChecking ? (
                        <>
                          <RefreshCw size={12} className="animate-spin" />
                          <span>Auditing Ports...</span>
                        </>
                      ) : secStatus === 'success' ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span>Protocol 100% Guarded</span>
                        </>
                      ) : (
                        <span>Verify SSL Integrity</span>
                      )}
                    </button>
                  </div>

                  <div className="border border-stone-200/80 rounded-2xl p-5 bg-stone-50/50 space-y-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-stone-950" size={16} />
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">Audited Standards</h4>
                    </div>

                    <ul className="space-y-2 text-[11px] text-stone-600">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                        <span><strong>PCI-DSS Level 1 Compliant</strong>: Brokered directly through Stripe without local card logging.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                        <span><strong>AES-256 Bit Encryption</strong>: High-grade cryptographic security tunnels.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 mt-0.5 font-bold">✓</span>
                        <span><strong>Zero Database Footprint</strong>: Personal financial data is never written into permanent files.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-400 gap-2">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-600" /> Fully Secured 256-bit Connection
            </span>
            <span>Atelier Office, Liverpool, UK</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
