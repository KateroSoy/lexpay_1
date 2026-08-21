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
    const option = service.options[selectedOption] || service.options[0];
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
    toast.dismiss();
    toast.success(`${service.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="pt-12 md:pt-18 pb-16 bg-bg-card min-h-screen">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        {/* Compact Breadcrumb */}
        <div className="flex items-center gap-1 text-[11px] font-semibold opacity-70 text-text-secondary mb-2 truncate">
          <Link to="/explore" className="hover:text-text-primary flex items-center gap-1 shrink-0"><PiArrowLeft className="w-3 h-3"/> Explore</Link>
          <span>/</span>
          <span className="shrink-0">{service.category}</span>
          <span>/</span>
          <span className="text-text-primary truncate">{service.name}</span>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 md:gap-6 items-start">
          {/* Main Info Column */}
          <div className="w-full lg:col-span-2 space-y-3">
            {/* Hero Image Banner */}
            <div className="h-36 sm:h-48 md:h-60 w-full bg-bg-main rounded-xl overflow-hidden relative border border-border-main shadow-2xs">
               <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
               <div className="absolute bottom-2.5 left-2.5 right-2.5 md:bottom-4 md:left-4 md:right-4">
                 <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[10px] w-fit mb-1">
                   {service.provider}
                 </span>
                 <h1 className="text-base sm:text-lg md:text-2xl font-bold text-white tracking-tight leading-tight">{service.name}</h1>
               </div>
            </div>

            {/* Service Info Badges (3 Column Compact Layout) */}
            <div className="grid grid-cols-3 gap-1.5 md:gap-2.5">
              <div className="bg-bg-main border border-border-main rounded-lg p-2 md:p-2.5 flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-lex-purple font-bold text-[10px]">
                  <PiClock className="w-3 h-3" /> Durasi
                </div>
                <div className="text-text-primary text-[11px] md:text-xs font-semibold">{service.duration}</div>
              </div>

              <div className="bg-bg-main border border-border-main rounded-lg p-2 md:p-2.5 flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-lex-purple font-bold text-[10px]">
                  <PiMapPin className="w-3 h-3" /> Area
                </div>
                <div className="text-text-primary text-[11px] md:text-xs font-semibold truncate">{service.coverageArea[0]}</div>
              </div>

              <div className="bg-bg-main border border-border-main rounded-lg p-2 md:p-2.5 flex flex-col gap-0.5">
                <div className="flex items-center gap-1 text-lex-purple font-bold text-[10px]">
                  <PiStarFill className="w-3 h-3" /> Rating
                </div>
                <div className="text-text-primary text-[11px] md:text-xs font-semibold">{service.rating} / 5.0</div>
              </div>
            </div>

            {/* Booking Widget (Mobilized so on mobile it appears directly after badges!) */}
            <div className="block lg:hidden w-full">
              <div className="bg-bg-main rounded-xl border border-border-main p-3 shadow-2xs">
                <div className="text-[10px] opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-0.5">Harga Paket Dipilih</div>
                <div className="text-lg font-black text-text-primary mb-2">
                  Rp{(service.options[selectedOption]?.price || service.startingPrice).toLocaleString('id-ID')}
                </div>

                <div className="mb-3">
                  <div className="font-bold text-[10px] text-text-secondary uppercase tracking-wider mb-1.5">Pilih Paket Layanan</div>
                  <div className="space-y-1.5">
                    {service.options.map((opt, i) => (
                      <div
                        key={i} 
                        onClick={() => setSelectedOption(i)}
                        className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-all select-none ${
                          selectedOption === i 
                            ? 'border-lex-purple bg-lex-purple/10 text-text-primary' 
                            : 'border-border-main bg-bg-main text-text-secondary hover:border-lex-purple/40 hover:text-text-primary'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${selectedOption === i ? 'border-lex-purple bg-lex-purple' : 'border-text-secondary/40'}`}>
                            {selectedOption === i && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                          <span className="font-semibold text-xs">{opt.name}</span>
                        </div>
                        <span className="font-bold text-xs text-lex-purple">Rp{opt.price.toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart} 
                  className="w-full bg-gradient-to-r from-[#6333FF] to-[#4B1EE3] text-white py-2.5 rounded-full font-bold text-xs hover:shadow-[0_4px_16px_rgba(89,39,229,0.35)] active:scale-95 transition-all cursor-pointer text-center"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </div>

            {/* About & Quality Guarantee */}
            <div className="space-y-3 pt-1">
              <div>
                <h2 className="text-xs md:text-sm font-bold mb-1 text-text-primary">Tentang Layanan Ini</h2>
                <p className="text-[11px] md:text-xs text-text-secondary font-medium leading-normal">
                  {service.description}
                </p>
              </div>

              {/* Trust attributes */}
              <div className="bg-bg-main border border-border-main rounded-xl p-3 md:p-3.5 shadow-2xs">
                <h3 className="text-xs font-bold mb-1.5 text-text-primary">Jaminan Kualitas LEX</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-2"><PiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0"/><span className="font-medium text-[11px] md:text-xs">Teknisi profesional bersertifikat</span></div>
                  <div className="flex items-center gap-2"><PiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0"/><span className="font-medium text-[11px] md:text-xs">Jadwal fleksibel (Pilih sendiri)</span></div>
                  <div className="flex items-center gap-2"><PiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0"/><span className="font-medium text-[11px] md:text-xs">Garansi pengerjaan 30 hari</span></div>
                  <div className="flex items-center gap-2"><PiCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0"/><span className="font-medium text-[11px] md:text-xs">Harga transparan di awal</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Booking Widget (Sticky Sidebar for large screens) */}
          <div className="hidden lg:block relative w-full">
            <div className="sticky top-20 bg-bg-main rounded-xl border border-border-main p-4 md:p-5 shadow-2xs">
              <div className="text-[11px] opacity-60 text-text-secondary font-bold uppercase tracking-wider mb-0.5">Harga Paket Dipilih</div>
              <div className="text-xl md:text-2xl font-black text-text-primary mb-3">
                Rp{(service.options[selectedOption]?.price || service.startingPrice).toLocaleString('id-ID')}
              </div>

              <div className="mb-4">
                <div className="font-bold text-[11px] md:text-xs text-text-secondary uppercase tracking-wider mb-2">Pilih Paket Layanan</div>
                <div className="space-y-1.5">
                  {service.options.map((opt, i) => (
                    <div
                      key={i} 
                      onClick={() => setSelectedOption(i)}
                      className={`flex items-center justify-between p-2.5 rounded-lg cursor-pointer border transition-all select-none ${
                        selectedOption === i 
                          ? 'border-lex-purple bg-lex-purple/10 text-text-primary shadow-2xs' 
                          : 'border-border-main bg-bg-main text-text-secondary hover:border-lex-purple/40 hover:text-text-primary'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${selectedOption === i ? 'border-lex-purple bg-lex-purple' : 'border-text-secondary/40'}`}>
                          {selectedOption === i && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className="font-semibold text-xs">{opt.name}</span>
                      </div>
                      <span className="font-bold text-xs text-lex-purple">Rp{opt.price.toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddToCart} 
                className="w-full bg-gradient-to-r from-[#6333FF] to-[#4B1EE3] text-white py-2.5 rounded-full font-bold text-xs md:text-sm hover:shadow-[0_4px_16px_rgba(89,39,229,0.35)] active:scale-95 transition-all cursor-pointer text-center"
              >
                Tambah ke Keranjang
              </button>
              
              <p className="text-center text-[10px] font-semibold opacity-60 text-text-secondary mt-2.5">
                Pembayaran dilakukan setelah konfirmasi jadwal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
