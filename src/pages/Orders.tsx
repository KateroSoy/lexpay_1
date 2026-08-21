import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../lib/store";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const orders = useUserStore(state => state.orders);

  // For this demo, let's just show all orders, flattening their items for display, 
  // or show one block per order.
  
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-12">My Orders</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
          {["All", "Processing", "Completed"].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat.toLowerCase())}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors ${
                activeTab === cat.toLowerCase() 
                  ? "bg-btn-bg text-btn-text" 
                  : "bg-bg-card text-text-secondary hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-bg-card rounded-[32px]">
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <Link to="/explore" className="text-lex-purple font-bold hover:underline">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.filter(o => activeTab === 'all' || o.status === activeTab).map(order => (
              <div key={order.id} className="bg-bg-card rounded-[32px] p-8 border border-border-main hover:border-white/20 transition-colors">
                <div className="flex justify-between items-center border-b border-border-main pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-bold">Order {order.id}</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-white/50 font-medium text-sm">
                    {new Date(order.date).toLocaleString('id-ID')}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 border-b border-border-main pb-4 last:border-0 last:pb-0">
                      <div className="flex items-start gap-4 sm:gap-6 w-full sm:w-auto">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center overflow-hidden font-bold shrink-0">
                          {item.type === 'service' ? (item.metadata?.provider || 'SVC') : (
                            item.image ? <img src={item.image} className="w-full h-full object-cover" /> : item.type.substring(0,2).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-base sm:text-lg mb-1 leading-tight line-clamp-2">{item.name}</div>
                          <div className="text-text-secondary font-medium text-xs sm:text-sm">
                            {item.quantity}x • {item.type === 'product' && item.metadata?.variant ? `Variant: ${item.metadata.variant}` : item.type}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-lg sm:text-xl w-full sm:w-auto text-left sm:text-right mt-2 sm:mt-0">
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border-main flex justify-between items-center">
                  <div className="text-text-secondary font-medium">Payment: {order.paymentMethod}</div>
                  <div className="text-2xl font-black text-lex-purple">Total: Rp{order.total.toLocaleString('id-ID')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
