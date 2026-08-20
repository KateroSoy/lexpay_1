import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-lex-black mb-12">
          Good morning, Dimas.
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Link to="/orders" className="bg-white rounded-3xl p-6 border border-black/5 hover:shadow-lg transition-shadow">
            <div className="text-sm font-bold text-black/40 uppercase tracking-wider mb-2">Orders</div>
            <div className="text-4xl font-black mb-1">3</div>
            <div className="text-sm text-lex-purple font-semibold">Active</div>
          </Link>
          <Link to="/orders" className="bg-white rounded-3xl p-6 border border-black/5 hover:shadow-lg transition-shadow">
            <div className="text-sm font-bold text-black/40 uppercase tracking-wider mb-2">Bookings</div>
            <div className="text-4xl font-black mb-1">1</div>
            <div className="text-sm text-brand-ac font-semibold">Upcoming</div>
          </Link>
          <div className="bg-lex-black text-white rounded-3xl p-6 shadow-xl">
            <div className="text-sm font-bold text-white/40 uppercase tracking-wider mb-2">LEX Points</div>
            <div className="text-4xl font-black mb-1 text-lex-yellow">1,250</div>
            <div className="text-sm text-white/60 font-semibold">Valid till Dec</div>
          </div>
          <div className="bg-lex-purple text-white rounded-3xl p-6 shadow-xl">
            <div className="text-sm font-bold text-white/40 uppercase tracking-wider mb-2">Vouchers</div>
            <div className="text-4xl font-black mb-1">4</div>
            <div className="text-sm text-white/80 font-semibold">Available</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-white rounded-[32px] border border-black/5 overflow-hidden">
          <Link to="/orders/1" className="flex items-center justify-between p-6 hover:bg-black/5 transition-colors border-b border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-ac/20 rounded-xl flex items-center justify-center text-brand-ac font-bold">AC</div>
              <div>
                <div className="font-bold">AC Cleaning</div>
                <div className="text-sm text-black/50 font-medium">Tomorrow · 10:00</div>
              </div>
            </div>
            <div className="font-bold">Rp75.000</div>
          </Link>
          <div className="flex items-center justify-between p-6 hover:bg-black/5 transition-colors border-b border-black/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lex-purple/10 rounded-xl flex items-center justify-center text-lex-purple font-bold">ML</div>
              <div>
                <div className="font-bold">Mobile Legends Diamonds</div>
                <div className="text-sm text-black/50 font-medium">Yesterday</div>
              </div>
            </div>
            <div className="font-bold">Rp50.000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
