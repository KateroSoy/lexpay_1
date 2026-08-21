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
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-lex-soft px-4">
      {/* Decorative background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-lex-purple/10 rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex flex-col items-center"
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-black/5 text-sm font-semibold mb-8">
            All-in-One Commerce & Services
          </span>
          <h1 className="text-4xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-[-0.04em] text-lex-black mb-6">
            Everything you need.<br />
            <span className="text-lex-purple">One LEX away.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-black/60 font-medium">
            Temukan produk, pesan layanan, bayar kebutuhan harian, dan nikmati seluruh ekosistem LEX dari satu tempat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mt-8"
        >
          <Link to="/explore" className="w-full sm:w-auto px-8 py-4 bg-lex-black text-white rounded-full font-semibold text-lg hover:bg-black/90 hover:scale-105 active:scale-95 transition-all text-center">
            Mulai Jelajahi
          </Link>
          <Link to="/services" className="w-full sm:w-auto px-8 py-4 bg-black/5 text-lex-black rounded-full font-semibold text-lg hover:bg-black/10 transition-colors text-center">
            Lihat Semua Layanan
          </Link>
        </motion.div>

        {/* Global Search Bar (prominent) */}
        <motion.form 
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 w-full max-w-3xl bg-white p-2 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center gap-4 border border-black/5 focus-within:border-black/20 focus-within:shadow-lg transition-all"
        >
          <div className="pl-6">
            <Search className="w-6 h-6 text-black/40" />
          </div>
          <input 
            type="text" 
            name="q"
            placeholder="Cari apa saja di LEXPAY..."
            className="flex-1 bg-transparent border-none outline-none text-lg py-4 placeholder:text-black/30 font-medium"
          />
          <button type="submit" className="bg-lex-purple text-white px-8 py-4 rounded-full font-semibold hover:bg-lex-purple-start transition-colors">
            Cari
          </button>
        </motion.form>
      </div>

      {/* Optional floating ecosystem mockups could go here using Framer Motion for pointer tracking */}
    </section>
  );
}
