import { Link, useParams } from "react-router-dom";
import { useUserStore } from "../lib/store";
import { PiArrowLeft, PiCheckCircle, PiMapPin, PiCreditCard, PiPackage } from "react-icons/pi";

export default function OrderTracking() {
  const { id } = useParams();
  const orders = useUserStore(state => state.orders);
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Link to="/orders" className="text-lex-purple font-bold hover:underline">Back to Orders</Link>
        </div>
      </div>
    );
  }

  // Determine timeline progress based on status
  const steps = [
    { title: "Order Placed", desc: "We have received your order", active: true, time: new Date(order.date).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'}) },
    { title: "Processing", desc: "Your order is being processed", active: true, time: "In Progress" },
    { title: "Shipped / Service Ready", desc: "On the way or technician assigned", active: order.status !== 'processing', time: "" },
    { title: "Completed", desc: "Order has been completed", active: order.status === 'delivered', time: "" }
  ];

  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen">
      <div className="mx-auto max-w-3xl">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <Link to="/orders" className="flex items-center gap-2 text-text-secondary hover:text-text-primary font-bold text-sm mb-6 transition-colors w-fit">
            <PiArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black mb-1">Order Details</h1>
              <p className="text-text-secondary font-medium tracking-wide">#{order.id}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border w-fit ${
              order.status === 'delivered' ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Timeline (Tracking) */}
        <div className="bg-bg-card rounded-[32px] p-6 sm:p-8 shadow-sm border border-border-main mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><PiCheckCircle className="text-lex-purple w-6 h-6"/> Tracking Status</h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-0.5 before:bg-border-main">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex items-start group">
                <div className={`flex items-center justify-center w-11 h-11 rounded-full border-4 border-bg-card shrink-0 z-10 ${
                  step.active ? "bg-lex-purple text-white shadow-md" : "bg-border-main text-transparent"
                }`}>
                  <div className="w-2.5 h-2.5 bg-current rounded-full"></div>
                </div>
                <div className={`ml-4 mt-1 ${step.active ? "opacity-100" : "opacity-40"}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1">
                    <div className="font-bold text-text-primary text-base sm:text-lg">{step.title}</div>
                    {step.time && <div className="text-xs font-bold text-lex-purple bg-lex-purple/10 px-2 py-0.5 rounded-md w-fit">{step.time}</div>}
                  </div>
                  <div className="text-text-secondary text-sm font-medium">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-bg-card rounded-[32px] p-6 sm:p-8 shadow-sm border border-border-main mb-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><PiPackage className="text-lex-purple w-6 h-6"/> Purchased Items</h2>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 sm:gap-5 border-b border-border-main pb-4 last:border-0 last:pb-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black/5 dark:bg-white/5 rounded-[14px] flex items-center justify-center overflow-hidden shrink-0 border border-border-main">
                  {item.image ? (
                     <img src={item.image} className="w-full h-full object-contain p-2" />
                  ) : (
                     <span className="font-bold text-text-secondary text-sm">{item.type.substring(0,2).toUpperCase()}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-base sm:text-lg mb-0.5 truncate">{item.name}</div>
                  <div className="text-text-secondary text-xs sm:text-sm font-medium mb-1 capitalize">
                    {item.type === 'product' && item.metadata?.variant 
                      ? `Variant: ${item.metadata.variant}` 
                      : item.type === 'digital' && item.metadata?.digitalInfo
                      ? `Package: ${item.metadata.digitalInfo}`
                      : item.type === 'service' && item.metadata?.provider
                      ? `Provider: ${item.metadata.provider}`
                      : item.type}
                  </div>
                  <div className="text-sm font-bold">
                    {item.quantity}x • Rp {item.price.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address & Payment Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Address */}
          <div className="bg-bg-card rounded-[32px] p-6 sm:p-8 shadow-sm border border-border-main">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><PiMapPin className="text-lex-purple w-5 h-5"/> Delivery Address</h2>
            <div className="text-sm text-text-secondary font-medium leading-relaxed">
              <p className="font-bold text-text-primary mb-1">Rumah Utama</p>
              <p>{order.address}</p>
              <p>Jakarta Selatan 12190</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-bg-card rounded-[32px] p-6 sm:p-8 shadow-sm border border-border-main flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><PiCreditCard className="text-lex-purple w-5 h-5"/> Payment Info</h2>
              <div className="text-sm font-bold text-text-primary mb-4 uppercase bg-black/5 dark:bg-white/5 w-fit px-3 py-1 rounded-lg">
                {order.paymentMethod}
              </div>
            </div>
            <div className="pt-4 border-t border-border-main flex justify-between items-end">
              <div className="text-sm text-text-secondary font-medium">Total Paid</div>
              <div className="text-2xl font-black text-text-primary">Rp {order.total.toLocaleString('id-ID')}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
