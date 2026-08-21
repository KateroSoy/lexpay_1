import { PiArrowRight } from "react-icons/pi";

export function CoffeePetshop() {
  return (
    <section className="flex flex-col">
      {/* LEX Coffee Feature */}
      <div className="bg-[#FAF8F5] py-32 px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-[800px] h-[800px] bg-[#E8DCC8] rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 opacity-50" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="w-full aspect-[4/3] md:aspect-square bg-[#3C1E0A] rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-between p-12">
               <div className="text-[#E8DCC8] opacity-80 text-lg font-medium tracking-widest uppercase">Premium Selected</div>
               <div className="text-right">
                 <div className="text-6xl md:text-8xl font-black text-[#E8DCC8] leading-none mb-4">COLD<br/>BREW</div>
                 <div className="text-[#E8DCC8] opacity-60 font-medium">100% Arabica</div>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 max-w-lg">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#78350F]/10 text-[#78350F] font-bold text-sm mb-6 tracking-widest uppercase">LEX Coffee</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#3C1E0A] mb-6">
              Your coffee.<br />Your way.
            </h2>
            <p className="text-xl md:text-2xl text-[#3C1E0A]/60 font-medium mb-10">
              Pesan favoritmu dari LEX Coffee dan ambil atau antar langsung ke lokasi.
            </p>
            <button className="bg-[#78350F] text-text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-[#3C1E0A] transition-colors shadow-xl">
              Order Coffee
            </button>
          </div>
        </div>
      </div>

      {/* Merdeka Petshop Feature */}
      <div className="bg-brand-pet py-32 px-4 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-[600px] h-[600px] bg-bg-card/40 rounded-full blur-[80px] -translate-x-1/3 -translate-y-1/3" />
        
        <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="max-w-lg">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-text-primary font-bold text-sm mb-6 tracking-widest uppercase">Merdeka Petshop</span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-6">
              Everything for<br />your best friend.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 font-medium mb-10">
              Makanan, care, accessories dan kebutuhan hewan kesayangan Anda.
            </p>
            <button className="bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2">
              Shop Pet Essentials <PiArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full aspect-[4/3] md:aspect-square bg-bg-card/20 rounded-[48px] backdrop-blur-sm border border-white/40 p-12 flex flex-col justify-center items-center relative">
             {/* Abstract Pet shapes */}
             <div className="w-48 h-48 bg-bg-card rounded-full shadow-lg relative z-10 flex items-center justify-center">
               <div className="text-4xl">🐕</div>
             </div>
             <div className="w-32 h-32 bg-bg-card rounded-full shadow-lg absolute right-16 bottom-16 flex items-center justify-center">
               <div className="text-4xl">🐈</div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
