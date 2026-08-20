import { useParams, Link } from "react-router-dom";
import { mockServices } from "../data/mockData";
import { ArrowLeft, Star, Clock, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = mockServices.find(s => s.slug === slug) || mockServices[0];
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <div className="pt-24 pb-24 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-semibold text-black/40 mb-8">
          <Link to="/explore" className="hover:text-black flex items-center gap-1"><ArrowLeft className="w-4 h-4"/> Back to Explore</Link>
          <span>/</span>
          <span>{service.category}</span>
          <span>/</span>
          <span className="text-black">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Hero Image */}
            <div className="aspect-[21/9] bg-lex-soft rounded-[40px] overflow-hidden relative">
               <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <div className="absolute bottom-8 left-8 right-8">
                 <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm w-fit mb-4">
                   {service.provider}
                 </span>
                 <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{service.name}</h1>
               </div>
            </div>

            {/* Service Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-lex-soft rounded-3xl p-6 flex flex-col gap-2">
                <Clock className="w-6 h-6 text-lex-purple" />
                <div className="font-bold">Duration</div>
                <div className="text-black/60 text-sm font-medium">{service.duration}</div>
              </div>
              <div className="bg-lex-soft rounded-3xl p-6 flex flex-col gap-2">
                <MapPin className="w-6 h-6 text-lex-purple" />
                <div className="font-bold">Coverage Area</div>
                <div className="text-black/60 text-sm font-medium line-clamp-1">{service.coverageArea.join(", ")}</div>
              </div>
              <div className="bg-lex-soft rounded-3xl p-6 flex flex-col gap-2">
                <Star className="w-6 h-6 text-lex-purple" />
                <div className="font-bold">Rating</div>
                <div className="text-black/60 text-sm font-medium">{service.rating} from 100+ users</div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">About this service</h2>
              <p className="text-lg text-black/60 font-medium leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Trust attributes */}
            <div className="bg-white border border-black/5 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-6">LEX Quality Guarantee</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/><span className="font-medium">Teknisi profesional bersertifikat</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/><span className="font-medium">Jadwal fleksibel (Pilih sendiri)</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/><span className="font-medium">Garansi pengerjaan 30 hari</span></div>
                <div className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500"/><span className="font-medium">Harga transparan di awal</span></div>
              </div>
            </div>
          </div>

          {/* Booking Widget (Sticky Sidebar) */}
          <div className="relative">
            <div className="sticky top-32 bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 p-8">
              <div className="text-sm text-black/40 font-bold uppercase tracking-wider mb-2">Harga mulai dari</div>
              <div className="text-4xl font-black mb-8">Rp{service.startingPrice.toLocaleString('id-ID')}</div>

              <div className="mb-8">
                <div className="font-bold mb-4">Pilih Layanan</div>
                <div className="space-y-3">
                  {service.options.map((opt, i) => (
                    <label key={i} className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer border-2 transition-all ${selectedOption === i ? 'border-lex-purple bg-lex-purple/5' : 'border-black/5 hover:border-black/10'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption === i ? 'border-lex-purple' : 'border-black/20'}`}>
                          {selectedOption === i && <div className="w-2.5 h-2.5 bg-lex-purple rounded-full" />}
                        </div>
                        <span className="font-semibold">{opt.name}</span>
                      </div>
                      <span className="font-bold">Rp{opt.price.toLocaleString('id-ID')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button className="w-full bg-lex-black text-white py-5 rounded-full font-bold text-lg hover:bg-black/90 active:scale-95 transition-all shadow-xl">
                Pilih Jadwal
              </button>
              
              <p className="text-center text-xs font-semibold text-black/40 mt-6">
                Pembayaran dilakukan setelah konfirmasi jadwal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
