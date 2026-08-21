import { Link } from "react-router-dom";

export default function Account() {
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-text-primary mb-12">
          Good morning, Dimas.
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Link to="/orders" className="bg-bg-card rounded-3xl p-6 border border-border-main hover:shadow-lg transition-shadow">
            <div className="text-sm font-bold opacity-60 text-text-secondary uppercase tracking-wider mb-2">Orders</div>
            <div className="text-4xl font-black mb-1">3</div>
            <div className="text-sm text-lex-purple font-semibold">Active</div>
          </Link>
          <Link to="/orders" className="bg-bg-card rounded-3xl p-6 border border-border-main hover:shadow-lg transition-shadow">
            <div className="text-sm font-bold opacity-60 text-text-secondary uppercase tracking-wider mb-2">Bookings</div>
            <div className="text-4xl font-black mb-1">1</div>
            <div className="text-sm text-brand-ac font-semibold">Upcoming</div>
          </Link>
          <div className="bg-bg-card text-white rounded-3xl p-6 shadow-xl">
            <div className="text-sm font-bold opacity-60 text-text-secondary uppercase tracking-wider mb-2">LEX Points</div>
            <div className="text-4xl font-black mb-1 text-lex-yellow">1,250</div>
            <div className="text-sm text-text-secondary font-semibold">Valid till Dec</div>
          </div>
          <div className="bg-lex-purple text-white rounded-3xl p-6 shadow-xl">
            <div className="text-sm font-bold opacity-60 text-text-secondary uppercase tracking-wider mb-2">Vouchers</div>
            <div className="text-4xl font-black mb-1">4</div>
            <div className="text-sm text-white/80 font-semibold">Available</div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
        <div className="bg-bg-card rounded-[32px] border border-border-main overflow-hidden">
          <Link to="/orders/1" className="flex items-center justify-between p-6 hover:bg-white/10 transition-colors border-b border-border-main">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-ac/20 rounded-xl flex items-center justify-center text-brand-ac font-bold">AC</div>
              <div>
                <div className="font-bold">AC Cleaning</div>
                <div className="text-sm text-white/50 font-medium">Tomorrow · 10:00</div>
              </div>
            </div>
            <div className="font-bold">Rp75.000</div>
          </Link>
          <div className="flex items-center justify-between p-6 hover:bg-white/10 transition-colors border-b border-border-main">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-lex-purple/10 rounded-xl flex items-center justify-center text-lex-purple font-bold">ML</div>
              <div>
                <div className="font-bold">Mobile Legends Diamonds</div>
                <div className="text-sm text-white/50 font-medium">Yesterday</div>
              </div>
            </div>
            <div className="font-bold">Rp50.000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
