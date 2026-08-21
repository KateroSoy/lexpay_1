export function AppPromotion() {
  return (
    <section className="py-32 px-4 bg-bg-card overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-6">
          LEXPAY in your pocket.
        </h2>
        <p className="text-xl md:text-2xl text-text-secondary font-medium mb-12 max-w-2xl">
          Belanja, pesan layanan, cek transaksi dan kelola semuanya dari satu aplikasi.
        </p>
        <div className="flex gap-4 mb-20">
          <button className="bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
            App Store
          </button>
          <button className="bg-white/10 text-text-primary px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-colors flex items-center gap-2">
            TOKOFILE Play
          </button>
        </div>

        {/* Mockups */}
        <div className="flex justify-center gap-8 relative mt-10">
          <div className="absolute top-1/2 left-1/2 w-full max-w-[800px] h-[500px] bg-lex-purple/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 w-72 h-[600px] bg-bg-card rounded-[48px] border-[8px] border-lex-black shadow-[0_30px_80px_rgba(0,0,0,0.15)] overflow-hidden translate-y-12 rotate-[-5deg]">
            <div className="w-32 h-6 bg-bg-card absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl" />
            <div className="pt-12 px-4">
              <div className="h-8 w-2/3 bg-white/10 rounded-full mb-6" />
              <div className="h-40 w-full bg-bg-main rounded-3xl mb-4" />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="h-24 bg-white/5 rounded-2xl" />
                <div className="h-24 bg-white/5 rounded-2xl" />
              </div>
              <div className="h-32 w-full bg-brand-ac/10 rounded-3xl" />
            </div>
          </div>

          <div className="relative z-20 w-72 h-[600px] bg-bg-card rounded-[48px] border-[8px] border-lex-black shadow-[0_30px_80px_rgba(0,0,0,0.2)] overflow-hidden -translate-y-12 rotate-[2deg]">
            <div className="w-32 h-6 bg-bg-card absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl" />
            <div className="pt-12 px-4 h-full bg-bg-card text-white">
              <div className="h-8 w-1/2 bg-bg-card/10 rounded-full mb-6" />
              <div className="space-y-4">
                <div className="h-20 w-full bg-bg-card/5 rounded-2xl" />
                <div className="h-20 w-full bg-bg-card/5 rounded-2xl" />
                <div className="h-20 w-full bg-brand-ac rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="bg-bg-main text-white py-40 px-4 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-12 leading-none">
          Whatever you need.<br />
          <span className="opacity-60 text-text-secondary">Start with LEX.</span>
        </h2>
        <button className="bg-bg-card text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
          Explore LEXPAY
        </button>
      </div>
    </section>
  );
}
