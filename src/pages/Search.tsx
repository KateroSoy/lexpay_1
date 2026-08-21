import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PiMagnifyingGlass, PiArrowRight } from "react-icons/pi";
import { mockProducts, mockServices, mockDigital } from "../data/mockData";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [activeTab, setActiveTab] = useState("all");
  const addItem = useCartStore((state) => state.addItem);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement).value;
    setSearchParams({ q });
  };

  // Simple mock fuzzy search
  const lowerQuery = query.toLowerCase();
  const matchedProducts = mockProducts.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.category.toLowerCase().includes(lowerQuery));
  const matchedServices = mockServices.filter(s => s.name.toLowerCase().includes(lowerQuery) || s.category.toLowerCase().includes(lowerQuery));
  const matchedDigital = mockDigital.filter(d => d.name.toLowerCase().includes(lowerQuery) || d.category.toLowerCase().includes(lowerQuery));

  return (
    <div className="pt-32 pb-24 min-h-screen px-4 bg-bg-main">
      <div className="mx-auto max-w-7xl">
        
        {/* Large Search Input */}
        <form onSubmit={handleSearch} className="bg-bg-card p-3 md:p-2 rounded-2xl md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex max-md:flex-col md:flex-row items-center gap-3 border border-border-main mb-16 max-w-3xl">
          <div className="w-full flex items-center px-4 py-2 md:px-4 md:py-0 bg-bg-main md:bg-transparent rounded-xl md:rounded-none border border-white/5 md:border-none">
            <PiMagnifyingGlass className="w-5 h-5 md:w-6 md:h-6 opacity-60 text-text-secondary mr-3 shrink-0" />
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Cari produk, layanan, atau digital..."
              className="flex-1 bg-transparent border-none outline-none py-2 md:py-4 text-base md:text-lg placeholder:opacity-60 text-text-secondary md:placeholder:text-white/30 font-medium text-text-primary"
              autoFocus
            />
          </div>
          <button type="submit" className="w-full md:w-auto bg-btn-bg text-btn-text px-8 py-3 md:py-4 rounded-xl md:rounded-full font-bold hover:bg-white/90 transition-colors">
            Cari
          </button>
        </form>

        {query && (
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-8 text-text-primary">
            Results for "{query}"
          </h1>
        )}

        {/* Tabs */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-12">
          {["All", "Products", "Services", "Digital"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.toLowerCase() 
                  ? "bg-btn-bg text-btn-text" 
                  : "bg-bg-card text-text-secondary hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-12">
          {/* Services */}
          {(activeTab === "all" || activeTab === "services") && matchedServices.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedServices.map(service => (
                  <Link to={`/services/${service.slug}`} key={service.id} className="bg-bg-card rounded-[32px] p-6 flex flex-col justify-between group hover:shadow-xl transition-all border border-border-main">
                    <div>
                      <div className="w-16 h-16 bg-brand-ac/10 text-brand-ac rounded-2xl flex items-center justify-center font-bold mb-6">SRV</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-lex-purple transition-colors text-text-primary">{service.name}</h3>
                      <p className="text-text-secondary font-medium text-sm line-clamp-2">{service.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between text-text-primary">
                      <div className="font-bold text-lg">Rp{service.startingPrice.toLocaleString('id-ID')}</div>
                      <PiArrowRight className="w-5 h-5 opacity-60 text-text-secondary group-hover:text-lex-purple group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {(activeTab === "all" || activeTab === "products") && matchedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                {matchedProducts.map(product => (
                  <Link to={`/products/${product.slug}`} key={product.id} className="bg-bg-card rounded-[20px] md:rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow border border-border-main flex flex-col h-full">
                    <div className="aspect-square bg-white/5 overflow-hidden relative p-4 md:p-6">
                       <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-3 md:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] md:text-xs opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-1">{product.brand}</div>
                        <h3 className="font-bold mb-2 group-hover:text-lex-purple transition-colors line-clamp-2 text-[13px] md:text-base leading-snug text-text-primary">{product.name}</h3>
                      </div>
                      <div className="font-black text-sm md:text-lg text-lex-purple mt-2">Rp{product.price.toLocaleString('id-ID')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Digital */}
          {(activeTab === "all" || activeTab === "digital") && matchedDigital.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Digital</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {matchedDigital.map(digital => (
                  <div key={digital.id} className="bg-bg-card rounded-[24px] md:rounded-[32px] p-4 md:p-6 border border-border-main">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-bg-main rounded-2xl overflow-hidden p-2 shrink-0">
                        <img src={digital.image} alt={digital.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base md:text-lg text-text-primary">{digital.name}</h3>
                        <p className="text-[10px] md:text-xs text-text-secondary font-bold uppercase mt-1">{digital.provider}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {digital.denominations.slice(0, 2).map(denom => (
                         <button 
                           key={denom.id} 
                           onClick={() => {
                             addItem({
                               id: `${digital.id}-${denom.id}`,
                               productId: digital.id,
                               type: 'digital',
                               name: digital.name,
                               price: denom.price,
                               quantity: 1,
                               image: digital.image,
                               metadata: { digitalInfo: denom.name, provider: digital.provider }
                             });
                             toast.success(`${denom.name} added to cart!`);
                           }}
                           className="w-full flex justify-between items-center p-3 rounded-xl border border-border-main hover:border-lex-purple transition-colors cursor-pointer text-left text-text-primary"
                         >
                           <span className="font-semibold text-sm">{denom.name}</span>
                           <span className="font-bold">Rp{denom.price.toLocaleString('id-ID')}</span>
                         </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {query && matchedProducts.length === 0 && matchedServices.length === 0 && matchedDigital.length === 0 && (
            <div className="text-center py-20 text-text-primary">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">No results found</h2>
              <p className="text-text-secondary font-medium">We couldn't find anything matching "{query}". Try checking for typos or searching with different keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
