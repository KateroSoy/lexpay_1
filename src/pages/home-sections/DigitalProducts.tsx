import { motion } from "framer-motion";
import { 
  PiDesktopThin, 
  PiWrenchThin, 
  PiScissorsThin, 
  PiCatThin, 
  PiCoffeeThin, 
  PiToteThin, 
  PiGameControllerThin, 
  PiSquaresFourThin,
  PiArrowRight,
  PiGameController
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export function DigitalProducts() {
  const navigate = useNavigate();

  const categories = [
    { icon: <PiDesktopThin className="w-8 h-8 text-text-primary" />, label: "Tech", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "technology" },
    { icon: <PiWrenchThin className="w-8 h-8 text-text-primary" />, label: "Home Serv.", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "services" },
    { icon: <PiScissorsThin className="w-8 h-8 text-text-primary" />, label: "Lifestyle", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "services" },
    { icon: <PiCatThin className="w-8 h-8 text-text-primary" />, label: "Pets", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "pets" },
    { icon: <PiCoffeeThin className="w-8 h-8 text-text-primary" />, label: "Food", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "food" },
    { icon: <PiToteThin className="w-8 h-8 text-text-primary" />, label: "Shopping", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "products" },
    { icon: <PiGameControllerThin className="w-8 h-8 text-text-primary" />, label: "Digital", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "digital" },
    { icon: <PiSquaresFourThin className="w-8 h-8 text-text-primary" />, label: "Lainnya", bg: "bg-black/[0.03] dark:bg-white/[0.05]", border: "border border-black/5 dark:border-white/10", tab: "all" },
  ];

  return (
    <section className="py-12 md:py-32 px-4 bg-bg-card md:bg-lex-purple md:text-text-primary relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-full h-full bg-gradient-to-br from-lex-purple-start to-lex-purple-end opacity-50 z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
        
        {/* Mobile-only PLISSPA style Grid */}
        <div className="md:hidden w-full px-2 mt-4">
          <div className="grid grid-cols-4 gap-y-6 gap-x-2 mb-6">
            {categories.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/explore?tab=${item.tab}`)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-[60px] h-[60px] rounded-[22px] ${item.bg} flex items-center justify-center relative overflow-hidden group-active:scale-95 transition-all duration-300 ${item.border} hover:bg-black/5 dark:hover:bg-white/10`}>
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-center leading-tight px-1 text-text-primary opacity-80">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full mt-2">
            <a href="http://topup.lexpay.id/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-[20px] font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              <span>Lihat semua produk Top Up Game</span>
              <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center">
                <PiArrowRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>

        {/* Desktop Title / Description */}
        <div className="flex-1 max-md:text-center mt-8 md:mt-0 max-md:px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-text-primary md:text-white">
            Digital stuff.<br className="hidden md:block" />Instantly delivered.
          </h2>
          <p className="text-base md:text-2xl text-text-secondary md:text-white/80 font-medium max-w-lg mb-8 md:mb-10">
            Game Top Up, Pulsa, Paket Data, PLN, E-Wallet, Voucher, and Digital subscriptions.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <Link to="/digital" className="inline-block bg-lex-purple text-white md:bg-bg-card md:text-lex-purple px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              Explore Digital
            </Link>
            <a href="http://topup.lexpay.id/" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-white/80 hover:text-white font-bold text-base hover:underline transition-all">
              Lihat semua produk Top Up Game <PiArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Desktop Quick Transaction Concept Floating UI */}
        <div className="hidden md:block flex-1 relative w-full max-w-lg h-[500px]">
          {/* Card 1: Choose Product */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 0.6 }}
            className="absolute top-10 left-0 bg-bg-card text-text-primary p-6 rounded-3xl shadow-2xl w-64 z-20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-bg-main rounded-full flex items-center justify-center">
                <PiGameController className="w-5 h-5 text-lex-purple" />
              </div>
              <div className="font-bold">MLBB Voucher</div>
            </div>
            <div className="h-2 w-full bg-bg-main rounded-full mb-2" />
            <div className="h-2 w-2/3 bg-bg-main rounded-full" />
          </motion.div>

          {/* Card 2: Enter Number */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-40 right-0 bg-[#23252f] text-white p-6 rounded-3xl shadow-2xl w-72 z-30 border border-white/10"
            style={{ transform: "rotate(5deg)" }}
          >
            <div className="text-sm text-white/70 font-semibold mb-2">User ID</div>
            <div className="rounded-xl px-4 py-3 font-mono text-lg mb-4 bg-white/5 border border-white/10">
              123456789 (1234)
            </div>
            <button className="w-full bg-lex-purple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Pay Rp50.000 <PiArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 3: Done */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-10 left-12 bg-bg-card text-text-primary p-6 rounded-3xl shadow-2xl w-64 z-40"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
              </div>
              <div className="font-black text-xl mb-1">Instant</div>
              <div className="text-sm text-text-secondary font-medium">Delivery completed.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
