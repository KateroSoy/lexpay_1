export function Trust() {
  return (
    <section className="py-24 bg-bg-card px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-black tracking-tight text-text-primary mb-4">
            Satu akun.<br className="md:hidden" /> Banyak kebutuhan.
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">8+</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Kategori Utama</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">24/7</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Digital Transactions</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">1</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">LEX Ecosystem</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">100%</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Integrated Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
