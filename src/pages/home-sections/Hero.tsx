import { motion } from "framer-motion";
import { PiMagnifyingGlassThin, PiArrowRightThin } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="relative min-h-[70vh] md:min-h-screen flex items-center justify-center pt-16 md:pt-24 pb-20 md:pb-0 px-4">
      {/* Background container that clips decorative elements but allows floating elements */}
      <div className="absolute inset-0 bg-[#0a0a0a] rounded-b-[40px] md:rounded-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-lex-purple/20 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >


          <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-sm font-semibold mb-8 text-white">
            All-in-One Commerce & Services
          </span>
          <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] text-white mb-6">
            Everything you need.<br />
            <span className="text-lex-purple">One LEX away.</span>
          </h1>
          <p className="max-w-2xl text-base md:text-xl text-white/80 font-medium px-4">
            Temukan produk, pesan layanan, bayar kebutuhan harian, dan nikmati seluruh ekosistem LEX dari satu tempat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-8 px-4"
        >
          <Link to="/explore" className="w-full sm:w-auto px-8 py-4 bg-lex-purple text-white rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all text-center shadow-lg">
            Mulai Jelajahi
          </Link>
        </motion.div>

        {/* Global Search Bar (ultra-minimal elegant pill) */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-md:-mb-14 relative z-20 w-[92%] max-w-2xl bg-bg-card p-1.5 md:p-2 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-row items-center border border-black/5 dark:border-white/10 focus-within:border-lex-purple/30 transition-all mx-auto"
        >
          <div className="flex items-center justify-center pl-4 pr-2 md:pl-5 md:pr-3">
            <PiMagnifyingGlassThin className="w-6 h-6 text-text-primary opacity-60" />
          </div>
          
          <input 
            type="text" 
            name="q"
            placeholder="Cari layanan, produk, atau toko..."
            className="flex-1 bg-transparent border-none outline-none text-sm md:text-base py-3 md:py-3.5 placeholder:text-text-secondary/60 text-text-primary font-medium w-full"
          />
          
          <button type="submit" className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-lex-purple text-white hover:bg-lex-purple-start rounded-full transition-all mr-1 shadow-sm shadow-lex-purple/20 group shrink-0">
            <PiArrowRightThin className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.form>
      </div>
    </section>
  );
}
