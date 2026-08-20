import { useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-lex-black mb-12">My Orders</h1>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide mb-8">
          {["All", "Products", "Services", "Digital"].map(cat => (
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

        <div className="space-y-6">
          {/* Order 1: Service */}
          <Link to="/orders/1" className="block bg-white rounded-[32px] p-8 border border-black/5 hover:border-black/10 transition-colors">
            <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-bold">LEX AC Cleaning</span>
                <span className="bg-brand-ac/20 text-brand-ac px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Scheduled</span>
              </div>
              <div className="text-black/50 font-medium text-sm">Tomorrow · 10:00</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-ac/10 rounded-2xl flex items-center justify-center text-brand-ac font-bold">AC</div>
                <div>
                  <div className="font-bold text-lg mb-1">AC Cleaning - Basic</div>
                  <div className="text-black/60 font-medium text-sm">Technician: Menunggu konfirmasi</div>
                </div>
              </div>
              <div className="font-bold text-xl">Rp75.000</div>
            </div>
          </Link>

          {/* Order 2: Product */}
          <div className="bg-white rounded-[32px] p-8 border border-black/5">
            <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-bold">Mechanical Keyboard Pro X</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">On Delivery</span>
              </div>
              <div className="text-black/50 font-medium text-sm">Est. 22 Aug</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" alt="Keyboard" className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div>
                  <div className="font-bold text-lg mb-1">LEX Comp</div>
                  <div className="text-black/60 font-medium text-sm">Resi: JNT123456789</div>
                </div>
              </div>
              <div className="font-bold text-xl">Rp799.000</div>
            </div>
          </div>

          {/* Order 3: Digital */}
          <div className="bg-white rounded-[32px] p-8 border border-black/5 opacity-70">
            <div className="flex justify-between items-center border-b border-black/5 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-bold">Mobile Legends Diamonds</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Completed</span>
              </div>
              <div className="text-black/50 font-medium text-sm">Today · 14:30</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-lex-purple/10 rounded-2xl flex items-center justify-center text-lex-purple font-bold">ML</div>
                <div>
                  <div className="font-bold text-lg mb-1">172 Diamonds</div>
                  <div className="text-black/60 font-medium text-sm">ID: 1234567</div>
                </div>
              </div>
              <div className="font-bold text-xl">Rp50.000</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
