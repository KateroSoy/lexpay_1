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
    image: "/a269c596-84de-46c4-9e8f-05a50e6c86e0.jfif",
    gallery: ["/a269c596-84de-46c4-9e8f-05a50e6c86e0.jfif"],
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
    image: "/551fb5d6-2c22-46f2-b0f7-f40af1ce6efe.jfif",
    gallery: ["/551fb5d6-2c22-46f2-b0f7-f40af1ce6efe.jfif"],
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
    image: "/2becdfcb-8ec1-4fcc-b59e-182ec056b956.jfif",
    gallery: ["/2becdfcb-8ec1-4fcc-b59e-182ec056b956.jfif"],
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
    image: "/d9e9c6d3-b186-49c3-b614-57989dfeb1ce.jfif",
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
    image: "/8af0c08e-1152-443e-ad3a-8dfb0d9adcdb.jfif",
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
    image: "/73ab8ef6-ad89-4276-a52b-3300e2d8bc23.jfif",
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
    image: "/0845644f-e51e-4752-90ff-0d73ea89a928.jfif",
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
    image: "/d1f2905e-66e4-40a8-87e0-5dca5f4d6b9f.jfif",
    denominations: [
      { id: "tsel1", name: "Rp50.000", price: 51000 },
      { id: "tsel2", name: "Rp100.000", price: 100000 }
    ]
  }
];
