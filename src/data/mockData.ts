export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  image: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  variants: string[];
  fulfillment: "delivery" | "instant";
  slug: string;
}

export interface Service {
  id: string;
  name: string;
  provider: string;
  category: string;
  description: string;
  startingPrice: number;
  duration: string;
  image: string;
  availability: string[];
  coverageArea: string[];
  options: { name: string; price: number }[];
  rating: number;
  slug: string;
}

export interface DigitalProduct {
  id: string;
  name: string;
  provider: string;
  category: string;
  denominations: { id: string; name: string; price: number }[];
  instantDelivery: boolean;
  image: string;
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Mechanical Keyboard Pro X",
    brand: "LEX Comp",
    category: "Electronics",
    price: 799000,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"],
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    variants: ["Black", "White"],
    fulfillment: "delivery",
    slug: "mechanical-keyboard-pro-x"
  },
  {
    id: "p2",
    name: "Cat Food Premium 2KG",
    brand: "Merdeka Petshop",
    category: "Pets",
    price: 125000,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&q=80"],
    rating: 4.9,
    reviewCount: 432,
    stock: 50,
    variants: ["2KG", "5KG"],
    fulfillment: "delivery",
    slug: "cat-food-premium-2kg"
  },
  {
    id: "p3",
    name: "Cold Brew Bottle 500ml",
    brand: "LEX Coffee",
    category: "Food",
    price: 28000,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&q=80"],
    rating: 4.7,
    reviewCount: 89,
    stock: 20,
    variants: ["Original", "Sweet"],
    fulfillment: "delivery",
    slug: "cold-brew-bottle-500ml"
  }
];

export const mockServices: Service[] = [
  {
    id: "s1",
    name: "AC Cleaning & Maintenance",
    provider: "LEX AC",
    category: "Home Service",
    description: "Servis, cleaning dan perawatan AC langsung dari teknisi profesional dengan garansi 30 hari.",
    startingPrice: 75000,
    duration: "1-2 Hours",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    availability: ["09:00", "11:30", "14:00", "16:30"],
    coverageArea: ["Jakarta", "Depok", "Tangerang", "Bekasi"],
    options: [
      { name: "Basic Cleaning", price: 75000 },
      { name: "Deep Cleaning", price: 120000 },
      { name: "Freon Top Up", price: 150000 }
    ],
    rating: 4.9,
    slug: "ac-cleaning"
  },
  {
    id: "s2",
    name: "CCTV Installation Package",
    provider: "LEX Network",
    category: "Security",
    description: "Paket pemasangan CCTV lengkap dengan kamera, DVR, dan instalasi kabel oleh tim teknis kami.",
    startingPrice: 400000,
    duration: "3-5 Hours",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80",
    availability: ["09:00", "13:00"],
    coverageArea: ["Jakarta", "Depok", "Tangerang", "Bekasi"],
    options: [
      { name: "2 Camera Package", price: 400000 },
      { name: "4 Camera Package", price: 750000 },
    ],
    rating: 4.8,
    slug: "cctv-installation"
  },
  {
    id: "s3",
    name: "Premium Haircut",
    provider: "LEX Barber",
    category: "Lifestyle",
    description: "Potong rambut premium dengan barber profesional, styling, dan hot towel shave.",
    startingPrice: 35000,
    duration: "45 Mins",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    availability: ["10:00", "11:00", "13:00", "15:00", "17:00", "19:00"],
    coverageArea: ["Kebayoran", "Kemang"],
    options: [
      { name: "Haircut Only", price: 35000 },
      { name: "Full Package (Hair + Shave)", price: 60000 }
    ],
    rating: 4.9,
    slug: "premium-haircut"
  }
];

export const mockDigital: DigitalProduct[] = [
  {
    id: "d1",
    name: "Mobile Legends Diamonds",
    provider: "Moonton",
    category: "Game",
    instantDelivery: true,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    denominations: [
      { id: "ml1", name: "86 Diamonds", price: 25000 },
      { id: "ml2", name: "172 Diamonds", price: 50000 },
      { id: "ml3", name: "257 Diamonds", price: 75000 }
    ]
  },
  {
    id: "d2",
    name: "Telkomsel Pulsa",
    provider: "Telkomsel",
    category: "Mobile",
    instantDelivery: true,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    denominations: [
      { id: "tsel1", name: "Rp50.000", price: 51000 },
      { id: "tsel2", name: "Rp100.000", price: 100000 }
    ]
  }
];
