import { motion } from "framer-motion";
import { PiGameController, PiArrowRight, PiDeviceMobile, PiWifiHigh, PiWallet, PiLightning, PiTicket, PiReceipt, PiSquaresFour } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export function DigitalProducts() {
  const navigate = useNavigate();

  const categories = [
    { icon: <PiDeviceMobile className="w-7 h-7 text-blue-500" strokeWidth={1.2} />, label: "Pulsa", bg: "bg-blue-50/80", border: "border-blue-100", tab: "pulsa" },
    { icon: <PiWifiHigh className="w-7 h-7 text-indigo-500" strokeWidth={1.2} />, label: "Paket Data", bg: "bg-indigo-50/80", border: "border-indigo-100", tab: "data" },
    { icon: <PiWallet className="w-7 h-7 text-purple-500" strokeWidth={1.2} />, label: "E-Wallet", bg: "bg-purple-50/80", border: "border-purple-100", tab: "ewallet" },
    { icon: <PiLightning className="w-7 h-7 text-amber-500" strokeWidth={1.2} />, label: "Token PLN", bg: "bg-amber-50/80", border: "border-amber-100", tab: "pln" },
    { icon: <PiTicket className="w-7 h-7 text-rose-500" strokeWidth={1.2} />, label: "Voucher", bg: "bg-rose-50/80", border: "border-rose-100", tab: "voucher" },
    { icon: <PiGameController className="w-7 h-7 text-lime-600" strokeWidth={1.2} />, label: "Game", bg: "bg-lime-50/80", border: "border-lime-100", tab: "game" },
    { icon: <PiReceipt className="w-7 h-7 text-sky-500" strokeWidth={1.2} />, label: "Pascabayar", bg: "bg-sky-50/80", border: "border-sky-100", tab: "pascabayar" },
    { icon: <PiSquaresFour className="w-7 h-7 text-slate-500" strokeWidth={1.2} />, label: "Lainnya", bg: "bg-slate-50/80", border: "border-slate-100", tab: "lainnya" },
  ];

  return (
    <section className="py-12 md:py-32 px-4 bg-bg-card md:bg-lex-purple md:text-text-primary relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-full h-full bg-gradient-to-br from-lex-purple-start to-lex-purple-end opacity-50 z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
        
        {/* Mobile-only PLISSPA style Grid */}
        <div className="md:hidden w-full px-2 mt-4">
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {categories.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/explore?tab=${item.tab}`)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-[60px] h-[60px] rounded-[22px] ${item.bg} flex items-center justify-center relative overflow-hidden group-active:scale-95 transition-transform duration-300 border ${item.border}`}>
                  <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-center leading-tight px-1 text-white/70">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Title / Description */}
        <div className="flex-1 max-md:text-center mt-8 md:mt-0 max-md:px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-text-primary md:text-text-primary">
            Digital stuff.<br className="hidden md:block" />Instantly delivered.
          </h2>
          <p className="text-base md:text-2xl text-text-secondary md:text-white/80 font-medium max-w-lg mb-8 md:mb-10">
            Game Top Up, Pulsa, Paket Data, PLN, E-Wallet, Voucher, and Digital subscriptions.
          </p>
          <Link to="/digital" className="inline-block bg-bg-card md:bg-bg-card text-white md:text-lex-purple px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            Explore Digital
          </Link>
        </div>
        
        {/* Desktop Quick Transaction Concept Floating UI */}
        <div className="hidden md:block flex-1 relative w-full max-w-lg h-[500px]">
          {/* Card 1: Choose Product */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            transition={{ duration: 0.6 }}
            className="absolute top-10 left-0 bg-bg-card text-white p-6 rounded-3xl shadow-2xl w-64 z-20"
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
            className="absolute top-40 right-0 bg-bg-card text-white p-6 rounded-3xl shadow-2xl w-72 z-30 border border-border-main"
            style={{ transform: "rotate(5deg)" }}
          >
            <div className="text-sm text-text-secondary font-semibold mb-2">User ID</div>
            <div className="bg-bg-card/10 rounded-xl px-4 py-3 font-mono text-lg mb-4">
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
            className="absolute bottom-10 left-12 bg-bg-card text-white p-6 rounded-3xl shadow-2xl w-64 z-40"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-text-primary font-bold">✓</div>
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
