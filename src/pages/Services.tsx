import { ChevronLeft, Smartphone, ArrowRightLeft, Wifi, MessageSquare, Zap, Globe, PlusSquare, Droplets, Flame, Home, Stethoscope, Laptop, Calendar, RefreshCcw, Gamepad2, Ticket, FileCode } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full pb-20 bg-white overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <div className="bg-lex-purple-dark text-white pt-6 pb-12 px-4 rounded-b-[40px] sticky top-0 z-10 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors absolute left-4">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">Daftar Layanan</h1>
      </div>

      <div className="px-5 -mt-6 relative z-20 space-y-8 bg-white pt-6 pb-6 rounded-t-[40px]">
        
        {/* Isi Ulang Section */}
        <section>
          <div className="mb-4">
            <h2 className="font-bold text-gray-900">Isi Ulang</h2>
            <p className="text-[10px] text-gray-500 mt-1">Dengan PLISSPA isi ulang menjadi lebih mudah</p>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            <ServiceIcon icon={<Smartphone className="w-5 h-5 text-white" />} label="PULSA REGULER" color="bg-purple-500" to="/pulsa" />
            <ServiceIcon icon={<ArrowRightLeft className="w-5 h-5 text-white" />} label="PULSA TRANSFER" color="bg-blue-400" />
            <ServiceIcon icon={<Wifi className="w-5 h-5 text-white" />} label="PAKET DATA" color="bg-green-400" />
            <ServiceIcon icon={<MessageSquare className="w-5 h-5 text-white" />} label="PAKET SMS&TELPON" color="bg-red-400" />
            
            <ServiceIcon icon={<Zap className="w-5 h-5 text-white" />} label="TOKEN PLN" color="bg-orange-400" />
            <ServiceIcon icon={<Globe className="w-5 h-5 text-white" />} label="PULSA INTERNASIONAL" color="bg-indigo-400" />
            <ServiceIcon icon={<PlusSquare className="w-5 h-5 text-white" />} label="E-MONEY" color="bg-purple-600" isNew />
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Tagihan Section */}
        <section>
          <div className="mb-4">
            <h2 className="font-bold text-gray-900">Tagihan</h2>
            <p className="text-[10px] text-gray-500 mt-1">Solusi semua pembayaran Tagihan, hanya di PLISSPA</p>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            <ServiceIcon icon={<Zap className="w-5 h-5 text-white" />} label="PLN PASCABAYAR" color="bg-yellow-500" />
            <ServiceIcon icon={<Droplets className="w-5 h-5 text-white" />} label="PDAM" color="bg-blue-500" />
            <ServiceIcon icon={<Flame className="w-5 h-5 text-white" />} label="GAS NEGARA" color="bg-orange-500" />
            <ServiceIcon icon={<Home className="w-5 h-5 text-white" />} label="PBB" color="bg-emerald-500" />
            
            <ServiceIcon icon={<Stethoscope className="w-5 h-5 text-white" />} label="BPJS KESEHATAN" color="bg-green-500" />
            <ServiceIcon icon={<Laptop className="w-5 h-5 text-white" />} label="INTERNET PASCABAYAR" color="bg-red-500" />
            <ServiceIcon icon={<Calendar className="w-5 h-5 text-white" />} label="MULTIFINANCE" color="bg-pink-500" />
            <ServiceIcon icon={<RefreshCcw className="w-5 h-5 text-white" />} label="HP PASCABAYAR" color="bg-cyan-500" />
          </div>
        </section>
        
        <hr className="border-gray-100" />

        {/* Voucher Section */}
        <section>
          <div className="mb-4">
            <h2 className="font-bold text-gray-900">Voucher</h2>
            <p className="text-[10px] text-gray-500 mt-1">Beli voucher terlengkap, hanya di PLISSPA</p>
          </div>
          <div className="grid grid-cols-4 gap-y-6 gap-x-2">
            <ServiceIcon icon={<Gamepad2 className="w-5 h-5 text-white" />} label="Voucher Games" color="bg-lime-500" />
            <ServiceIcon icon={<Ticket className="w-5 h-5 text-white" />} label="Voucher Lainnya" color="bg-fuchsia-500" />
            <ServiceIcon icon={<FileCode className="w-5 h-5 text-white" />} label="Inject Voucher" color="bg-red-500" />
          </div>
        </section>

      </div>
    </div>
  );
}

function ServiceIcon({ icon, label, color, isNew, to }: { icon: React.ReactNode, label: string, color: string, isNew?: boolean, to?: string }) {
  const content = (
    <div className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95 group relative">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden group-hover:shadow-md transition-shadow`}>
        <div className={`absolute inset-0 opacity-10 ${color}`}></div>
        <div className={`relative z-10 w-9 h-9 ${color} rounded-full flex items-center justify-center shadow-inner`}>
          {icon}
        </div>
      </div>
      {isNew && (
        <div className="absolute -top-2 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white">
          BARU
        </div>
      )}
      <span className="text-[8px] font-bold text-center leading-[1.2] px-1 text-gray-700 max-w-[60px] uppercase break-words">{label}</span>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}
