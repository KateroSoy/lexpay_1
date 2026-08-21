import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="pt-32 pb-24 px-4 bg-bg-card min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-text-primary text-2xl font-bold">✓</div>
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Payment Successful!</h1>
      <p className="text-xl text-text-secondary font-medium max-w-lg mb-12">
        Thank you for your order. We are processing your request and will notify you of any updates.
      </p>
      <div className="flex gap-4">
        <Link to="/orders" className="bg-btn-bg text-btn-text px-8 py-4 rounded-full font-bold hover:bg-white/80 transition-colors">
          Track Order
        </Link>
        <Link to="/explore" className="bg-bg-main text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
