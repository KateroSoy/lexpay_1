import { motion } from "framer-motion";
import { Gamepad2, ArrowRight, Laptop, Wrench, Coffee, ShoppingBag, Dog, Scissors, Compass } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function DigitalProducts() {
  const navigate = useNavigate();

  const categories = [
    { icon: <Laptop className="w-5 h-5 text-white" />, label: "Technology", color: "bg-blue-500", tab: "technology" },
    { icon: <Wrench className="w-5 h-5 text-white" />, label: "Services", color: "bg-orange-500", tab: "services" },
    { icon: <Coffee className="w-5 h-5 text-white" />, label: "Food", color: "bg-amber-600", tab: "food" },
    { icon: <ShoppingBag className="w-5 h-5 text-white" />, label: "Products", color: "bg-pink-500", tab: "products" },
    { icon: <Gamepad2 className="w-5 h-5 text-white" />, label: "Digital", color: "bg-purple-600", tab: "digital" },
    { icon: <Dog className="w-5 h-5 text-white" />, label: "Pets", color: "bg-lime-500", tab: "products" },
    { icon: <Scissors className="w-5 h-5 text-white" />, label: "Lifestyle", color: "bg-rose-500", tab: "services" },
    { icon: <Compass className="w-5 h-5 text-white" />, label: "Explore All", color: "bg-lex-black", tab: "all" },
  ];

  return (
    <section className="py-12 md:py-32 px-4 bg-white md:bg-lex-purple md:text-white relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-full h-full bg-gradient-to-br from-lex-purple-start to-lex-purple-end opacity-50 z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
        
        {/* Mobile-only PLISSPA style Grid */}
        <div className="md:hidden w-full px-2 mt-4">
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            {categories.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => navigate(`/explore?tab=${item.tab}`)}
                className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95 group"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden group-hover:shadow-md transition-shadow`}>
                  <div className={`absolute inset-0 opacity-20 ${item.color}`}></div>
                  <div className={`relative z-10 w-9 h-9 ${item.color} rounded-full flex items-center justify-center shadow-inner`}>
                    {item.icon}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-center leading-tight px-1 text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Title / Description */}
        <div className="flex-1 max-md:text-center mt-8 md:mt-0 max-md:px-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6 text-lex-black md:text-white">
            Digital stuff.<br className="hidden md:block" />Instantly delivered.
          </h2>
          <p className="text-base md:text-2xl text-black/60 md:text-white/80 font-medium max-w-lg mb-8 md:mb-10">
            Game Top Up, Pulsa, Paket Data, PLN, E-Wallet, Voucher, and Digital subscriptions.
          </p>
          <Link to="/digital" className="inline-block bg-lex-black md:bg-white text-white md:text-lex-purple px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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
            className="absolute top-10 left-0 bg-white text-lex-black p-6 rounded-3xl shadow-2xl w-64 z-20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-lex-soft rounded-full flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-lex-purple" />
              </div>
              <div className="font-bold">MLBB Voucher</div>
            </div>
            <div className="h-2 w-full bg-lex-soft rounded-full mb-2" />
            <div className="h-2 w-2/3 bg-lex-soft rounded-full" />
          </motion.div>

          {/* Card 2: Enter Number */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute top-40 right-0 bg-lex-black text-white p-6 rounded-3xl shadow-2xl w-72 z-30"
          >
            <div className="text-sm text-white/60 font-semibold mb-2">User ID</div>
            <div className="bg-white/10 rounded-xl px-4 py-3 font-mono text-lg mb-4">
              123456789 (1234)
            </div>
            <button className="w-full bg-lex-purple text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
              Pay Rp50.000 <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Card 3: Done */}
          <motion.div 
            initial={{ opacity: 0, y: 20, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-10 left-12 bg-white text-lex-black p-6 rounded-3xl shadow-2xl w-64 z-40"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">✓</div>
              </div>
              <div className="font-black text-xl mb-1">Instant</div>
              <div className="text-sm text-black/60 font-medium">Delivery completed.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
