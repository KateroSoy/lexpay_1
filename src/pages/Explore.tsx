import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";
import { CategoryFilterTabs } from "../components/CategoryFilterTabs";
import { ModernSearchBar } from "../components/ModernSearchBar";
import { lexpayApi } from "../lib/api";
import type { Product, Service, DigitalItem } from "../lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PiSparkleThin, 
  PiArrowRightThin, 
  PiShoppingBagThin, 
  PiWrenchThin, 
  PiLightningThin,
  PiShieldCheckThin,
  PiClockThin
} from "react-icons/pi";

export default function Explore() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const addItem = useCartStore((state) => state.addItem);

  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [digitalItems, setDigitalItems] = useState<DigitalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lexpayApi.home()
      .then(res => {
        setProducts(res.products || []);
        setServices(res.services || []);
        setDigitalItems(res.digitalItems || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Parse query param e.g. /explore?tab=services
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam) {
      setActiveTab(tabParam.toLowerCase());
    } else if (location.pathname === "/digital") {
      setActiveTab("digital");
    } else if (location.pathname === "/products") {
      setActiveTab("products");
    } else if (location.pathname === "/services") {
      setActiveTab("services");
    } else {
      setActiveTab("all");
    }
  }, [location]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/explore?tab=${tabId}`, { replace: true });
  };

  // Category item counts
  const categoryCounts: Record<string, number> = {
    all: products.length + services.length + digitalItems.length,
    products: products.length,
    services: services.length,
    digital: digitalItems.length,
    food: products.filter(p => p.category === "Food").length,
    technology: products.filter(p => p.category === "Electronics").length + services.filter(s => s.category === "Digital Agency").length,
  };

  return (
    <div className="pt-20 md:pt-24 pb-20 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 text-text-secondary font-bold text-[10px] md:text-[11px] mb-3 uppercase tracking-widest opacity-80"
          >
            <PiSparkleThin className="w-4 h-4 text-text-secondary" />
            <span>Official Ecosystem</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-4xl font-extrabold tracking-tight text-text-primary mb-2"
          >
            Explore Ecosystem
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-text-secondary text-xs md:text-sm font-medium px-4"
          >
            Temukan produk fisik, layanan teknis profesional, hingga voucher digital serba instan.
          </motion.p>
        </div>

        {/* Modern Interactive Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ModernSearchBar placeholder="Cari layanan AC, Top Up Game, Keyboard, Barber..." />
        </motion.div>

        {/* Modern Geser & Pilih Category Slider Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <CategoryFilterTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            counts={categoryCounts}
            showHelperText={true}
          />
        </motion.div>

        {/* Dynamic Category Section Content */}
        <div className="mt-10 space-y-16">
          
          {/* Services Section */}
          {(activeTab === "all" || activeTab === "services" || activeTab === "technology") && (
            <AnimatePresence mode="wait">
              <motion.div
                key="services-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lex-purple/10 text-lex-purple flex items-center justify-center">
                      <PiWrenchThin className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">Popular Services</h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-border-main text-text-secondary bg-bg-main shadow-xs">
                    {services.length} Options
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lex-purple"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                      <Link
                      to={`/services/${service.slug}`}
                      key={service.id}
                      className="group bg-bg-card rounded-[28px] overflow-hidden border border-border-main hover:border-lex-purple/50 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[4/3] bg-white/5 overflow-hidden relative">
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute top-3 left-3 bg-bg-card/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-text-primary shadow-xs flex items-center gap-1">
                            <PiShieldCheckThin className="w-4 h-4 text-green-500" />
                            {service.provider}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-text-primary group-hover:text-lex-purple transition-colors">
                            {service.name}
                          </h3>
                          <p className="text-text-secondary font-medium text-sm line-clamp-2 mb-4 leading-relaxed">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <div className="flex items-end justify-between pt-4 border-t border-black/5 dark:border-white/5">
                          <div>
                            <div className="text-[10px] opacity-60 text-text-secondary font-bold uppercase tracking-wider">
                              Mulai dari
                            </div>
                            <div className="font-black text-lg text-lex-purple">
                              Rp{service.startingPrice.toLocaleString("id-ID")}
                            </div>
                          </div>
                          <span className="bg-black/5 dark:bg-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-text-secondary flex items-center gap-1">
                            <PiClockThin className="w-4 h-4" />
                            {service.duration}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Products Section */}
          {(activeTab === "all" || activeTab === "products" || activeTab === "food") && (
            <AnimatePresence mode="wait">
              <motion.div
                key="products-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lex-purple/10 text-lex-purple flex items-center justify-center">
                      <PiShoppingBagThin className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">Physical Products</h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-border-main text-text-secondary bg-bg-main shadow-xs">
                    {products.length} Products
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lex-purple"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {products.map((product) => (
                      <Link
                      to={`/products/${product.slug}`}
                      key={product.id}
                      className="bg-bg-card rounded-[24px] overflow-hidden group hover:shadow-xl transition-all duration-300 border border-border-main hover:border-lex-purple/40 flex flex-col h-full cursor-pointer"
                    >
                      <div className="aspect-square bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden relative p-4 md:p-6 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] md:text-xs opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-1">
                            {product.brand}
                          </div>
                          <h3 className="font-bold mb-2 text-text-primary group-hover:text-lex-purple transition-colors line-clamp-2 text-xs md:text-base leading-snug">
                            {product.name}
                          </h3>
                        </div>
                        <div className="font-black text-sm md:text-lg text-lex-purple mt-2 flex items-center justify-between">
                          <span>Rp{product.price.toLocaleString("id-ID")}</span>
                          <span className="w-7 h-7 rounded-full bg-lex-purple/10 text-lex-purple flex items-center justify-center group-hover:bg-lex-purple group-hover:text-white transition-colors">
                            <PiArrowRightThin className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Digital Section */}
          {(activeTab === "all" || activeTab === "digital") && (
            <AnimatePresence mode="wait">
              <motion.div
                key="digital-section"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-lex-purple/10 text-lex-purple flex items-center justify-center">
                      <PiLightningThin className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-text-primary tracking-tight">Digital Top Up</h2>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-border-main text-text-secondary bg-bg-main shadow-xs">
                    {digitalItems.length} Brands
                  </span>
                </div>

                {loading ? (
                  <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lex-purple"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {digitalItems.map((digital) => (
                      <div
                      key={digital.id}
                      className="bg-bg-card rounded-[28px] p-6 border border-border-main hover:border-lex-purple/40 shadow-sm hover:shadow-xl transition-all"
                    >
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-16 h-16 bg-bg-main rounded-2xl overflow-hidden p-2 shrink-0 border border-border-main">
                          <img
                            src={digital.image}
                            alt={digital.name}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-text-primary">{digital.name}</h3>
                          <div className="text-xs font-bold text-lex-purple uppercase tracking-wider mt-0.5">
                            {digital.provider}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 mt-4">
                        {digital.denominations.slice(0, 3).map((denom) => (
                          <button
                            key={denom.id}
                            onClick={() => {
                              addItem({
                                id: `${digital.id}-${denom.id}`,
                                productId: digital.id,
                                type: "digital",
                                name: digital.name,
                                price: denom.price,
                                quantity: 1,
                                image: digital.image,
                                metadata: { digitalInfo: denom.name, provider: digital.provider },
                              });
                              toast.dismiss();
                              toast.success(`${denom.name} ditambahkan ke keranjang!`);
                            }}
                            className="w-full flex justify-between items-center p-3.5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-lex-purple bg-black/[0.02] dark:bg-white/[0.02] hover:bg-lex-purple/5 transition-all cursor-pointer text-left group"
                          >
                            <span className="font-semibold text-sm text-text-primary group-hover:text-lex-purple transition-colors">
                              {denom.name}
                            </span>
                            <span className="font-black text-sm text-text-primary">
                              Rp{denom.price.toLocaleString("id-ID")}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

        </div>
      </div>
    </div>
  );
}
