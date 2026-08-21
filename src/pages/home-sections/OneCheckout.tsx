import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function OneCheckout() {
  return (
    <section className="py-32 px-4 bg-lex-soft overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-lex-black mb-6">
            One cart.<br />Even for services.
          </h2>
          <p className="text-xl md:text-2xl text-black/60 font-medium mb-10">
            Pesan teknisi AC, beli makanan kucing, dan top-up game sekaligus. Semua digabung dalam satu pembayaran mudah.
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-lg font-medium">
              <div className="w-6 h-6 rounded-full bg-lex-purple text-white flex items-center justify-center"><Check className="w-4 h-4" /></div>
              Physical product delivery
            </div>
            <div className="flex items-center gap-3 text-lg font-medium">
              <div className="w-6 h-6 rounded-full bg-lex-purple text-white flex items-center justify-center"><Check className="w-4 h-4" /></div>
              Scheduled service booking
            </div>
            <div className="flex items-center gap-3 text-lg font-medium">
              <div className="w-6 h-6 rounded-full bg-lex-purple text-white flex items-center justify-center"><Check className="w-4 h-4" /></div>
              Instant digital delivery
            </div>
          </div>
          <Link to="/explore" className="inline-block bg-lex-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform">
            Mulai Belanja
          </Link>
        </div>

        {/* Mockup Cart UI */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-r from-lex-purple/20 to-brand-ac/20 blur-3xl rounded-full" />
          <div className="relative z-10 bg-white rounded-[40px] p-8 md:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6">Cart Summary</h3>
            
            <div className="space-y-6 mb-8">
              {/* Item 1: Service */}
              <div className="flex items-start gap-4 pb-6 border-b border-black/5">
                <div className="w-12 h-12 bg-brand-ac/20 rounded-xl flex items-center justify-center text-brand-ac font-bold">AC</div>
                <div className="flex-1">
                  <div className="font-bold">AC Cleaning</div>
                  <div className="text-sm text-black/50 font-medium">Tomorrow · 10:00</div>
                </div>
                <div className="font-bold">Rp120.000</div>
              </div>

              {/* Item 2: Physical */}
              <div className="flex items-start gap-4 pb-6 border-b border-black/5">
                <div className="w-12 h-12 bg-brand-pet/20 rounded-xl flex items-center justify-center text-brand-pet font-bold">PET</div>
                <div className="flex-1">
                  <div className="font-bold">Cat Food Premium 2kg</div>
                  <div className="text-sm text-black/50 font-medium">Delivery: 1-2 days</div>
                </div>
                <div className="font-bold">Rp89.000</div>
              </div>

              {/* Item 3: Digital */}
              <div className="flex items-start gap-4 pb-6 border-b border-black/5">
                <div className="w-12 h-12 bg-lex-purple/10 rounded-xl flex items-center justify-center text-lex-purple font-bold">DIG</div>
                <div className="flex-1">
                  <div className="font-bold">MLBB Voucher</div>
                  <div className="text-sm text-lex-purple font-semibold">Instant Delivery</div>
                </div>
                <div className="font-bold">Rp50.000</div>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <div className="text-black/50 font-medium text-lg">Subtotal</div>
              <div className="text-3xl font-black">Rp259.000</div>
            </div>

            <Link to="/cart" className="block w-full bg-lex-black text-white text-center py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-black/90 transition-colors">
              Bayar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
