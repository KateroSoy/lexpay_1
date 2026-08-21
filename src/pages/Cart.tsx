import { Link } from "react-router-dom";
import { useCartStore } from "../lib/store";
import { PiTrash } from "react-icons/pi";
import toast from "react-hot-toast";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  const services = items.filter(i => i.type === 'service');
  const products = items.filter(i => i.type === 'product');
  const digital = items.filter(i => i.type === 'digital');

  const handleRemove = (id: string, name: string) => {
    removeItem(id);
    toast.success(`${name} removed from cart`);
  };

  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h1 className="text-4xl font-black tracking-tight text-text-primary mb-12">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-24 bg-bg-card rounded-3xl border border-border-main shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-text-secondary mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/explore" className="bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold">
                Start Exploring
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Services Section */}
              {services.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-btn-bg text-btn-text flex items-center justify-center text-sm">S</span>
                    Scheduled Services
                  </h2>
                  <div className="space-y-4">
                    {services.map(item => (
                      <div key={item.id} className="bg-bg-card rounded-[24px] sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-border-main">
                        <div className="flex items-start gap-4 sm:gap-6">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-brand-ac/20 rounded-2xl flex items-center justify-center text-brand-ac font-bold shrink-0 text-xs sm:text-base text-center p-2">
                            {item.metadata?.provider || 'Service'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg line-clamp-2 leading-tight mb-1">{item.name}</h3>
                            <p className="text-text-secondary font-medium text-xs sm:text-sm mb-3">Tomorrow · 10:00 AM (TBD)</p>
                            <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                              <div className="font-bold text-base sm:text-lg text-lex-purple">Rp{item.price.toLocaleString('id-ID')}</div>
                              <button onClick={() => handleRemove(item.id, item.name)} className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 active:scale-95">
                                <PiTrash className="w-4 h-4"/> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Section */}
              {products.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-btn-bg text-btn-text flex items-center justify-center text-sm">P</span>
                    Physical Products
                  </h2>
                  <div className="space-y-4">
                    {products.map(item => (
                      <div key={item.id} className="bg-bg-card rounded-[24px] sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-border-main">
                        <div className="flex items-start gap-4 sm:gap-6">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-2xl overflow-hidden shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg line-clamp-2 leading-tight mb-1">{item.name}</h3>
                            {item.metadata?.variant && (
                              <p className="text-text-secondary font-medium text-xs sm:text-sm mb-3">Variant: {item.metadata.variant}</p>
                            )}
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-3 mt-4 sm:mt-2">
                               <div className="font-bold text-base sm:text-lg text-lex-purple">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</div>
                               
                               <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                                 <div className="flex items-center border border-white/20 rounded-lg overflow-hidden w-fit">
                                   <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold hover:bg-white/10">-</button>
                                   <span className="px-3 font-semibold text-sm">{item.quantity}</span>
                                   <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold hover:bg-white/10">+</button>
                                 </div>
                                 <button onClick={() => handleRemove(item.id, item.name)} className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 active:scale-95">
                                   <PiTrash className="w-4 h-4"/> Remove
                                 </button>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Digital Section */}
              {digital.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-btn-bg text-btn-text flex items-center justify-center text-sm">D</span>
                    Digital Products
                  </h2>
                  <div className="space-y-4">
                    {digital.map(item => (
                      <div key={item.id} className="bg-bg-card rounded-[24px] sm:rounded-3xl p-5 sm:p-6 shadow-sm border border-border-main">
                        <div className="flex items-start gap-4 sm:gap-6">
                          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-lex-purple/10 rounded-2xl overflow-hidden shrink-0 p-2">
                             <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg line-clamp-2 leading-tight mb-1">{item.name}</h3>
                            {item.metadata?.digitalInfo && (
                              <p className="text-text-secondary font-medium text-xs sm:text-sm mb-2">{item.metadata.digitalInfo}</p>
                            )}
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] sm:text-xs font-bold rounded-full mb-2 sm:mb-0">Instant Delivery</span>
                            
                            <div className="flex flex-wrap items-center justify-between gap-2 mt-2">
                              <div className="font-bold text-base sm:text-lg text-lex-purple">Rp{item.price.toLocaleString('id-ID')}</div>
                              <button onClick={() => handleRemove(item.id, item.name)} className="text-xs sm:text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 active:scale-95">
                                <PiTrash className="w-4 h-4"/> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-bg-card rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border-main p-8 sticky top-32">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-lg font-medium">
              <div className="flex justify-between">
                <span className="text-text-secondary">Services ({services.length})</span>
                <span>Rp{services.reduce((acc, item) => acc + item.price, 0).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Products ({products.reduce((acc, item) => acc + item.quantity, 0)})</span>
                <span>Rp{products.reduce((acc, item) => acc + (item.price * item.quantity), 0).toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Digital ({digital.length})</span>
                <span>Rp{digital.reduce((acc, item) => acc + item.price, 0).toLocaleString('id-ID')}</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-white/10 mb-6" />
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold">Total</span>
              <span className="text-4xl font-black">Rp{getTotal().toLocaleString('id-ID')}</span>
            </div>

            <Link 
              to={items.length > 0 ? "/checkout" : "#"} 
              className={`block w-full text-center py-5 rounded-full font-bold text-lg transition-all shadow-xl ${
                items.length > 0 
                ? "bg-btn-bg text-btn-text hover:bg-white/80 active:scale-95" 
                : "bg-white/10 opacity-60 text-text-secondary cursor-not-allowed"
              }`}
            >
              Lanjut Pembayaran
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
