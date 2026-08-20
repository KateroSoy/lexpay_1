import { motion } from "framer-motion";
import { Gamepad2, Wifi, Zap, Smartphone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function DigitalProducts() {
  return (
    <section className="py-32 px-4 bg-lex-purple text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-lex-purple-start to-lex-purple-end opacity-50 z-0" />
      
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Digital stuff.<br />Instantly delivered.
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-medium max-w-lg mb-10">
            Game Top Up, Pulsa, Paket Data, PLN, E-Wallet, Voucher, and Digital subscriptions.
          </p>
          <Link to="/digital" className="inline-block bg-white text-lex-purple px-8 py-4 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            Explore Digital
          </Link>
        </div>
        
        {/* Quick Transaction Concept Floating UI */}
        <div className="flex-1 relative w-full max-w-lg h-[500px]">
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
