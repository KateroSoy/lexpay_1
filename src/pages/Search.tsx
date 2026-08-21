import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, ArrowRight } from "lucide-react";
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
    <div className="pt-32 pb-24 min-h-screen px-4 bg-lex-soft">
      <div className="mx-auto max-w-7xl">
        
        {/* Large Search Input */}
        <form onSubmit={handleSearch} className="bg-white p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-4 border border-black/5 mb-16 max-w-3xl">
          <div className="pl-6">
            <SearchIcon className="w-6 h-6 text-black/40" />
          </div>
          <input 
            type="text" 
            name="q"
            defaultValue={query}
            placeholder="Cari produk, layanan, atau digital..."
            className="flex-1 bg-transparent border-none outline-none py-4 text-lg placeholder:text-black/30 font-medium"
            autoFocus
          />
          <button type="submit" className="bg-lex-black text-white px-8 py-4 rounded-full font-bold hover:bg-black/90 transition-colors">
            Cari
          </button>
        </form>

        {query && (
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-8">
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
                  ? "bg-lex-black text-white" 
                  : "bg-white text-black/60 hover:bg-black/5"
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
              <h2 className="text-2xl font-bold mb-6">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedServices.map(service => (
                  <Link to={`/services/${service.slug}`} key={service.id} className="bg-white rounded-[32px] p-6 flex flex-col justify-between group hover:shadow-xl transition-all border border-black/5">
                    <div>
                      <div className="w-16 h-16 bg-brand-ac/10 text-brand-ac rounded-2xl flex items-center justify-center font-bold mb-6">SRV</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-lex-purple transition-colors">{service.name}</h3>
                      <p className="text-black/60 font-medium text-sm line-clamp-2">{service.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <div className="font-bold text-lg">Rp{service.startingPrice.toLocaleString('id-ID')}</div>
                      <ArrowRight className="w-5 h-5 text-black/40 group-hover:text-lex-purple group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products */}
          {(activeTab === "all" || activeTab === "products") && matchedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {matchedProducts.map(product => (
                  <Link to={`/products/${product.slug}`} key={product.id} className="bg-white rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow border border-black/5 block">
                    <div className="aspect-square bg-gray-50 overflow-hidden relative p-6">
                       <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-xs text-black/40 font-bold uppercase tracking-wider mb-1">{product.brand}</div>
                      <h3 className="font-bold mb-2 group-hover:text-lex-purple transition-colors line-clamp-2 text-sm md:text-base">{product.name}</h3>
                      <div className="font-black text-lg">Rp{product.price.toLocaleString('id-ID')}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Digital */}
          {(activeTab === "all" || activeTab === "digital") && matchedDigital.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Digital</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedDigital.map(digital => (
                  <div key={digital.id} className="bg-white rounded-[32px] p-6 border border-black/5">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-lex-soft rounded-2xl overflow-hidden p-2">
                        <img src={digital.image} alt={digital.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold">{digital.name}</h3>
                        <p className="text-sm text-black/60 font-medium">{digital.provider}</p>
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
                           className="w-full flex justify-between items-center p-3 rounded-xl border border-black/5 hover:border-lex-purple transition-colors cursor-pointer text-left"
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
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold mb-2">No results found</h2>
              <p className="text-black/60 font-medium">We couldn't find anything matching "{query}". Try checking for typos or searching with different keywords.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
