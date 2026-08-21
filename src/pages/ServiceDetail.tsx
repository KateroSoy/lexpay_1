import { useParams, Link } from "react-router-dom";
import { mockServices } from "../data/mockData";
import { PiArrowLeft, PiStarFill, PiClock, PiMapPin, PiCheckCircle } from "react-icons/pi";
import { useState } from "react";
import { useCartStore } from "../lib/store";
import toast from "react-hot-toast";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = mockServices.find(s => s.slug === slug) || mockServices[0];
  const [selectedOption, setSelectedOption] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    const option = service.options[selectedOption];
    addItem({
      id: `${service.id}-${option.name}`,
      productId: service.id,
      type: 'service',
      name: `${service.name} - ${option.name}`,
      price: option.price,
      quantity: 1,
      image: service.image,
      metadata: { variant: option.name, provider: service.provider }
    });
    toast.success(`${service.name} added to cart!`);
  };

  return (
    <div className="pt-24 pb-24 bg-bg-card min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold opacity-60 text-text-secondary mb-8">
          <Link to="/explore" className="hover:text-text-primary flex items-center gap-1"><PiArrowLeft className="w-4 h-4"/> Back to Explore</Link>
          <span>/</span>
          <span>{service.category}</span>
          <span>/</span>
          <span className="text-text-primary">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="aspect-video md:aspect-[21/9] bg-bg-main rounded-[24px] md:rounded-[40px] overflow-hidden relative">
               <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
               <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8">
                 <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-bg-card/20 backdrop-blur-md text-text-primary font-bold text-xs md:text-sm w-fit mb-3 md:mb-4">
                   {service.provider}
                 </span>
                 <h1 className="text-2xl md:text-4xl font-black text-text-primary tracking-tight">{service.name}</h1>
               </div>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-bg-main rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-2">
                <PiClock className="w-5 h-5 md:w-6 md:h-6 text-lex-purple" />
                <div className="font-bold text-sm md:text-base">Duration</div>
                <div className="text-text-secondary text-xs md:text-sm font-medium">{service.duration}</div>
              </div>
              <div className="bg-bg-main rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-2">
                <PiMapPin className="w-5 h-5 md:w-6 md:h-6 text-lex-purple" />
                <div className="font-bold text-sm md:text-base">Coverage Area</div>
                <div className="text-text-secondary text-xs md:text-sm font-medium line-clamp-1">{service.coverageArea.join(", ")}</div>
              </div>
              <div className="bg-bg-main rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col gap-2 col-span-2 sm:col-span-1">
                <PiStarFill className="w-5 h-5 md:w-6 md:h-6 text-lex-purple" />
                <div className="font-bold text-sm md:text-base">Rating</div>
                <div className="text-text-secondary text-xs md:text-sm font-medium">{service.rating} from 100+ users</div>
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-black mb-4">About this service</h2>
              <p className="text-base md:text-lg text-text-secondary font-medium leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Trust attributes */}
            <div className="bg-bg-card border border-border-main rounded-[24px] md:rounded-[32px] p-6 md:p-8 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">LEX Quality Guarantee</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="flex items-center gap-3"><PiCheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span className="font-medium text-sm md:text-base">Teknisi profesional bersertifikat</span></div>
                <div className="flex items-center gap-3"><PiCheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span className="font-medium text-sm md:text-base">Jadwal fleksibel (Pilih sendiri)</span></div>
                <div className="flex items-center gap-3"><PiCheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span className="font-medium text-sm md:text-base">Garansi pengerjaan 30 hari</span></div>
                <div className="flex items-center gap-3"><PiCheckCircle className="w-5 h-5 text-green-500 shrink-0"/><span className="font-medium text-sm md:text-base">Harga transparan di awal</span></div>
              </div>
            </div>
          </div>

          {/* Booking Widget (Sticky Sidebar) */}
          <div className="relative">
            <div className="sticky top-32 bg-bg-card rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border-main p-8">
              <div className="text-sm opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-2">Harga mulai dari</div>
              <div className="text-4xl font-black mb-8">Rp{service.startingPrice.toLocaleString('id-ID')}</div>

              <div className="mb-8">
                <div className="font-bold mb-4">Pilih Layanan</div>
                <div className="space-y-3">
                  {service.options.map((opt, i) => (
                    <label key={i} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${selectedOption === i ? 'border-lex-purple bg-lex-purple/5' : 'border-border-main hover:border-white/20'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === i ? 'border-lex-purple' : 'border-white/30'}`}>
                          {selectedOption === i && <div className="w-2.5 h-2.5 bg-lex-purple rounded-full" />}
                        </div>
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                      <span className="font-bold">Rp{opt.price.toLocaleString('id-ID')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-btn-bg text-btn-text py-5 rounded-full font-bold text-lg hover:bg-white/80 active:scale-95 transition-all shadow-xl cursor-pointer">
                Tambah ke Keranjang
              </button>
              
              <p className="text-center text-xs font-semibold opacity-60 text-text-secondary mt-6">
                Pembayaran dilakukan setelah konfirmasi jadwal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
