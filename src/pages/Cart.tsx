import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tight text-lex-black mb-12">Your Cart</h1>
          
          <div className="space-y-12">
            {/* Services Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-lex-black text-white flex items-center justify-center text-sm">1</span>
                Scheduled Services
              </h2>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-brand-ac/20 rounded-2xl flex items-center justify-center text-brand-ac font-bold shrink-0">AC</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">AC Cleaning - Basic</h3>
                    <p className="text-black/60 font-medium text-sm">Tomorrow · 10:00 AM</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg mb-2">Rp75.000</div>
                    <button className="text-sm font-bold text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-lex-black text-white flex items-center justify-center text-sm">2</span>
                Physical Products
              </h2>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                    <img src="https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80" alt="Keyboard" className="w-full h-full object-cover mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Mechanical Keyboard Pro X</h3>
                    <p className="text-black/60 font-medium text-sm mb-2">Variant: Black</p>
                    <div className="flex items-center gap-4">
                       <select className="border border-black/10 rounded-lg px-3 py-1 font-medium bg-transparent outline-none">
                         <option>1</option>
                         <option>2</option>
                       </select>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg mb-2">Rp799.000</div>
                    <button className="text-sm font-bold text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </div>

             {/* Digital Section */}
             <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-lex-black text-white flex items-center justify-center text-sm">3</span>
                Digital Products
              </h2>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-black/5">
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-lex-purple/10 rounded-2xl flex items-center justify-center text-lex-purple font-bold shrink-0">MLBB</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Mobile Legends Diamonds</h3>
                    <p className="text-black/60 font-medium text-sm mb-2">172 Diamonds (ID: 1234567)</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Instant Delivery</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg mb-2">Rp50.000</div>
                    <button className="text-sm font-bold text-red-500 hover:text-red-600">Remove</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 p-8 sticky top-32">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-lg font-medium">
              <div className="flex justify-between">
                <span className="text-black/60">Services (1)</span>
                <span>Rp75.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Products (1)</span>
                <span>Rp799.000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black/60">Digital (1)</span>
                <span>Rp50.000</span>
              </div>
            </div>
            
            <div className="h-px w-full bg-black/5 mb-6" />
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-bold">Total</span>
              <span className="text-4xl font-black">Rp924.000</span>
            </div>

            <Link to="/checkout" className="block w-full bg-lex-black text-white text-center py-5 rounded-full font-bold text-lg hover:bg-black/90 active:scale-95 transition-all shadow-xl">
              Lanjut Pembayaran
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
