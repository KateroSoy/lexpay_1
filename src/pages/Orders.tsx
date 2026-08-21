import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../lib/store";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const orders = useUserStore(state => state.orders);

  // For this demo, let's just show all orders, flattening their items for display, 
  // or show one block per order.
  
  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-lex-black mb-12">My Orders</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
          {["All", "Processing", "Completed"].map(cat => (
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

        {orders.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[32px]">
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <Link to="/explore" className="text-lex-purple font-bold hover:underline">Start shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.filter(o => activeTab === 'all' || o.status === activeTab).map(order => (
              <div key={order.id} className="bg-white rounded-[32px] p-8 border border-black/5 hover:border-black/10 transition-colors">
                <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-bold">Order {order.id}</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-black/50 font-medium text-sm">
                    {new Date(order.date).toLocaleString('id-ID')}
                  </div>
                </div>
                
                <div className="space-y-6">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden font-bold">
                          {item.type === 'service' ? (item.metadata?.provider || 'SVC') : (
                            item.image ? <img src={item.image} className="w-full h-full object-cover" /> : item.type.substring(0,2).toUpperCase()
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-lg mb-1">{item.name}</div>
                          <div className="text-black/60 font-medium text-sm">
                            {item.quantity}x • {item.type === 'product' && item.metadata?.variant ? `Variant: ${item.metadata.variant}` : ''}
                          </div>
                        </div>
                      </div>
                      <div className="font-bold text-xl">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center">
                  <div className="text-black/60 font-medium">Payment: {order.paymentMethod}</div>
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
