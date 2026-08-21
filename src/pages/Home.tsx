import { Bell, PlusCircle, ArrowUpRight, FileSpreadsheet, Clock, Smartphone, Phone, Wifi, Gamepad2, Wallet, Ticket, Zap, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full h-full pb-8 bg-white overflow-y-auto scrollbar-hide">
      
      {/* Top Header Section */}
      <div className="bg-lex-purple-light/20 pb-16 rounded-b-[40px] pt-8 px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-lex-purple-dark tracking-widest uppercase">PLISSPA</h1>
          <div className="bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
            <span className="text-lex-purple-dark font-bold text-xs">% Promo</span>
          </div>
        </div>
      </div>

      {/* Floating Balance Card */}
      <div className="px-5 -mt-14 relative z-10">
        <div className="bg-gradient-to-br from-lex-purple-gradient-start to-lex-purple-gradient-end rounded-2xl p-4 text-white shadow-lg overflow-hidden relative">
          
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full mix-blend-overlay opacity-20 -mr-10 -mt-10 blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full mix-blend-overlay opacity-30 -ml-8 -mb-8 blur-lg"></div>

          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <p className="text-xs font-medium text-white/80 mb-1">PLISSPAcash</p>
              <p className="text-xs font-semibold">Total saldo</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-sm font-semibold">Rp</span>
                <span className="text-2xl font-bold">350</span>
              </div>
            </div>
            
            <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/30">
              <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center text-lex-purple-dark text-[10px] font-bold">P</div>
              <span className="text-xs font-semibold text-white">PLISSPA Points</span>
            </div>
          </div>

          <div className="flex justify-between items-center relative z-10 px-2">
            <ActionButton icon={<PlusCircle className="w-5 h-5" />} label="Top Up" />
            <ActionButton icon={<ArrowUpRight className="w-5 h-5" />} label="Transfer" />
            <ActionButton icon={<FileSpreadsheet className="w-5 h-5" />} label="Komisi" />
            <ActionButton icon={<Clock className="w-5 h-5" />} label="History" />
          </div>
        </div>
      </div>

      {/* Marquee Notification */}
      <div className="mt-6 px-5 flex items-center gap-3">
        <div className="text-lex-purple-dark shrink-0">
          <Bell className="w-5 h-5 fill-current" />
        </div>
        <div className="overflow-hidden flex-1 relative whitespace-nowrap">
          <div className="inline-block animate-marquee">
            <span className="text-xs font-bold text-lex-purple-dark tracking-wide">
              ==DEPOSIT QRIS MASIH GANGGUAN PADA PAYMENT GATEWAY HARAP BERSABAR==
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mt-8 px-5">
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          <GridItem to="/pulsa" icon={<Smartphone className="w-5 h-5 text-white" />} label="Pulsa Reguler" color="bg-purple-500" />
          <GridItem icon={<Phone className="w-5 h-5 text-white" />} label="Telpon&Sms" color="bg-red-400" />
          <GridItem icon={<Wifi className="w-5 h-5 text-white" />} label="Paket Data" color="bg-green-400" />
          <GridItem icon={<Gamepad2 className="w-5 h-5 text-white" />} label="Games" color="bg-lime-400" />
          
          <GridItem icon={<Wallet className="w-5 h-5 text-white" />} label="E-Money" color="bg-purple-600" />
          <GridItem icon={<Ticket className="w-5 h-5 text-white" />} label="Voucher Data" color="bg-orange-500" />
          <GridItem icon={<Zap className="w-5 h-5 text-white" />} label="Token PLN" color="bg-yellow-500" />
          <GridItem icon={<LayoutGrid className="w-5 h-5 text-white" />} label="Lainnya" color="bg-indigo-400" />
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mt-8 px-5">
        <div className="w-full h-28 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl relative overflow-hidden flex items-center px-4">
           {/* Abstract illustration shapes since we don't have the exact image */}
           <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-end justify-end opacity-80">
              <div className="w-24 h-32 bg-white/20 rounded-t-full mr-4"></div>
              <div className="w-16 h-20 bg-white/30 rounded-t-full mr-2"></div>
           </div>
           
           <div className="relative z-10">
             <div className="flex items-center gap-1 mb-2">
               <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center text-[8px] font-bold text-purple-600">P</div>
               <span className="text-white text-xs font-bold">PLISSPA</span>
             </div>
             <h2 className="text-white text-lg font-black leading-tight">KAMI MENGUCAPKAN<br/>SELAMAT HARI RAYA</h2>
             <div className="inline-block bg-white/30 backdrop-blur-sm mt-1 px-2 py-0.5 rounded-full text-white text-[10px] font-bold tracking-wider">
               IDUL FITRI 1444 H
             </div>
           </div>
        </div>
      </div>

      {/* Recommendation List */}
      <div className="mt-8 px-5 pb-8">
        <h3 className="font-bold text-sm mb-4">Rekomendasi Pilihan</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {/* Mock recommendation cards */}
          {[1, 2, 3].map((i) => (
            <div key={i} className="min-w-[140px] bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-lex-purple" />
              </div>
              <p className="text-xs font-semibold mb-1">Promo PLN</p>
              <p className="text-[10px] text-gray-500">Diskon s/d 10rb</p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

function ActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex flex-col items-center gap-1.5 transition-transform active:scale-95">
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-lex-purple-dark shadow-sm">
        {icon}
      </div>
      <span className="text-[10px] font-medium text-white">{label}</span>
    </button>
  );
}

function GridItem({ icon, label, color, to }: { icon: React.ReactNode, label: string, color: string, to?: string }) {
  const content = (
    <div className="flex flex-col items-center gap-2 cursor-pointer transition-transform active:scale-95 group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm relative overflow-hidden group-hover:shadow-md transition-shadow`}>
        {/* Soft background glow */}
        <div className={`absolute inset-0 opacity-20 ${color}`}></div>
        <div className={`relative z-10 w-9 h-9 ${color} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <span className="text-[10px] font-medium text-center leading-tight px-1">{label}</span>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}
