import { PiArrowRight } from "react-icons/pi";
import { Link } from "react-router-dom";

export function ShopServices() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 px-4 md:px-0 py-8 md:py-0">
      {/* Shop Panel */}
      <div className="bg-bg-main p-8 md:p-24 min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between group cursor-pointer relative overflow-hidden rounded-[32px] md:rounded-none">
        <div className="absolute inset-0 bg-gradient-to-br from-lex-soft to-gray-200 opacity-50" />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6">Shop anything.</h2>
          <Link to="/products" className="flex items-center justify-center md:justify-start gap-2 text-base md:text-xl font-bold bg-bg-card text-white px-6 py-3 md:px-8 md:py-4 rounded-full w-full md:w-fit group-hover:scale-105 transition-transform shadow-lg">
            Explore Products <PiArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Abstract representation of products */}
        <div className="relative z-10 mt-12 md:mt-16 grid grid-cols-2 gap-4 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-bg-card rounded-3xl aspect-square shadow-sm p-4 md:p-6 flex flex-col justify-end">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-full mb-auto" />
            <div className="h-3 md:h-4 w-2/3 bg-gray-200 rounded mb-2" />
            <div className="h-3 md:h-4 w-1/3 bg-gray-200 rounded" />
          </div>
          <div className="bg-bg-card rounded-3xl aspect-[3/4] shadow-sm p-4 md:p-6 flex flex-col justify-end mt-8 md:mt-12">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-white/10 rounded-full mb-auto" />
            <div className="h-3 md:h-4 w-3/4 bg-gray-200 rounded mb-2" />
            <div className="h-3 md:h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* Services Panel */}
      <div className="bg-bg-card text-white p-8 md:p-24 min-h-[50vh] md:min-h-[70vh] flex flex-col justify-between group cursor-pointer relative overflow-hidden rounded-[32px] md:rounded-none">
        <div className="absolute inset-0 bg-gradient-to-br from-lex-black to-gray-900 opacity-50" />
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 md:mb-6">Book anything.</h2>
          <Link to="/services" className="flex items-center justify-center md:justify-start gap-2 text-base md:text-xl font-bold bg-bg-card/10 text-text-primary px-6 py-3 md:px-8 md:py-4 rounded-full w-full md:w-fit group-hover:bg-bg-card/20 group-hover:scale-105 transition-all backdrop-blur-md">
            Explore Services <PiArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Abstract representation of services/calendar */}
        <div className="relative z-10 mt-12 md:mt-16 grid grid-cols-1 gap-4 opacity-80 group-hover:opacity-100 transition-opacity max-w-md ml-auto pointer-events-none">
          <div className="bg-bg-card/10 rounded-3xl p-4 md:p-6 backdrop-blur-sm border border-white/5">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <div className="h-3 md:h-4 w-1/3 bg-bg-card/20 rounded" />
              <div className="h-5 md:h-6 w-12 md:w-16 bg-brand-ac rounded-full" />
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-bg-card/10 rounded-2xl" />
              <div className="flex-1">
                <div className="h-3 md:h-4 w-3/4 bg-bg-card/20 rounded mb-2" />
                <div className="h-3 md:h-4 w-1/2 bg-bg-card/10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
