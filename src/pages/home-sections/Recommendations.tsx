import { ArrowRight } from "lucide-react";

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
  return (
    <section className="py-24 px-4 bg-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-lex-black mb-16">
          Made for your day.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((item, i) => (
            <div key={i} className={`${item.bg} rounded-[32px] p-8 flex flex-col justify-between min-h-[380px] group cursor-pointer`}>
              <div>
                <span className={`inline-block px-4 py-1.5 rounded-full bg-white/50 ${item.text} font-bold text-sm mb-6 uppercase tracking-wider`}>
                  {item.time}
                </span>
                <h3 className={`text-3xl font-black ${item.text} leading-tight mb-2`}>
                  {item.title}
                </h3>
              </div>
              
              <div className="flex items-end justify-between mt-8">
                <span className={`font-bold ${item.text} opacity-80`}>{item.brand}</span>
                <button className={`w-12 h-12 rounded-full ${item.btn} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
