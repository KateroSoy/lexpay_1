import { motion } from "framer-motion";
import { Search } from "lucide-react";
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
      <div className="absolute inset-0 bg-lex-purple md:bg-lex-soft rounded-b-[40px] md:rounded-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white/10 md:bg-lex-purple/10 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          {/* Logo only shows on mobile inside Hero */}
          <div className="md:hidden w-full flex justify-between items-center mb-10 px-2">
            <span className="text-xl font-black tracking-tight text-white uppercase">
              LEXPAY
            </span>
          </div>

          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 md:bg-black/5 text-sm font-semibold mb-8 text-white md:text-black">
            All-in-One Commerce & Services
          </span>
          <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] text-white md:text-lex-black mb-6">
            Everything you need.<br />
            <span className="text-yellow-300 md:text-lex-purple">One LEX away.</span>
          </h1>
          <p className="max-w-2xl text-base md:text-xl text-white/80 md:text-black/60 font-medium px-4">
            Temukan produk, pesan layanan, bayar kebutuhan harian, dan nikmati seluruh ekosistem LEX dari satu tempat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-8 px-4"
        >
          <Link to="/explore" className="w-full sm:w-auto px-8 py-4 bg-white text-lex-purple md:bg-lex-black md:text-white rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all text-center shadow-lg">
            Mulai Jelajahi
          </Link>
        </motion.div>

        {/* Global Search Bar (prominent on desktop, floating card on mobile) */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-md:-mb-32 relative z-20 w-full max-w-3xl bg-white p-3 md:p-2 rounded-2xl md:rounded-full shadow-2xl md:shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex max-md:flex-col md:flex-row items-center gap-3 border border-black/5 focus-within:border-black/20 transition-all mx-4"
        >
          <div className="hidden md:flex pl-6">
            <Search className="w-6 h-6 text-black/40" />
          </div>
          <div className="md:hidden w-full flex items-center px-4 py-2 bg-lex-soft rounded-xl mb-2">
            <Search className="w-5 h-5 text-black/40 mr-3" />
            <input 
              type="text" 
              name="q"
              placeholder="Cari layanan atau produk..."
              className="flex-1 bg-transparent border-none outline-none text-base py-2 placeholder:text-black/40 font-medium text-black"
            />
          </div>
          <input 
            type="text" 
            name="q_desktop"
            placeholder="Cari apa saja di LEXPAY..."
            className="hidden md:block flex-1 bg-transparent border-none outline-none text-lg py-4 placeholder:text-black/30 font-medium"
            onChange={(e) => {
               const mobileInput = e.target.form?.elements.namedItem("q") as HTMLInputElement;
               if (mobileInput) mobileInput.value = e.target.value;
            }}
          />
          <button type="submit" className="w-full md:w-auto bg-lex-purple text-white px-8 py-4 rounded-xl md:rounded-full font-bold hover:bg-lex-purple-start transition-colors">
            Cari
          </button>
        </motion.form>
      </div>
    </section>
  );
}
