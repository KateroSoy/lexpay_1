import { motion } from "framer-motion";

const ecosystemBrands = [
  { name: "LEX Network", desc: "CCTV & Network", color: "bg-brand-network" },
  { name: "LEX AC", desc: "Air Conditioner Service", color: "bg-brand-ac text-white" },
  { name: "LEX Comp", desc: "PC & Technology", color: "bg-brand-comp" },
  { name: "LEX Barber", desc: "Grooming", color: "bg-brand-barber" },
  { name: "LEX Coffee", desc: "Food & Beverage", color: "bg-brand-coffee" },
  { name: "Merdeka Petshop", desc: "Pet Essentials", color: "bg-brand-pet text-white" },
];

export function Ecosystem() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  return (
    <section className="py-6 md:py-16 bg-bg-main px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="mx-auto max-w-7xl mb-8 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight text-text-primary">
          Meet the<br />LEX ecosystem.
        </h2>
        <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-medium">
          Dari teknologi sampai kebutuhan sehari-hari, semuanya terhubung dalam satu pengalaman.
        </p>
      </motion.div>

      {/* Mosaic Showcase */}
      <div className="mx-auto max-w-7xl">
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Card 1: Large featured */}
          <motion.div variants={item} className="lg:col-span-2 bg-bg-card/5 rounded-[32px] p-8 md:p-12 aspect-square md:aspect-auto md:min-h-[400px] flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-brand-network/20 group-hover:bg-brand-network/30 transition-colors duration-500" />
            <div className="relative z-20">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">LEX Network</h3>
              <p className="text-lg text-white/80">CCTV, networking, security systems and professional installation.</p>
            </div>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div variants={item} className="bg-brand-ac rounded-[32px] p-8 md:p-12 aspect-square flex flex-col justify-end relative overflow-hidden group text-text-primary">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX AC</h3>
              <p className="text-lg opacity-80 font-medium">Air Conditioner Service</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} className="bg-brand-comp rounded-[32px] p-8 md:p-12 aspect-square flex flex-col justify-end relative overflow-hidden group text-text-primary">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX Comp</h3>
              <p className="text-lg opacity-80 font-medium">PC & Technology</p>
            </div>
          </motion.div>

          {/* Card 4: Horizontal spanning */}
          <motion.div variants={item} className="md:col-span-2 bg-brand-barber rounded-[32px] p-8 md:p-12 aspect-square md:aspect-[2/1] flex flex-col justify-end relative overflow-hidden group text-text-primary">
            <div className="relative z-20">
              <h3 className="text-3xl font-bold mb-2">LEX Barber</h3>
              <p className="text-lg opacity-80 font-medium">Grooming & Style</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
