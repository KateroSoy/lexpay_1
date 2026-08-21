import { Link } from "react-router-dom";

export default function OrderTracking() {
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="bg-bg-card rounded-[40px] p-8 md:p-12 shadow-sm border border-border-main">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black mb-2">Service Tracking</h1>
              <p className="text-text-secondary font-medium">Order #LEX-AC-001</p>
            </div>
            <div className="bg-brand-ac/20 text-brand-ac px-4 py-2 rounded-full font-bold text-sm">
              In Progress
            </div>
          </div>

          <div className="bg-bg-main rounded-3xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-24 h-24 bg-brand-ac/20 rounded-full flex items-center justify-center shrink-0 overflow-hidden">
               {/* Avatar placeholder */}
               <img src="/0845644f-e51e-4752-90ff-0d73ea89a928.jfif" alt="Technician" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">Teknisi sedang menuju lokasi</h2>
              <p className="text-text-secondary font-medium mb-4">Budi - LEX AC Technician</p>
              <div className="flex justify-center sm:justify-start gap-4">
                <button className="bg-btn-bg text-btn-text px-6 py-3 rounded-full font-bold text-sm">Chat</button>
                <button className="bg-white/10 text-text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-white/20">Call</button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm opacity-60 text-text-secondary font-bold uppercase mb-1">Arrival</div>
              <div className="text-3xl font-black text-lex-purple">12 min</div>
            </div>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-lex-purple text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <div className="w-3 h-3 bg-bg-card rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl bg-bg-card border border-border-main shadow-sm">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-900">Menuju Lokasi</div>
                  <time className="font-medium text-lex-purple text-sm">09:45</time>
                </div>
                <div className="text-slate-500 text-sm">Teknisi sedang dalam perjalanan ke alamat Anda.</div>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-bg-main shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-4 rounded-2xl bg-bg-card border border-border-main shadow-sm opacity-60">
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-slate-900">Pengerjaan Dimulai</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/orders" className="text-lex-purple font-bold hover:underline">Back to Orders</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
