import { ArrowDown, ArrowUp, CreditCard, Send, Gift, Coins, Receipt, Settings, ChevronRight, UserCircle2 } from "lucide-react";

export default function Account() {
  return (
    <div className="w-full h-full pb-24 bg-lex-soft overflow-y-auto scrollbar-hide">
      
      {/* Header Profile Area */}
      <div className="bg-lex-purple-dark text-white pt-8 pb-20 px-4 rounded-b-[40px] relative overflow-hidden">
        {/* Abstract waves */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
            <path fill="#ffffff" d="M0,100 C150,200 250,0 400,100 L400,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-bold text-lg mb-6">Akun Saya</h1>
          
          <div className="w-20 h-20 bg-gray-100 rounded-full border-4 border-white mb-3 flex items-center justify-center overflow-hidden shadow-sm">
            <UserCircle2 className="w-16 h-16 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-1.5 mb-1">
            <h2 className="font-bold text-lg">Melvi Husin</h2>
            <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border border-white">
              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <p className="text-sm font-medium text-white/80">0822••••7543</p>
        </div>
      </div>

      {/* Floating Balance & Income Card */}
      <div className="px-5 -mt-14 relative z-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Income / Expense */}
          <div className="flex border-b border-gray-100">
            <div className="flex-1 p-4 flex items-center gap-3 border-r border-gray-100">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                <ArrowUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500">Pemasukan</p>
                <p className="text-sm font-bold">Rp 143.930</p>
              </div>
            </div>
            <div className="flex-1 p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shrink-0">
                <ArrowDown className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500">Pengeluaran</p>
                <p className="text-sm font-bold">Rp 462.180</p>
              </div>
            </div>
          </div>

          {/* Saldo */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-lex-purple-dark" />
              <span className="font-bold text-sm text-gray-800">Saldo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lex-purple-dark">Rp 674.925</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

        </div>
      </div>

      {/* Menu List */}
      <div className="px-5 mt-4 space-y-2">
        <MenuCard>
          <MenuItem icon={<CreditCard className="w-5 h-5 text-orange-500" />} label="Kartu Saya" />
        </MenuCard>

        <MenuCard>
          <MenuItem icon={<Send className="w-5 h-5 text-green-500" />} label="Transfer" />
          <MenuItem icon={<Gift className="w-5 h-5 text-orange-400" />} label="Referral" />
          <MenuItem icon={<Coins className="w-5 h-5 text-emerald-500" />} label="Tukar Poin" />
          <MenuItem icon={<Receipt className="w-5 h-5 text-red-500" />} label="Riwayat" noBorder />
        </MenuCard>

        <MenuCard>
          <MenuItem icon={<Settings className="w-5 h-5 text-gray-500" />} label="Pengaturan Profil" />
          <div className="p-4 flex items-center justify-between text-gray-800">
            <span className="font-bold text-sm">Versi App</span>
            <span className="font-bold text-sm text-gray-400">6.1.4</span>
          </div>
        </MenuCard>
      </div>

    </div>
  );
}

function MenuCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">
      {children}
    </div>
  );
}

function MenuItem({ icon, label, noBorder }: { icon: React.ReactNode, label: string, noBorder?: boolean }) {
  return (
    <button className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${!noBorder ? 'border-b border-gray-100' : ''}`}>
      <div className="flex items-center gap-4">
        {icon}
        <span className="font-bold text-sm text-gray-800">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300" />
    </button>
  );
}
