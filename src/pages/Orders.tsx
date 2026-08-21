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
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-8">My Orders</h1>

        {/* Segmented Control */}
        <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-2xl mb-8 w-fit border border-black/5 dark:border-white/5">
          {["All", "Processing", "Completed"].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat.toLowerCase())}
              className={`px-6 py-2 rounded-[14px] font-bold text-sm transition-all ${
                activeTab === cat.toLowerCase() 
                  ? "bg-bg-card text-text-primary shadow-sm border border-border-main" 
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-bg-card rounded-[24px] border border-border-main">
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-text-secondary mb-6">Looks like you haven't made a purchase yet.</p>
            <Link to="/explore" className="bg-btn-bg text-btn-text px-6 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform inline-block">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.filter(o => activeTab === 'all' || o.status === activeTab).map(order => (
              <Link to={`/orders/${order.id}`} key={order.id} className="block bg-bg-card rounded-[24px] p-5 sm:p-6 border border-border-main shadow-sm hover:shadow-md transition-shadow">
                
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-border-main pb-4 mb-5 gap-3">
                  <div>
                    <div className="text-xs text-text-secondary font-semibold uppercase tracking-wider mb-1.5">
                      {new Date(order.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="font-black text-lg sm:text-xl flex items-center gap-3">
                      {order.id}
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        order.status === 'completed' ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 sm:gap-5 border-b border-border-main pb-4 last:border-0 last:pb-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/5 dark:bg-white/5 rounded-[14px] flex items-center justify-center overflow-hidden shrink-0 border border-border-main">
                        {item.image ? (
                           <img src={item.image} className="w-full h-full object-contain p-2" />
                        ) : (
                           <span className="font-bold text-text-secondary text-sm">{item.type.substring(0,2).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base sm:text-lg mb-0.5 truncate">{item.name}</div>
                        <div className="text-text-secondary text-xs sm:text-sm font-medium mb-1 capitalize">
                          {item.type === 'product' && item.metadata?.variant 
                            ? `Variant: ${item.metadata.variant}` 
                            : item.type === 'digital' && item.metadata?.digitalInfo
                            ? `Package: ${item.metadata.digitalInfo}`
                            : item.type === 'service' && item.metadata?.provider
                            ? `Provider: ${item.metadata.provider}`
                            : item.type}
                        </div>
                        <div className="text-sm font-bold">
                          {item.quantity}x • Rp {item.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-5 pt-5 border-t border-border-main flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-[16px] p-4 sm:p-5">
                  <div className="flex flex-col">
                    <span className="text-xs text-text-secondary font-medium mb-0.5">Payment Method</span>
                    <span className="font-bold text-sm uppercase">{order.paymentMethod}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-text-secondary font-medium mb-0.5">Total Amount</span>
                    <span className="font-black text-lg sm:text-xl text-text-primary">Rp {order.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
