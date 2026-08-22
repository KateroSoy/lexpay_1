import { useState } from "react";
import { PiArrowRight, PiCaretDown, PiCaretUp } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";

const recommendations = [
  {
    time: "Morning",
    title: "Coffee before work?",
    brand: "LEX Coffee",
    bg: "bg-[#F3EDE4]",
    text: "text-[#78350F]",
    btn: "bg-[#78350F] text-white"
  },
  {
    time: "Hot day",
    title: "AC needs attention?",
    brand: "LEX AC",
    bg: "bg-[#E0F2FE]",
    text: "text-[#0369A1]",
    btn: "bg-[#0369A1] text-white"
  },
  {
    time: "Gaming",
    title: "Ready for an upgrade?",
    brand: "LEX Comp",
    bg: "bg-[#F3E8FF]",
    text: "text-[#6B21A8]",
    btn: "bg-[#6B21A8] text-white"
  },
  {
    time: "Security",
    title: "Keep an eye on things.",
    brand: "LEX Network",
    bg: "bg-[#DBEAFE]",
    text: "text-[#1E3A8A]",
    btn: "bg-[#1E3A8A] text-white"
  },
  {
    time: "Self Care",
    title: "Time for a fresh cut.",
    brand: "LEX Barber",
    bg: "bg-[#FCE7F3]",
    text: "text-[#9D174D]",
    btn: "bg-[#9D174D] text-white"
  },
  {
    time: "Pets",
    title: "Stock up on pet food.",
    brand: "Merdeka Petshop",
    bg: "bg-[#FEF3C7]",
    text: "text-[#B45309]",
    btn: "bg-[#B45309] text-white"
  },
  {
    time: "Play",
    title: "Top up your diamonds.",
    brand: "LEX Digital",
    bg: "bg-[#ECFDF5]",
    text: "text-[#047857]",
    btn: "bg-[#047857] text-white"
  },
  {
    time: "Home",
    title: "Need help cleaning?",
    brand: "LEX Clean",
    bg: "bg-[#FEE2E2]",
    text: "text-[#B91C1C]",
    btn: "bg-[#B91C1C] text-white"
  }
];

export function Recommendations() {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedItems = isExpanded ? recommendations : recommendations.slice(0, 4);

  return (
    <section className="py-12 md:py-24 px-4 bg-bg-card">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-8 md:mb-16">
          Made for your day.
        </h2>
        
        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <AnimatePresence>
            {displayedItems.map((item, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.title} 
                className={`${item.bg} rounded-[20px] md:rounded-[32px] p-4 md:p-8 flex flex-col justify-between min-h-[190px] md:min-h-[380px] group cursor-pointer border border-border-main md:border-none`}
              >
                <div>
                  <span className={`inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-bg-card/50 ${item.text} font-bold text-[10px] md:text-sm mb-3 md:mb-6 uppercase tracking-wider`}>
                    {item.time}
                  </span>
                  <h3 className={`text-[17px] md:text-3xl font-black ${item.text} leading-tight mb-2 tracking-tight`}>
                    {item.title}
                  </h3>
                </div>
                
                <div className="flex items-end justify-between mt-4 md:mt-8">
                  <span className={`font-bold ${item.text} opacity-80 text-[10px] md:text-base line-clamp-1 pr-2`}>{item.brand}</span>
                  <button className={`w-8 h-8 md:w-12 md:h-12 shrink-0 rounded-full ${item.btn} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <PiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show/Hide Toggle (Visible mostly on Mobile/Tablet) */}
        <div className="mt-8 flex justify-center lg:hidden">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-6 py-3 border border-border-main rounded-full text-sm font-bold text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {isExpanded ? (
              <>Tampilkan Lebih Sedikit <PiCaretUp className="w-4 h-4" /></>
            ) : (
              <>Lihat Semua ({recommendations.length}) <PiCaretDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
