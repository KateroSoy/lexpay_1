import { ChevronLeft, Contact } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Pulsa() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("081902013748");

  // Mock denomination data
  const denominations = [
    { name: "XL 5.000", price: "Rp 5.927", points: 20 },
    { name: "XL 10.000", price: "Rp 10.902", points: 20 },
    { name: "XL 15.000", price: "Rp 15.030", points: 20 },
    { name: "XL 25.000", price: "Rp 24.970", points: 20 },
    { name: "XL 30.000", price: "Rp 29.955", points: 20 },
    { name: "XL 50.000", price: "Rp 49.820", points: 20 },
    { name: "XL 100.000", price: "Rp 98.500", points: 20 },
  ];

  return (
    <div className="w-full h-full pb-20 bg-lex-soft overflow-y-auto scrollbar-hide">
      
      {/* Header */}
      <div className="bg-lex-purple-dark text-white pt-6 pb-20 px-4 rounded-b-[40px] relative">
        <button onClick={() => navigate(-1)} className="absolute left-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-center font-bold text-lg w-full absolute left-0 right-0 top-8 z-0">Pulsa Reguler</h1>
      </div>

      {/* Input Section */}
      <div className="px-5 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-sm p-4 flex items-center gap-3 border border-gray-100">
          <button className="w-10 h-10 bg-lex-purple-dark text-white rounded-full flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform">
            <Contact className="w-5 h-5" />
          </button>
          
          <div className="flex-1">
            <p className="text-[10px] font-bold text-gray-500 mb-0.5">Nomor Tujuan</p>
            <input 
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full text-base font-bold text-gray-900 focus:outline-none bg-transparent"
              placeholder="Masukkan nomor..."
            />
            <div className="w-full h-px bg-gray-200 mt-1"></div>
          </div>
          
          {/* Provider Logo (Mock XL Logo) */}
          <div className="shrink-0 flex items-center justify-center text-blue-600 font-black text-xl italic tracking-tighter">
            <span className="text-green-500">x</span>L
          </div>
        </div>
      </div>

      {/* Denominations Grid */}
      <div className="px-5 mt-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {denominations.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 relative overflow-hidden active:bg-gray-50 transition-colors cursor-pointer">
              
              {/* Tersedia Badge */}
              <div className="absolute top-0 right-0 bg-lex-purple-dark text-white text-[9px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-2xl">
                Tersedia
              </div>

              <h3 className="font-bold text-gray-900 mt-1">{item.name}</h3>
              
              <div className="flex justify-between items-end mt-4">
                <p className="text-lex-purple-dark font-bold text-sm">{item.price}</p>
                <div className="text-right">
                  <p className="text-yellow-500 font-bold text-xs">{item.points}</p>
                  <p className="text-yellow-500 text-[9px] font-bold">+Poin</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
