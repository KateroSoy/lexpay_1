import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiCheckCircle, PiMapPin, PiWallet, PiX, PiQrCode, PiCreditCard, PiShieldCheck } from "react-icons/pi";
import { useCartStore, useUserStore } from "../lib/store";
import toast from "react-hot-toast";

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useUserStore((state) => state.addOrder);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0 && !showPaymentGateway) {
      navigate('/cart');
    }
  }, [items, navigate, showPaymentGateway]);

  const handleOpenGateway = () => {
    setShowPaymentGateway(true);
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    
    // Simulate network delay
    setTimeout(() => {
      const order = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toISOString(),
        total: getTotal(),
        status: 'processing' as const,
        items: [...items],
        address: 'Jl. Sudirman No. 123, Senayan',
        paymentMethod
      };
      addOrder(order);
      clearCart();
      setIsProcessing(false);
      setShowPaymentGateway(false);
      navigate('/orders/success');
      toast.success("Payment verified successfully!");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 px-4 bg-bg-main min-h-screen relative">
      <div className="mx-auto max-w-4xl relative z-10">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-primary mb-12">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-8">
            
            {/* Step 1: Address */}
            <div className={`bg-bg-card rounded-[32px] p-8 border transition-all duration-300 ${step === 1 ? 'border-lex-purple shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-border-main opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${step >= 1 ? 'bg-lex-purple text-white' : 'bg-bg-main opacity-60 text-text-secondary'}`}>1</div>
                <h2 className="text-2xl font-bold">Delivery & Service Address</h2>
              </div>
              
              {step === 1 && (
                <div className="space-y-6 pl-14">
                  <div className="border-2 border-lex-purple bg-lex-purple/5 rounded-2xl p-6 cursor-pointer relative">
                    <div className="absolute top-6 right-6">
                      <PiCheckCircle className="w-6 h-6 text-lex-purple" />
                    </div>
                    <div className="flex items-start gap-4">
                      <PiMapPin className="w-6 h-6 text-lex-purple shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-1">Rumah Utama</h3>
                        <p className="text-text-secondary font-medium leading-relaxed">Dimas Aditya<br/>Jl. Sudirman No. 123, Senayan<br/>Jakarta Selatan 12190</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setStep(2)} className="bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold hover:bg-black/80 transition-colors active:scale-95">Lanjut ke Pembayaran</button>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className={`bg-bg-card rounded-[32px] p-8 border transition-all duration-300 ${step === 2 ? 'border-lex-purple shadow-[0_8px_30px_rgb(0,0,0,0.04)]' : 'border-border-main opacity-60'}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${step >= 2 ? 'bg-lex-purple text-white' : 'bg-bg-main opacity-60 text-text-secondary'}`}>2</div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
              </div>

              {step === 2 && (
                <div className="space-y-6 pl-14">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`border-2 rounded-2xl p-6 cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'QRIS' ? 'border-lex-purple bg-lex-purple/5' : 'border-border-main hover:border-white/20'}`}>
                       <input type="radio" name="payment" checked={paymentMethod === 'QRIS'} onChange={() => setPaymentMethod('QRIS')} className="w-5 h-5 accent-lex-purple" />
                       <div className="font-bold text-lg flex items-center gap-2"><PiQrCode className="w-5 h-5 text-lex-purple"/> QRIS</div>
                    </label>
                    <label className={`border-2 rounded-2xl p-6 cursor-pointer flex items-center gap-4 transition-all ${paymentMethod === 'VA' ? 'border-lex-purple bg-lex-purple/5' : 'border-border-main hover:border-white/20'}`}>
                       <input type="radio" name="payment" checked={paymentMethod === 'VA'} onChange={() => setPaymentMethod('VA')} className="w-5 h-5 accent-lex-purple" />
                       <div className="font-bold text-lg flex items-center gap-2"><PiCreditCard className="w-5 h-5 text-lex-purple"/> Virtual Account</div>
                    </label>
                  </div>

                  <div className="bg-bg-main rounded-2xl p-6 mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-border-main">
                    <div>
                      <div className="text-sm font-bold opacity-60 text-text-secondary uppercase mb-1 tracking-wider">Total Payment</div>
                      <div className="text-3xl font-black text-lex-purple">Rp{getTotal().toLocaleString('id-ID')}</div>
                    </div>
                    <button onClick={handleOpenGateway} className="w-full sm:w-auto bg-lex-purple text-white px-8 py-4 rounded-full font-bold hover:bg-lex-purple-start transition-colors flex justify-center items-center gap-2 cursor-pointer active:scale-95 shadow-[0_4px_14px_rgba(107,33,168,0.39)]">
                      <PiWallet className="w-5 h-5"/> Bayar Sekarang
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Mock Payment Gateway Modal */}
      {showPaymentGateway && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPaymentGateway(false)} />
          <div className="relative bg-bg-card w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="bg-bg-main px-6 py-4 flex items-center justify-between border-b border-border-main">
              <div className="flex items-center gap-2 font-black text-lex-purple">
                <PiShieldCheck className="w-5 h-5" /> LEXPay Gateway
              </div>
              <button onClick={() => setShowPaymentGateway(false)} className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center opacity-60 text-text-secondary hover:text-text-primary transition-colors">
                <PiX className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 text-center space-y-6">
              <div>
                <div className="opacity-60 text-text-secondary font-bold uppercase tracking-wider text-sm mb-2">Total Tagihan</div>
                <div className="text-4xl font-black">Rp{getTotal().toLocaleString('id-ID')}</div>
                <div className="text-white/50 font-medium text-sm mt-2">Order ID: ORD-{Math.floor(Math.random() * 1000000)}</div>
              </div>

              <div className="h-px w-full bg-white/10 my-6" />

              {paymentMethod === 'QRIS' ? (
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-white/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mb-4 p-4">
                     {/* Fake QR code visualization */}
                     <div className="w-full h-full border-4 border-black/80 rounded flex items-center justify-center relative">
                        <div className="absolute top-2 left-2 w-4 h-4 bg-black/80" />
                        <div className="absolute top-2 right-2 w-4 h-4 bg-black/80" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 bg-black/80" />
                        <PiQrCode className="w-16 h-16 text-white/20" />
                     </div>
                  </div>
                  <p className="text-text-secondary font-medium text-sm">Scan QR code ini menggunakan aplikasi<br/>M-Banking atau E-Wallet Anda.</p>
                </div>
              ) : (
                <div className="text-left bg-bg-main rounded-2xl p-6 border border-border-main">
                  <div className="opacity-60 text-text-secondary font-bold uppercase tracking-wider text-xs mb-1">Bank Transfer (BCA)</div>
                  <div className="text-2xl font-mono font-bold tracking-widest text-lex-purple mb-4">
                    1234 5678 9012
                  </div>
                  <p className="text-text-secondary font-medium text-sm">Lakukan transfer ke nomor Virtual Account di atas sebelum batas waktu habis.</p>
                </div>
              )}

              {/* Action */}
              <button 
                onClick={handleSimulatePayment} 
                disabled={isProcessing}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-colors mt-4 flex justify-center items-center"
              >
                {isProcessing ? 'Verifikasi...' : 'Simulasikan Pembayaran Berhasil'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
