import { motion } from "framer-motion";

const ecosystemBrands = [
  { name: "LEX Network", desc: "CCTV & Network", color: "bg-brand-network" },
  { name: "LEX AC", desc: "Air Conditioner Service", color: "bg-brand-ac text-black" },
  { name: "LEX Comp", desc: "PC & Technology", color: "bg-brand-comp" },
  { name: "LEX Barber", desc: "Grooming", color: "bg-brand-barber" },
  { name: "LEX Coffee", desc: "Food & Beverage", color: "bg-brand-coffee" },
  { name: "Merdeka Petshop", desc: "Pet Essentials", color: "bg-brand-pet text-black" },
];

export function Ecosystem() {
  return (
    <section className="py-32 bg-lex-black text-white px-4 overflow-hidden">
      <div className="mx-auto max-w-7xl mb-16 md:mb-24">
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Meet the<br />LEX ecosystem.
        </h2>
        <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium">
          Dari teknologi sampai kebutuhan sehari-hari, semuanya terhubung dalam satu pengalaman.
        </p>
      </div>

      {/* Mosaic Showcase */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Large featured */}
          <div className="lg:col-span-2 bg-white/5 rounded-[32px] p-8 md:p-12 aspect-video md:aspect-auto md:min-h-[400px] flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-brand-network/20 group-hover:bg-brand-network/30 transition-colors duration-500" />
            <div className="relative z-20">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">LEX Network</h3>
              <p className="text-lg text-white/80">CCTV, networking, security systems and professional installation.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-brand-ac rounded-[32px] p-8 md:p-12 aspect-square flex flex-col justify-end relative overflow-hidden group text-lex-black">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX AC</h3>
              <p className="text-lg opacity-80 font-medium">Air Conditioner Service</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-brand-comp rounded-[32px] p-8 md:p-12 aspect-square flex flex-col justify-end relative overflow-hidden group text-white">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX Comp</h3>
              <p className="text-lg opacity-80 font-medium">PC & Technology</p>
            </div>
          </div>

          {/* Card 4: Horizontal spanning */}
          <div className="md:col-span-2 bg-brand-barber rounded-[32px] p-8 md:p-12 aspect-[2/1] flex flex-col justify-end relative overflow-hidden group text-white">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX Barber</h3>
              <p className="text-lg opacity-80 font-medium">Grooming & Style</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
