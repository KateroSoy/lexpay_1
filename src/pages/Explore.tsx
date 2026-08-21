import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { mockProducts, mockServices, mockDigital } from "../data/mockData";
import { Link, useLocation } from "react-router-dom";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";

export default function Explore() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("all");
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Basic routing to tabs based on URL path
    if (location.pathname === "/digital") setActiveTab("digital");
    else if (location.pathname === "/products") setActiveTab("products");
    else if (location.pathname === "/services") setActiveTab("services");
    else setActiveTab("all");
  }, [location.pathname]);

  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-lex-black mb-8">
          Explore Ecosystem
        </h1>
        
        {/* Search */}
        <Link to="/search" className="bg-white p-2 rounded-full shadow-sm flex items-center gap-4 border border-black/5 mb-12 cursor-text hover:border-black/20 transition-colors">
          <div className="pl-6">
            <Search className="w-5 h-5 text-black/40" />
          </div>
          <div className="flex-1 py-3 text-black/40 font-medium text-left">
            Cari produk, layanan, atau digital...
          </div>
        </Link>

        {/* Category Pills */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-12">
          {["All", "Products", "Services", "Digital", "Food", "Technology"].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat.toLowerCase())}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeTab === cat.toLowerCase() 
                  ? "bg-lex-black text-white" 
                  : "bg-white text-black/60 hover:bg-black/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-16">
          {/* Services Section */}
          {(activeTab === "all" || activeTab === "services" || activeTab === "technology") && (
             <div>
                <h2 className="text-3xl font-bold mb-6">Popular Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockServices.map(service => (
                    <Link to={`/services/${service.slug}`} key={service.id} className="bg-white rounded-[32px] overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer block border border-black/5">
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                         <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold">
                           {service.provider}
                         </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-lex-purple transition-colors">{service.name}</h3>
                        <p className="text-black/60 font-medium text-sm line-clamp-2 mb-4">{service.description}</p>
                        <div className="flex items-end justify-between">
                          <div>
                            <div className="text-xs text-black/40 font-bold uppercase tracking-wider">Mulai dari</div>
                            <div className="font-bold text-lg">Rp{service.startingPrice.toLocaleString('id-ID')}</div>
                          </div>
                          <span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold text-black/60">{service.duration}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
             </div>
          )}

          {/* Products Section */}
          {(activeTab === "all" || activeTab === "products" || activeTab === "food") && (
             <div>
                <h2 className="text-3xl font-bold mb-6">Physical Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {mockProducts.map(product => (
                    <Link to={`/products/${product.slug}`} key={product.id} className="bg-white rounded-[24px] overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer block border border-black/5">
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

          {/* Digital Section */}
          {(activeTab === "all" || activeTab === "digital") && (
             <div>
                <h2 className="text-3xl font-bold mb-6">Digital Vouchers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {mockDigital.map(digital => (
                    <div key={digital.id} className="bg-white rounded-[32px] overflow-hidden group hover:shadow-lg transition-shadow cursor-pointer block border border-black/5 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-lex-soft rounded-2xl overflow-hidden p-2">
                           <img src={digital.image} alt={digital.name} className="w-full h-full object-cover rounded-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg group-hover:text-lex-purple transition-colors">{digital.name}</h3>
                          <div className="text-xs font-bold text-black/50 uppercase">{digital.provider}</div>
                        </div>
                      </div>
                      <div className="space-y-2 mt-6">
                        {digital.denominations.slice(0,2).map(denom => (
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
        </div>
      </div>
    </div>
  );
}
