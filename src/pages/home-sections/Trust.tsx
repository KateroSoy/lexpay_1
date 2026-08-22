import { motion } from "framer-motion";

export function Trust() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  return (
    <section className="py-8 md:py-16 bg-bg-main px-4">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-black tracking-tight text-text-primary mb-4">
            Satu akun.<br className="md:hidden" /> Banyak kebutuhan.
          </h2>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 text-center"
        >
          <motion.div variants={item} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">8+</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Kategori Utama</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">24/7</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Digital Transactions</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">1</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">LEX Ecosystem</span>
          </motion.div>
          <motion.div variants={item} className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-black text-lex-purple mb-2">100%</span>
            <span className="text-[10px] sm:text-sm md:text-base font-semibold text-text-secondary uppercase tracking-wider">Integrated Experience</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
