import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, MapPin, Wallet } from "lucide-react";
import { useCartStore, useUserStore } from "../lib/store";
import toast from "react-hot-toast";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useUserStore((state) => state.addOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handlePay = () => {
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      total: getTotal(),
      status: 'processing' as const,
      items: [...items],
      address: 'Jl. Sudirman No. 123, Senayan',
      paymentMethod
    };
    addOrder(order);
    clearCart();
    toast.success("Payment successful!");
    navigate('/orders/success');
  };

  return (
    <div className="pt-32 pb-24 px-4 bg-lex-soft min-h-screen">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-lex-black mb-12">Checkout</h1>

        <div className="flex gap-8">
          <div className="flex-1 space-y-8">
            
            {/* Step 1: Address */}
            <div className={`bg-white rounded-[32px] p-8 border ${step === 1 ? 'border-lex-purple shadow-lg' : 'border-black/5 opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step >= 1 ? 'bg-lex-purple text-white' : 'bg-lex-soft text-black/40'}`}>1</div>
                <h2 className="text-2xl font-bold">Delivery & Service Address</h2>
              </div>
              
              {step === 1 && (
                <div className="space-y-6 pl-14">
                  <div className="border-2 border-lex-purple bg-lex-purple/5 rounded-2xl p-6 cursor-pointer relative">
                    <div className="absolute top-6 right-6">
                      <CheckCircle2 className="w-6 h-6 text-lex-purple" />
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-lex-purple shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1">Rumah Utama</h3>
                        <p className="text-black/60 font-medium">Dimas Aditya<br/>Jl. Sudirman No. 123, Senayan<br/>Jakarta Selatan 12190</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="bg-lex-black text-white px-8 py-4 rounded-full font-bold">Lanjut ke Pembayaran</button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-white rounded-[32px] p-8 border ${step === 2 ? 'border-lex-purple shadow-lg' : 'border-black/5 opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${step >= 2 ? 'bg-lex-purple text-white' : 'bg-lex-soft text-black/40'}`}>2</div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              {step === 2 && (
                <div className="space-y-6 pl-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-2xl p-6 cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'QRIS' ? 'border-lex-purple bg-lex-purple/5' : 'border-black/5 hover:border-black/10'}`}>
                       <input type="radio" name="payment" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} className="w-5 h-5 accent-lex-purple" />
                       <div className="font-bold text-lg">QRIS</div>
                    </label>
                    <label className={`border-2 rounded-2xl p-6 cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'VA' ? 'border-lex-purple bg-lex-purple/5' : 'border-black/5 hover:border-black/10'}`}>
                       <input type="radio" name="payment" checked={paymentMethod === 'VA'} onChange={() => setPaymentMethod('VA')} className="w-5 h-5 accent-lex-purple" />
                       <div className="font-bold text-lg">Virtual Account</div>
                    </label>
                  </div>

                  <div className="bg-lex-soft rounded-2xl p-6 mt-8 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-bold text-black/40 uppercase mb-1">Total Payment</div>
                      <div className="text-3xl font-black">Rp{getTotal().toLocaleString('id-ID')}</div>
                    </div>
                    <button onClick={handlePay} className="bg-lex-purple text-white px-8 py-4 rounded-full font-bold hover:bg-lex-purple-start transition-colors flex items-center gap-2 cursor-pointer">
                      <Wallet className="w-5 h-5"/> Bayar
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
