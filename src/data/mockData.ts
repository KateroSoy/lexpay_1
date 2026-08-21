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
  },
  {
    id: "s4",
    name: "Web Development",
    provider: "LEX Studio",
    category: "Digital Agency",
    description: "Jasa pembuatan website profesional, company profile, e-commerce, dan landing page yang responsif & modern.",
    startingPrice: 1500000,
    duration: "7-14 Days",
    image: "/web_dev_service.png",
    availability: ["Consultation: 10:00 - 17:00"],
    coverageArea: ["Global", "Remote", "Jakarta"],
    options: [
      { name: "Landing Page", price: 1500000 },
      { name: "Company Profile", price: 3500000 },
      { name: "E-Commerce Basic", price: 5000000 }
    ],
    rating: 5.0,
    slug: "jasa-web-development"
  },
  {
    id: "s5",
    name: "Mobile App Development",
    provider: "LEX Studio",
    category: "Digital Agency",
    description: "Pembuatan aplikasi mobile iOS & Android (Flutter/React Native) dengan performa tinggi dan UI/UX interaktif.",
    startingPrice: 5000000,
    duration: "1-3 Months",
    image: "/mobile_app_service.png",
    availability: ["Consultation: 10:00 - 17:00"],
    coverageArea: ["Global", "Remote"],
    options: [
      { name: "UI/UX Prototype Only", price: 2000000 },
      { name: "Basic App (1 Platform)", price: 5000000 },
      { name: "Full App (iOS & Android)", price: 9000000 }
    ],
    rating: 4.9,
    slug: "mobile-app-development"
  },
  {
    id: "s6",
    name: "AI Application Development",
    provider: "LEX Studio",
    category: "Digital Agency",
    description: "Integrasi sistem AI (LLM, Computer Vision, Data Science) ke dalam bisnis Anda untuk automasi tingkat lanjut.",
    startingPrice: 10000000,
    duration: "2-4 Months",
    image: "/ai_app_service.png",
    availability: ["Consultation: 10:00 - 17:00"],
    coverageArea: ["Global", "Remote"],
    options: [
      { name: "AI Chatbot Integration", price: 4000000 },
      { name: "Custom LLM Fine-tuning", price: 10000000 },
      { name: "Full AI Agent System", price: 25000000 }
    ],
    rating: 5.0,
    slug: "ai-app-development"
  },
  {
    id: "s7",
    name: "UI/UX Design",
    provider: "LEX Studio",
    category: "Digital Agency",
    description: "Jasa desain antarmuka dan pengalaman pengguna (UI/UX) premium menggunakan Figma untuk web dan aplikasi.",
    startingPrice: 800000,
    duration: "3-10 Days",
    image: "/ui_ux_service.png",
    availability: ["Consultation: 10:00 - 17:00"],
    coverageArea: ["Global", "Remote"],
    options: [
      { name: "Landing Page Design", price: 800000 },
      { name: "Mobile App Design (5 Screens)", price: 1500000 },
      { name: "Full Web/App Design System", price: 4000000 }
    ],
    rating: 4.8,
    slug: "ui-ux-design"
  },
  {
    id: "s8",
    name: "Custom Software Solutions",
    provider: "LEX Studio",
    category: "Digital Agency",
    description: "Pembuatan software ERP, CRM, POS, dan sistem informasi manajemen custom sesuai kebutuhan perusahaan Anda.",
    startingPrice: 8000000,
    duration: "1-6 Months",
    image: "/software_service.png",
    availability: ["Consultation: 10:00 - 17:00"],
    coverageArea: ["Global", "Remote"],
    options: [
      { name: "Custom POS System", price: 8000000 },
      { name: "Web-based CRM", price: 12000000 },
      { name: "Full Enterprise ERP", price: 30000000 }
    ],
    rating: 4.9,
    slug: "custom-software-solutions"
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
