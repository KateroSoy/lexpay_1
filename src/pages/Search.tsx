import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PiArrowRight, PiMagnifyingGlassBold } from "react-icons/pi";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";
import { CategoryFilterTabs } from "../components/CategoryFilterTabs";
import { ModernSearchBar } from "../components/ModernSearchBar";
import { motion } from "framer-motion";
import { lexpayApi } from "../lib/api";
import type { Product, Service, DigitalItem } from "../lib/types";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
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

  const lowerQuery = query.toLowerCase();
  const matchedProducts = products.filter(
    (p) => p.name.toLowerCase().includes(lowerQuery) || (p.category && p.category.toLowerCase().includes(lowerQuery))
  );
  const matchedServices = services.filter(
    (s) => s.name.toLowerCase().includes(lowerQuery) || (s.category && s.category.toLowerCase().includes(lowerQuery))
  );
  const matchedDigital = digitalItems.filter(
    (d) => d.name.toLowerCase().includes(lowerQuery) || (d.category && d.category.toLowerCase().includes(lowerQuery))
  );

  const totalResults = matchedProducts.length + matchedServices.length + matchedDigital.length;

  const categoryCounts: Record<string, number> = {
    all: totalResults,
    products: matchedProducts.length,
    services: matchedServices.length,
    digital: matchedDigital.length,
  };

  const handleSearchSubmit = (newQuery: string) => {
    setSearchParams({ q: newQuery });
  };

  return (
    <div className="pt-28 pb-24 min-h-screen px-4 bg-bg-main">
      <div className="mx-auto max-w-7xl">
        
        {/* Modern Search Bar */}
        <ModernSearchBar 
          initialQuery={query} 
          onSearchSubmit={handleSearchSubmit} 
          showQuickChips={true}
        />

        {query && (
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-text-primary">
              Hasil pencarian untuk "{query}"
            </h1>
            <span className="text-sm font-semibold text-text-secondary">
              Ditemukan {totalResults} hasil
            </span>
          </div>
        )}

        {/* Category Tabs Slider */}
        <CategoryFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={categoryCounts}
          categories={[
            { id: "all", label: "Semua Hasil" },
            { id: "products", label: "Products" },
            { id: "services", label: "Services" },
            { id: "digital", label: "Digital" },
          ]}
        />

        {/* Results Sections */}
        <div className="space-y-14 mt-8">
          
          {/* Services */}
          {(activeTab === "all" || activeTab === "services") && matchedServices.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-2">
                <span>Services</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lex-purple/10 text-lex-purple">
                  {matchedServices.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedServices.map((service) => (
                  <Link
                    to={`/services/${service.slug}`}
                    key={service.id}
                    className="bg-bg-card rounded-[28px] p-6 flex flex-col justify-between group hover:shadow-xl transition-all border border-border-main hover:border-lex-purple/40 cursor-pointer"
                  >
                    <div>
                      <div className="w-12 h-12 bg-lex-purple/10 text-lex-purple rounded-2xl flex items-center justify-center font-bold mb-5">
                        SRV
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-lex-purple transition-colors text-text-primary">
                        {service.name}
                      </h3>
                      <p className="text-text-secondary font-medium text-sm line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-text-primary">
                      <div className="font-bold text-lg text-lex-purple">
                        Rp{service.startingPrice.toLocaleString("id-ID")}
                      </div>
                      <PiArrowRight className="w-5 h-5 opacity-60 text-text-secondary group-hover:text-lex-purple group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Products */}
          {(activeTab === "all" || activeTab === "products") && matchedProducts.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-2">
                <span>Products</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lex-purple/10 text-lex-purple">
                  {matchedProducts.length}
                </span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {matchedProducts.map((product) => (
                  <Link
                    to={`/products/${product.slug}`}
                    key={product.id}
                    className="bg-bg-card rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow border border-border-main hover:border-lex-purple/40 flex flex-col h-full cursor-pointer"
                  >
                    <div className="aspect-square bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden relative p-4 md:p-6">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] md:text-xs opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-1">
                          {product.brand}
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-lex-purple transition-colors line-clamp-2 text-xs md:text-base leading-snug text-text-primary">
                          {product.name}
                        </h3>
                      </div>
                      <div className="font-black text-sm md:text-lg text-lex-purple mt-2">
                        Rp{product.price.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Digital */}
          {(activeTab === "all" || activeTab === "digital") && matchedDigital.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-2">
                <span>Digital Vouchers</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-lex-purple/10 text-lex-purple">
                  {matchedDigital.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedDigital.map((digital) => (
                  <div
                    key={digital.id}
                    className="bg-bg-card rounded-[28px] p-6 border border-border-main"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-bg-main rounded-2xl overflow-hidden p-2 shrink-0 border border-border-main">
                        <img
                          src={digital.image}
                          alt={digital.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-text-primary">{digital.name}</h3>
                        <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase mt-0.5">
                          {digital.provider}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {digital.denominations.slice(0, 2).map((denom) => (
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
                          className="w-full flex justify-between items-center p-3 rounded-xl border border-border-main hover:border-lex-purple transition-colors cursor-pointer text-left text-text-primary group"
                        >
                          <span className="font-semibold text-sm group-hover:text-lex-purple">
                            {denom.name}
                          </span>
                          <span className="font-bold">Rp{denom.price.toLocaleString("id-ID")}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {query && totalResults === 0 && (
            <div className="text-center py-20 bg-bg-card rounded-[32px] border border-border-main">
              <div className="w-16 h-16 rounded-full bg-lex-purple/10 text-lex-purple flex items-center justify-center mx-auto mb-4">
                <PiMagnifyingGlassBold className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-text-primary">Tidak ada hasil ditemukan</h2>
              <p className="text-text-secondary font-medium max-w-md mx-auto">
                Kami tidak menemukan hasil untuk kata kunci "{query}". Coba cari kata kunci lain atau pilih dari kategori rekomendasi kami.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
