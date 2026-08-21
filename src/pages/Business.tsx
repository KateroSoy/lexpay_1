import { ArrowRight, ShieldCheck, HardDrive, Wifi, Wrench } from "lucide-react";

export default function Business() {
  return (
    <div className="bg-lex-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-40 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-lex-purple/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-bold text-sm tracking-widest uppercase mb-8">
              B2B Solutions
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]">
              LEX for<br />Business.
            </h1>
            <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">
              Teknologi, keamanan dan maintenance untuk bisnis yang terus bergerak. Percayakan infrastruktur Anda pada ekosistem LEX.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-lex-black px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 active:scale-95 transition-all">
              Lihat solusi bisnis
            </button>
            <button className="bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Hubungi Sales
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white/5 rounded-[32px] p-8 hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-white/20">
              <div className="w-14 h-14 bg-brand-network/20 text-brand-network rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">CCTV & Security</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Professional CCTV installation and monitoring setups for offices, retail, and warehouses.
              </p>
            </div>

            <div className="bg-white/5 rounded-[32px] p-8 hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-white/20">
              <div className="w-14 h-14 bg-brand-network/20 text-brand-network rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Wifi className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Network Setup</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Enterprise-grade WiFi, routing, and structured cabling for seamless connectivity.
              </p>
            </div>

            <div className="bg-white/5 rounded-[32px] p-8 hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-white/20">
              <div className="w-14 h-14 bg-brand-comp/20 text-brand-comp rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <HardDrive className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">PC Provisioning</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Bulk ordering and setup of office workstations, servers, and tech infrastructure.
              </p>
            </div>

            <div className="bg-white/5 rounded-[32px] p-8 hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-white/20">
              <div className="w-14 h-14 bg-brand-ac/20 text-brand-ac rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AC Maintenance</h3>
              <p className="text-white/60 font-medium leading-relaxed">
                Scheduled cleaning and maintenance contracts for commercial air conditioning units.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-8">Ready to upgrade your workspace?</h2>
        <button className="bg-lex-purple text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-lex-purple-start active:scale-95 transition-all inline-flex items-center gap-3">
          Mulai Konsultasi <ArrowRight className="w-6 h-6" />
        </button>
      </section>
    </div>
  );
}
