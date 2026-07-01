import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'The Classic Double-Breasted Trench Coat',
    description: 'A perennial wardrobe staple crafted from high-density organic cotton gabardine. Features modern storm flaps, a tailored adjustable belt, hand-stitched details, and premium horn buttons. Fully lined in a luxurious silk-cupro blend for effortless layering.',
    price: 320.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Heritage Camel', hex: '#C5A059' },
      { name: 'Obsidian Black', hex: '#1C1917' }
    ],
    details: [
      'Water-repellent organic cotton gabardine shell',
      'Adjustable wrist straps and waist belt with leather-covered buckles',
      'Internal zippered travel pocket',
      'Traditional double-breasted closure and hook-and-eye collar latch',
      'Crafted in Portugal'
    ],
    materials: 'Shell: 100% Organic Cotton; Lining: 55% Silk, 45% Cupro.',
    care: 'Professional dry clean only. Treat stains immediately with specialized leather/fabric cleaner.',
    rating: 4.9,
    featured: true,
    reviews: [
      {
        id: 'rev-1-1',
        author: 'Eleanor Vance',
        rating: 5,
        comment: 'This trench is magnificent. The drape is absolute perfection, and the horn buttons feel extremely high quality. It fits slightly oversized which is great for bulky knitwear.',
        date: 'June 12, 2026'
      },
      {
        id: 'rev-1-2',
        author: 'Marcus Aurel',
        rating: 5,
        comment: 'A true investment piece. The stitching detail is flawless. It stands up beautifully to light London rain without losing its crisp shape.',
        date: 'May 28, 2026'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Ribbed Knit Mongolian Cashmere Sweater',
    description: 'Spun from pure grade-A Mongolian cashmere, renowned for its incredible thermal properties and ultra-soft handle. Designed with a relaxed modern fit, a finely ribbed mock neck, drop-shoulder stitching, and clean seamless cuffs. An essential piece for transitional elegance.',
    price: 185.00,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#EAE5D9' },
      { name: 'Sage Green', hex: '#7A8B7B' },
      { name: 'Charcoal Grey', hex: '#4A4A4A' }
    ],
    details: [
      'Two-ply premium long-staple cashmere',
      'Responsibly sourced and certified animal welfare standards',
      'Soft mock neck ribbing that retains its structure over time',
      'Relaxed comfort-fit body with structured hemline'
    ],
    materials: '100% Grade-A Mongolian Cashmere (12-gauge knit).',
    care: 'Hand wash cold using delicate cashmere wash. Lay flat on a clean dry towel. Do not tumble dry.',
    rating: 4.8,
    featured: true,
    reviews: [
      {
        id: 'rev-2-1',
        author: 'Saskia L.',
        rating: 5,
        comment: 'Softest cashmere I own. The Oatmeal color matches everything. Zero pilling after three wears. Highly recommend.',
        date: 'June 20, 2026'
      },
      {
        id: 'rev-2-2',
        author: 'David K.',
        rating: 4,
        comment: 'Extremely soft and warm. I usually wear a Medium, and it fits exactly as pictured. Docked one star only because of the shipping delay, but the product is exquisite.',
        date: 'June 05, 2026'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'Tailored Crepe Blazer',
    description: 'A structural masterpiece combining masculine tailoring with feminine lines. Featuring sharp shoulders, an elongated double-breasted closure, hand-finished peak lapels, and clean double welt pockets. Built in robust, fluid double-weave crepe that resists wrinkling.',
    price: 260.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Soft Ivory', hex: '#FAF9F6' },
      { name: 'Classic Noir', hex: '#1C1917' }
    ],
    details: [
      'Structural double-weave crepe fabric',
      'Hand-basted shoulder padding and crisp canvas interfacing',
      'Fully lined in breathable cupro-viscose lining',
      'Internal smartphone compartment and pen sleeve',
      'Sartorial split cuffs with functional buttonholes'
    ],
    materials: 'Shell: 72% Acetate, 28% Viscose crepe; Lining: 100% Cupro.',
    care: 'Professional dry clean only. Use a garment steamer between wears.',
    rating: 4.7,
    featured: false,
    reviews: [
      {
        id: 'rev-3-1',
        author: 'Chloe Dupont',
        rating: 5,
        comment: 'An absolute workhorse in my professional wardrobe. It makes any simple t-shirt and jeans look like high fashion. The tailoring details on the inside are just as beautiful as the outside.',
        date: 'April 14, 2026'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Mulberry Silk Bias-Cut Slip Dress',
    description: 'An elegant cowl-neck dress cut on the bias to hug curves with liquid-like drape. Crafted from heavier 19mm mulberry silk that feels substantial and opaque. Featuring delicate, adjustable cross-back spaghetti straps and a subtle flared hemline.',
    price: 210.00,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Champagne Gold', hex: '#E6D2B5' },
      { name: 'Emerald Velvet', hex: '#1A3326' },
      { name: 'Midnight Noir', hex: '#121212' }
    ],
    details: [
      'Premium heavy-weight 19mm Mulberry Silk',
      'Cut on a true diagonal bias for stretch and drape',
      'Subtle V-back detailing with adjustable sliders',
      'French seams throughout for durability and comfort'
    ],
    materials: '100% Pure Mulberry Silk.',
    care: 'Hand wash cold with silk detergent or dry clean. Hang dry in shade. Iron on reverse on silk setting.',
    rating: 4.9,
    featured: true,
    reviews: [
      {
        id: 'rev-4-1',
        author: 'Isabella R.',
        rating: 5,
        comment: 'Fits like a second skin. The champagne color has the most beautiful pearlescent sheen under restaurant lights. Absolutely worth every single cent.',
        date: 'May 19, 2026'
      },
      {
        id: 'rev-4-2',
        author: 'Camille T.',
        rating: 5,
        comment: 'Stunning quality silk. It is thicker than standard slip dresses, meaning it doesn’t cling static-style or show underwear lines. Perfection.',
        date: 'May 02, 2026'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Full-Grain Leather Chelsea Boots',
    description: 'Hand-assembled in Porto, Portugal, from premium Italian full-grain calfskin leather. Engineered with custom elasticated side panels, a slightly elongated shaft for a sleek profile, leather lining, and a cushioned orthotic-grade footbed. Re-soleable Goodyear welt construction.',
    price: 245.00,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=1000&q=80',
    sizes: ['37', '38', '39', '40', '41'],
    colors: [
      { name: 'Espresso Brown', hex: '#3E2A20' },
      { name: 'Matte Onyx', hex: '#1C1917' }
    ],
    details: [
      'Genuine Italian full-grain calfskin leather upper',
      'Durable stack wood heel with custom rubber grip insert',
      'Reinforced grosgrain pull tabs at front and heel',
      'Goodyear welt construction allowing future resoling',
      'Leather lining that breathes and shapes to your foot'
    ],
    materials: 'Upper: 100% Calf Leather; Lining: 100% Sheepskin; Sole: Leather and Rubber.',
    care: 'Wipe with damp cloth. Let dry away from direct heat. Buff with leather conditioner monthly.',
    rating: 4.6,
    featured: false,
    reviews: [
      {
        id: 'rev-5-1',
        author: 'Aris Thorne',
        rating: 5,
        comment: 'Unbelievable craftsmanship. It took about three days to break them in, but now they fit like gloves. The profile is modern and elegant, not bulky at all.',
        date: 'June 11, 2026'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Relaxed European Linen Shirt',
    description: 'Crafted from premium European flax linen, naturally pre-washed to provide a uniquely soft, comfortable hand right from the first wear. Designed with a loose, relaxed fit, classical chest pocket, and sustainable mother-of-pearl buttons. Ideal for warm summer breezes.',
    price: 95.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pure Alabaster', hex: '#FFFFFF' },
      { name: 'Flax Tan', hex: '#DFD5C6' },
      { name: 'Oceanic Blue', hex: '#A4C6D9' }
    ],
    details: [
      '100% Premium European Flax Linen',
      'Eco-certified dyes and water-saving processing',
      'Custom dyed-to-match organic stitching',
      'Classic rounded hemline and single chest patch pocket'
    ],
    materials: '100% Flax Linen.',
    care: 'Machine wash warm with like colors on gentle. Line dry or tumble dry low. Wrinkles are part of its organic charm.',
    rating: 4.5,
    featured: false,
    reviews: [
      {
        id: 'rev-6-1',
        author: 'Jameson H.',
        rating: 4,
        comment: 'Great summer shirt. Super breathable and feels solid, not thin or cheap. I chose Oceanic Blue and it looks very chic.',
        date: 'June 28, 2026'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Vegetable-Tanned Leather Shopper Tote',
    description: 'An architectural everyday tote with pristine, raw-painted edges and structural reinforcement. Handcrafted from premium vegetable-tanned leather that develops a gorgeous, unique golden patina over time. Includes a detachable inner zipper pouch to secure valuables.',
    price: 195.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac Leather', hex: '#B87333' },
      { name: 'Noir Classic', hex: '#1C1917' }
    ],
    details: [
      'Sustainably vegetable-tanned Tuscan leather',
      'Solid brass heavy hardware and protective base feet',
      'Unlined raw suede interior showcasing premium hide quality',
      'Generous drop-straps designed to fit comfortably over winter coats',
      'Detachable leather matching wallet pouch with YKK zipper'
    ],
    materials: '100% Vegetable-Tanned Italian Leather.',
    care: 'Avoid heavy rains. Apply natural beeswax leather balm once every six months to clean and shine.',
    rating: 4.8,
    featured: true,
    reviews: [
      {
        id: 'rev-7-1',
        author: 'Olivia Sterling',
        rating: 5,
        comment: 'The perfect size for a 14-inch laptop, water bottle, notepad, and daily makeup bag. The leather smells absolutely incredible. It is rigid enough to stand upright on its own.',
        date: 'March 15, 2026'
      }
    ]
  },
  {
    id: 'prod-8',
    name: 'Minimalist 14K Gold Band Rings (Set of 3)',
    description: 'A trio of delicate stackable bands curated for modern elegance. Includes one smooth round wire band, one twisted rope-texture band, and one hammered, light-catching band. Hand-sculpted in recycled solid 14k gold so they will never tarnish, rust, or discolor.',
    price: 135.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    sizes: ['5', '6', '7', '8'],
    colors: [
      { name: '14K Yellow Gold', hex: '#E5C158' }
    ],
    details: [
      'Handmade with 100% certified recycled 14k gold',
      'Hypoallergenic, nickel-free, and sweatproof',
      'Delicate 1.2mm band thickness, perfect for stacked wear',
      'Comes packaged in a sustainable luxury velvet jewelry case'
    ],
    materials: '14k Recycled Solid Gold.',
    care: 'Gently polish with dry microfiber jewelry cloth. Safe to wear in the shower or during daily tasks.',
    rating: 4.9,
    featured: false,
    reviews: [
      {
        id: 'rev-8-1',
        author: 'Penelope G.',
        rating: 5,
        comment: 'So delicate and beautifully subtle. I wear them 24/7—even in the pool and shower—and they look exactly as bright as the day they arrived. Stunning packaging too.',
        date: 'June 01, 2026'
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'The Silk Satin Halter Gown',
    description: 'An ethereal evening masterpiece sculpted in heavy 22mm silk satin. Features a draped cowl neck, a low-cut statement open back, and a fluid bias-cut skirt that glides elegantly. Fully finished with hand-rolled hems and double-faced lining.',
    price: 280.00,
    category: 'Dresses',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Liquid Champagne', hex: '#EED9C4' },
      { name: 'Bordeaux Red', hex: '#58111A' }
    ],
    details: [
      'Luxurious 100% heavy silk satin weave',
      'Elegant back halter tie-fastening with golden tipped hardware',
      'Floor-sweeping length with a subtle flared train',
      'Concealed invisible side zipper for a skin-tight contour'
    ],
    materials: '100% Mulberry Silk Gown.',
    care: 'Professional dry clean only. Cool iron on reverse using a press cloth.',
    rating: 4.9,
    featured: true,
    reviews: [
      {
        id: 'rev-9-1',
        author: 'Eleanor Sterling',
        rating: 5,
        comment: 'Wore this to a winter gala and received hundreds of compliments. The weight of the silk is amazing; it drapes like liquid metal.',
        date: 'June 18, 2026'
      }
    ]
  },
  {
    id: 'prod-10',
    name: 'Wide-Leg Pleated Wool Trousers',
    description: 'Precision-tailored trousers made from fine Australian merino wool-crepe. Designed with sharp front double-pleats, an ultra-high waist, functional side slip pockets, and an adjustable hidden inner-waist tab for a perfect customized fit.',
    price: 145.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Toasted Almond', hex: '#C2B29F' },
      { name: 'Sartorial Navy', hex: '#1E293B' }
    ],
    details: [
      'Medium-weight 100% Australian Merino Wool',
      'High-rise waist with crisp tailored waistband construction',
      'Full-length wide-leg silhouette with 32" inseam',
      'Functional belt loops and rear mock-welt pockets'
    ],
    materials: '100% Virgin Merino Wool; Pocket Lining: 100% organic cotton.',
    care: 'Dry clean recommended. Can be steamed to remove wrinkles.',
    rating: 4.7,
    featured: false,
    reviews: [
      {
        id: 'rev-10-1',
        author: 'Sienna Ross',
        rating: 4,
        comment: 'Beautifully made trousers with great weight. They run slightly long, but look fantastic paired with block heels.',
        date: 'May 30, 2026'
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'Oversized Alpaca Blend Cardigan',
    description: 'Envelope yourself in pure warmth with this exceptionally soft, chunky-knit cardigan. Spun from a premium alpaca and mohair blend with a tactile textured finish. Styled with heavy horn-imitation buttons, oversized slouchy patch pockets, and dropped shoulders.',
    price: 160.00,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Cream Soufflé', hex: '#FDFBF7' },
      { name: 'Desert Sage', hex: '#A2B4A3' }
    ],
    details: [
      'Extremely soft 45% Baby Alpaca, 30% Merino Wool, 25% Mohair',
      'Comfortable slouchy oversized fit',
      'Hand-knitted ribbed borders on sleeves, hem and placket',
      'Beautifully structured natural-pattern buttons'
    ],
    materials: '45% Baby Alpaca, 30% Merino Wool, 25% Mohair.',
    care: 'Do not machine wash. Hand wash cold with gentle wool cleanser, lay flat on towel to dry.',
    rating: 4.8,
    featured: true,
    reviews: [
      {
        id: 'rev-11-1',
        author: 'Katarina V.',
        rating: 5,
        comment: 'Like wearing a luxurious, soft cloud. Absolute favorite piece for breezy coastal evenings.',
        date: 'June 25, 2026'
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'The Suede Penny Loafers',
    description: 'The ultimate slip-on standard, expertly crafted in Florence, Italy, from incredibly soft, water-resistant calfskin suede. Features a traditional slotted penny strap, hand-stitched apron details, sheepskin lining, and an ultra-flexible leather sole.',
    price: 180.00,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80',
    sizes: ['37', '38', '39', '40', '41'],
    colors: [
      { name: 'Sand Suede', hex: '#D2B48C' },
      { name: 'Chocolate Suede', hex: '#5C4033' }
    ],
    details: [
      '100% Italian premium calf suede leather upper',
      'Flexible blake stitch sole construction for comfortable flexing',
      'Double cushioned heel gel-pad built inside',
      'Comes with custom branded storage dustbag and cedar shoe tree insert'
    ],
    materials: 'Upper: 100% Calf Suede; Lining: 100% Calfskin; Sole: Real Leather.',
    care: 'Gently brush with soft suede wire brush. Spray with waterproofing suede protectant regularly.',
    rating: 4.8,
    featured: false,
    reviews: [
      {
        id: 'rev-12-1',
        author: 'Julian Cole',
        rating: 5,
        comment: 'Comfortable from day one! Zero break-in period. The suede is high grade and the stitching is absolutely top-notch.',
        date: 'June 09, 2026'
      }
    ]
  },
  {
    id: 'prod-13',
    name: 'Tailored Wool-Cashmere Overcoat',
    description: 'An architectural single-breasted overcoat tailored in double-weave virgin wool and premium Mongolian cashmere. Styled with classical notched lapels, sharp set-in shoulders, a deep rear vent for movement, and an elegant hidden three-button closure.',
    price: 395.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal Herringbone', hex: '#374151' },
      { name: 'Camel Gold', hex: '#D4A373' }
    ],
    details: [
      'Heavyweight 80% Virgin Wool, 20% Mongolian Cashmere shell',
      'Hand-tailored construction with structured interior backing',
      'Fully lined in silk satin for absolute layered comfort',
      'Two functional deep waist pockets and two inside passport pockets'
    ],
    materials: '80% Virgin Wool, 20% Cashmere; Lining: 100% Silk Satin.',
    care: 'Dry clean only. Hang on high-quality wide wooden hanger to maintain shoulder posture.',
    rating: 4.9,
    featured: true,
    reviews: [
      {
        id: 'rev-13-1',
        author: 'Arthur Vance',
        rating: 5,
        comment: 'Absolute perfection. Extremely warm and tailored so beautifully. Fits like bespoke tailoring.',
        date: 'June 27, 2026'
      }
    ]
  },
  {
    id: 'prod-14',
    name: 'Minimalist Leather Tote Bag',
    description: 'A sleek, structured tote bag crafted from premium full-grain Tuscan pebbled leather. Features a spacious raw suede-lined interior, a zipped security pouch, and slender handles tailored for comfortable over-the-shoulder wear.',
    price: 210.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    sizes: ['One Size'],
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1C' },
      { name: 'Olive Green', hex: '#4B5320' },
      { name: 'Espresso Brown', hex: '#3D2314' }
    ],
    details: [
      '100% genuine Tuscan full-grain pebbled calfskin leather',
      'Spacious raw interior lined in premium calf suede',
      'Removable zipped security inner pouch with brass key clip',
      'Reinforced base panel with protective metal feet'
    ],
    materials: '100% Calfskin Suede & Full-Grain Leather.',
    care: 'Avoid prolonged water exposure. Clean with a soft damp cloth and nourish with high-quality leather conditioner.',
    rating: 4.8,
    featured: true,
    reviews: [
      {
        id: 'rev-14-1',
        author: 'Isla Montgomery',
        rating: 5,
        comment: 'The craftsmanship is outstanding. It holds my laptop, notebook, and essentials beautifully while keeping a perfect silhouette.',
        date: 'June 12, 2026'
      }
    ]
  },
  {
    id: 'prod-15',
    name: 'Belgian Flax Linen Trousers',
    description: 'Crafted from certified premium Belgian flax linen, these relaxed-fit trousers feature a clean-line straight leg, a soft elastic waistband with an adjustable organic cotton drawcord, and discreet side-seam pockets.',
    price: 115.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Natural Flax', hex: '#E6DCD2' },
      { name: 'Sea Salt White', hex: '#F5F5F3' }
    ],
    details: [
      '100% certified organic Belgian flax linen',
      'Breathable, moisture-wicking weave ideal for warm climates',
      'Comfortable mid-rise pull-on design with functional drawcord',
      'Pre-washed for extraordinary softness and minimal shrinkage'
    ],
    materials: '100% Belgian Flax Linen.',
    care: 'Machine wash delicate cold or hand wash. Hang to dry. Iron warm while slightly damp for crisp look, or leave unironed for casual texture.',
    rating: 4.6,
    featured: false,
    reviews: [
      {
        id: 'rev-15-1',
        author: 'Amara Lopez',
        rating: 4,
        comment: 'Exceptionally soft and airy. They run slightly relaxed, so size down if you prefer a trimmer silhouette.',
        date: 'June 15, 2026'
      }
    ]
  },
  {
    id: 'prod-16',
    name: 'Mockneck Merino Wool Sweater',
    description: 'Spun from extremely soft, fine long-staple Australian merino wool. Features a delicate flat-knit mock neck, relaxed dropped sleeves, and tailored tubular hems designed to retain their structures beautifully.',
    price: 130.00,
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=1000&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Melange', hex: '#EBE4D8' },
      { name: 'Charcoal Grey', hex: '#3E3E3E' },
      { name: 'Midnight Navy', hex: '#1E222A' }
    ],
    details: [
      '100% extra-fine Australian Merino Wool',
      'Dense 12-gauge knit for premium warmth and drape',
      'Flattering mock neck silhouette with ribbed back collar detail',
      'Naturally odor-resistant and thermoregulating fiber structure'
    ],
    materials: '100% Extra-Fine Merino Wool.',
    care: 'Hand wash cold with wool detergent. Lay flat on towel to dry. Dry cleanable.',
    rating: 4.9,
    featured: true,
    reviews: [
      {
        id: 'rev-16-1',
        author: 'Vivienne Vance',
        rating: 5,
        comment: 'The softest wool sweater I own! It is lightweight yet cozy, and looks very elegant tucked into tailored trousers.',
        date: 'June 20, 2026'
      }
    ]
  },
  {
    id: 'prod-17',
    name: 'Organic Denim Selvedge Jacket',
    description: 'An elevated version of the timeless workwear jacket, crafted from heavy 13oz organic Japanese cotton selvedge denim. Designed with a clean-cut boxy crop, custom antique silver button closures, and tailored double-needle topstitching.',
    price: 175.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Indigo Rinse', hex: '#26334D' },
      { name: 'Bone Ecru', hex: '#F5F2EB' }
    ],
    details: [
      '100% heavy organic Japanese selvedge denim',
      'Clean modern boxy profile with side adjustment waist tabs',
      'Branded antique silver zinc alloy buttons',
      'Hidden interior slip pockets for smart storage'
    ],
    materials: '100% Organic Cotton Selvedge Denim.',
    care: 'Wash sparingly inside out with cold water. Air dry. The denim will develop beautiful individual wear patterns over time.',
    rating: 4.7,
    featured: false,
    reviews: [
      {
        id: 'rev-17-1',
        author: 'Marcus Brody',
        rating: 5,
        comment: 'Superb denim quality. Heavyweight yet moves beautifully. The indigo dye is deep and premium.',
        date: 'June 10, 2026'
      }
    ]
  },
  {
    id: 'prod-18',
    name: 'Fine Silk Twill Coastal Scarf',
    description: 'Woven from premium mulberry silk in an elegant, glossy 16mm twill finish. Featuring hand-rolled, hand-stitched borders and a beautiful understated abstract landscape print inspired by the beautiful British coastline.',
    price: 65.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=1000&q=80',
    sizes: ['One Size'],
    colors: [
      { name: 'Coastal Slate', hex: '#708090' },
      { name: 'Ochre Gold', hex: '#DAA520' }
    ],
    details: [
      '100% pure premium mulberry silk (16 momme twill)',
      'Hand-rolled edges requiring exceptional seamstress skill',
      'Vibrant eco-friendly ink printing with brilliant colors',
      'Versatile 90cm x 90cm dimensions for multiple styling options'
    ],
    materials: '100% Mulberry Silk Twill.',
    care: 'Dry clean only. Store flat or hung, avoid direct perfume spraying on silk fibers.',
    rating: 4.8,
    featured: false,
    reviews: [
      {
        id: 'rev-18-1',
        author: 'Genevieve H.',
        rating: 4,
        comment: 'Beautiful texture and very elegant colors. The hand-rolled edges make it look like a high-end designer piece.',
        date: 'May 14, 2026'
      }
    ]
  }
];
