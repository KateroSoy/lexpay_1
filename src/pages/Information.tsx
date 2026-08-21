import { ChevronLeft, CalendarDays, Wallet, CreditCard, Coins, ShieldCheck, PenSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Information() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full pb-20 bg-lex-soft overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <div className="bg-lex-purple-dark text-white pt-6 pb-28 px-4 rounded-b-[40px] relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-center font-bold text-lg w-full absolute left-0 right-0 top-8 z-0">Informasi Dan Layanan</h1>
      </div>

      {/* Top 2 Cards */}
      <div className="px-5 -mt-16 relative z-20">
        <div className="grid grid-cols-2 gap-4">
          
          {/* Event Card */}
          <div className="bg-lex-purple text-white rounded-3xl p-4 shadow-sm relative overflow-hidden h-32 flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 shadow-inner">
              <CalendarDays className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Event</h3>
              <p className="text-[10px] leading-tight font-medium text-white/90">Berbagai Event Menarik Menantimu</p>
            </div>
            {/* Absolute badge */}
            <div className="absolute bottom-2 right-2 bg-lex-purple-dark px-2 py-1 rounded-full flex items-center gap-1">
              <CalendarDays className="w-3 h-3" />
              <span className="text-[9px] font-bold">Event</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></div>
          </div>

          {/* Catatan Keuangan Card */}
          <div className="bg-lex-purple text-white rounded-3xl p-4 shadow-sm relative overflow-hidden h-32 flex flex-col justify-between">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 shadow-inner">
              <Wallet className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Catatan Keuangan</h3>
            </div>
            {/* Absolute badge */}
            <div className="absolute bottom-2 right-2 bg-lex-purple-dark px-2 py-1 rounded-full flex items-center gap-1">
              <Wallet className="w-3 h-3" />
              <span className="text-[9px] font-bold">Catatan</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></div>
          </div>

        </div>
      </div>

      {/* List items */}
      <div className="px-5 mt-6 space-y-4">
        
        {/* Kendala Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 cursor-pointer active:scale-[0.98] transition-transform">
          <div className="w-12 h-12 shrink-0 relative flex items-center justify-center">
            <div className="absolute bg-blue-600 w-10 h-7 rounded-md -rotate-12 shadow-sm border-2 border-white"></div>
            <div className="absolute bg-yellow-500 w-10 h-7 rounded-md rotate-6 shadow-sm border-2 border-white"></div>
            <CreditCard className="w-6 h-6 text-white absolute z-10" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-gray-800">Mengalami Kendala Transaksi?</h3>
            <p className="text-[10px] font-medium text-gray-500 mt-0.5 leading-relaxed">
              Ajukan Komplain Sekarang Agar<br/>
              Kami dapat segera melakukan<br/>
              pengecekan
            </p>
          </div>
        </div>

        {/* Layanan Keuangan */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
          <div className="flex gap-4 items-center">
             <div className="w-10 h-10 shrink-0 relative flex flex-col items-center justify-center">
               <Coins className="w-8 h-8 text-yellow-400 -mb-2" />
               <Coins className="w-8 h-8 text-yellow-500 absolute bottom-0" />
             </div>
             <div>
               <h3 className="font-bold text-sm text-gray-800">Layanan keuangan</h3>
               <p className="text-[10px] font-medium text-gray-500">Customer Service 7/24</p>
             </div>
          </div>
          <PenSquare className="w-5 h-5 text-gray-400" />
        </div>

        {/* Keamanan Akun */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
          <div className="flex gap-4 items-center">
             <div className="w-10 h-10 shrink-0 flex items-center justify-center">
               <ShieldCheck className="w-10 h-10 text-orange-300" />
             </div>
             <div>
               <h3 className="font-bold text-sm text-gray-800">Keamanan Akun</h3>
               <p className="text-[10px] font-medium text-gray-500">Informasi seputar keamanan akun dan<br/>customisasi</p>
             </div>
          </div>
          <PenSquare className="w-5 h-5 text-gray-400" />
        </div>

      </div>

      <div className="mt-8 text-center px-4">
        <p className="text-[10px] font-bold text-gray-800">Transaksi Tersedia setiap Hari 24 Jam nonstop</p>
      </div>

    </div>
  );
}
