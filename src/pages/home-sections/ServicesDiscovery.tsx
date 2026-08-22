export function ServicesDiscovery() {
  return (
    <section className="py-16 md:py-32 px-4 bg-bg-card">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-4">
            Something needs fixing?
          </h2>
          <h3 className="text-3xl md:text-4xl font-black opacity-60 text-text-secondary">
            There's a LEX for that.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: AC */}
          <div className="bg-bg-main rounded-[40px] p-6 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[480px] group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-ac/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-ac/20 text-brand-ac font-bold text-sm mb-6">LEX AC</span>
              <h3 className="text-4xl font-black mb-4">Breathe better.</h3>
              <p className="text-lg text-text-secondary font-medium mb-8">Servis, cleaning dan perawatan AC langsung dari teknisi profesional.</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {['Cleaning', 'Maintenance', 'Repair', 'Installation'].map((chip) => (
                  <span key={chip} className="px-4 py-2 rounded-full bg-bg-card text-sm font-semibold shadow-sm text-white/70">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <button className="relative z-10 w-fit bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold group-hover:scale-105 transition-transform">
              Pesan Servis
            </button>
          </div>

          {/* Card 2: Network */}
          <div className="bg-bg-card rounded-[40px] p-6 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[480px] group relative overflow-hidden text-text-primary">
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-network/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3" />
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-4 py-1.5 rounded-full bg-bg-card/10 text-text-primary font-bold text-sm mb-6">LEX Network</span>
              <h3 className="text-4xl font-black mb-4">Keep everything secure.</h3>
              <p className="text-lg text-text-secondary font-medium mb-8">CCTV, networking, security systems and professional installation.</p>
            </div>
            <button className="relative z-10 w-fit bg-bg-card text-white px-8 py-4 rounded-full font-bold group-hover:scale-105 transition-transform">
              Lihat Solusi
            </button>
          </div>

          {/* Card 3: Comp */}
          <div className="bg-bg-card rounded-[40px] p-6 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[480px] group relative overflow-hidden text-text-primary">
            <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] bg-brand-comp/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-comp/20 text-brand-comp font-bold text-sm mb-6">LEX Comp</span>
              <h3 className="text-4xl font-black mb-4">Build your dream machine.</h3>
              <p className="text-lg text-text-secondary font-medium mb-8">Custom PC, upgrade, troubleshooting and technology consultation.</p>
            </div>
            <button className="relative z-10 w-fit bg-brand-comp text-white px-8 py-4 rounded-full font-bold group-hover:scale-105 transition-transform">
              Build a PC
            </button>
          </div>

          {/* Card 4: Barber */}
          <div className="bg-bg-main rounded-[40px] p-6 md:p-10 flex flex-col justify-between min-h-[320px] md:min-h-[480px] group relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-barber/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
            <div className="relative z-10 max-w-md">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-barber/20 text-brand-barber font-bold text-sm mb-6">LEX Barber</span>
              <h3 className="text-4xl font-black mb-4">Look sharp.</h3>
              <p className="text-lg text-text-secondary font-medium mb-8">Booking barber tanpa antre lama. Premium modern barber environment.</p>
            </div>
            <button className="relative z-10 w-fit bg-brand-barber text-white px-8 py-4 rounded-full font-bold group-hover:scale-105 transition-transform shadow-[0_8px_20px_-8px_rgba(245,158,11,0.6)]">
              Book sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
